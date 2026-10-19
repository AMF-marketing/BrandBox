export function formatPhone(value: string): string {
  let digits = value.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 11 && digits.startsWith('8')) digits = '7' + digits.slice(1);
  if ((!value.trim().startsWith('+7') && digits.length === 10) || !['7', '8'].includes(digits[0])) digits = '7' + digits;
  if (digits.startsWith('8')) digits = '7' + digits.slice(1);
  digits = digits.slice(0, 11);
  const subscriber = digits.slice(1);
  return '+7' + (subscriber ? ' (' + subscriber.slice(0, 3) : '')
    + (subscriber.length >= 3 ? ') ' : '') + subscriber.slice(3, 6)
    + (subscriber.length > 6 ? '-' + subscriber.slice(6, 8) : '')
    + (subscriber.length > 8 ? '-' + subscriber.slice(8, 10) : '');
}
export function validateContact(name: string, phone: string, consent: boolean): string {
  if (name.trim().length < 2) return 'Укажите имя — не менее двух символов.';
  if (!/^7[3489]\d{9}$/.test(phone.replace(/\D/g, ''))) return 'Введите российский номер полностью.';
  if (!consent) return 'Для заявки требуется согласие на обработку данных.';
  return '';
}
