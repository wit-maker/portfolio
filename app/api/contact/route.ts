import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import {
  validateContactInput,
  escapeHtml,
} from '../../../lib/utils/validation';

// SendGridの設定を条件付きで行う
const isSendGridConfigured =
  process.env.SENDGRID_API_KEY &&
  process.env.CONTACT_FORM_TO_EMAIL &&
  process.env.CONTACT_FORM_FROM_EMAIL;

// SendGridが設定されている場合のみAPIキーを設定
if (isSendGridConfigured) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');
}

// CORS preflight対応
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    // SendGridが設定されていない場合は開発用モックレスポンスを返す
    if (!isSendGridConfigured) {
      console.log('SendGrid is not configured. Returning mock response.');
      return NextResponse.json(
        {
          message:
            'Message received. This is a mock response as SendGrid is not configured.',
        },
        { status: 200 }
      );
    }

    const input = await request.json();

    // 入力バリデーション
    if (!validateContactInput(input)) {
      return NextResponse.json(
        {
          message: 'Invalid input. Please check your name, email, and message.',
        },
        { status: 400 }
      );
    }

    // HTMLエスケープ処理
    const sanitizedName = escapeHtml(input.name);
    const sanitizedEmail = escapeHtml(input.email);
    const sanitizedMessage = escapeHtml(input.message);

    const content = {
      to: process.env.CONTACT_FORM_TO_EMAIL as string,
      from: process.env.CONTACT_FORM_FROM_EMAIL as string,
      subject: `New Contact Message from ${sanitizedName}`,
      text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\nMessage: ${sanitizedMessage}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${sanitizedName}</p>
          <p><strong>Email:</strong> ${sanitizedEmail}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
        </div>
      `,
    };

    try {
      await sgMail.send(content);
      return NextResponse.json(
        { message: 'Message sent successfully.' },
        { status: 200 }
      );
    } catch (error) {
      console.error('SendGrid mail send error:', error);
      // 本番環境では詳細なエラー情報を返さない
      return NextResponse.json(
        { message: 'An error occurred while processing your request.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
