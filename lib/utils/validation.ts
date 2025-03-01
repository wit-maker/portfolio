export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export const validateContactInput = (
  input: Partial<ContactInput>
): input is ContactInput => {
  if (
    !input.name ||
    typeof input.name !== 'string' ||
    input.name.length > 100
  ) {
    return false;
  }
  if (
    !input.email ||
    typeof input.email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)
  ) {
    return false;
  }
  if (
    !input.message ||
    typeof input.message !== 'string' ||
    input.message.length > 1000
  ) {
    return false;
  }
  return true;
};

export const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
