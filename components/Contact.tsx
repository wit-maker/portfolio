'use client';

import React, { useState } from 'react';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from './Card';
import Button from './Button';
import { Label } from './Label';
import { Input } from './Input';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#ffffff] dark:bg-[#1f2937] p-6 rounded-lg">
      <Card className="w-full bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-[#333333] dark:text-[#ffffff]">
            お問い合わせ
          </CardTitle>
          <CardDescription className="text-[#666666] dark:text-[#d1d5db]">
            ご質問やご要望がございましたら、以下のフォームからお気軽にお問い合わせください。
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[#333333] dark:text-[#ffffff]"
              >
                お名前
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-[#ffffff] dark:bg-[#374151] text-[#333333] dark:text-[#ffffff]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-[#333333] dark:text-[#ffffff]"
              >
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-[#ffffff] dark:bg-[#374151] text-[#333333] dark:text-[#ffffff]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-[#333333] dark:text-[#ffffff]"
              >
                メッセージ
              </Label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                className="w-full min-h-[150px] p-3 rounded-md border border-[#e5e7eb] dark:border-[#4b5563] bg-[#ffffff] dark:bg-[#374151] text-[#333333] dark:text-[#ffffff]"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-[#ffffff]"
            >
              {isSubmitting ? '送信中...' : '送信する'}
            </Button>

            {submitStatus === 'success' && (
              <p className="text-[#22c55e] text-center">
                お問い合わせありがとうございます。内容を確認次第、ご連絡させていただきます。
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="text-[#ef4444] text-center">
                送信に失敗しました。時間をおいて再度お試しください。
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
