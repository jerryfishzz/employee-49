import { z } from 'zod';

// Get a date object offset by offsetDays
export function getCertainDate(offsetDays?: number): Date {
  const today = new Date();
  const certainDate = new Date(today);

  return !offsetDays
    ? today
    : new Date(certainDate.setDate(certainDate.getDate() + offsetDays));
}

export function validateSource<T>(schema: z.Schema<T>, value: T) {
  const newValue = schema.parse(value);
  return newValue;
}

export function safeValidateSource<T>(schema: z.Schema<T>, value: T) {
  const newValue = schema.safeParse(value);

  if (!newValue.success) {
    const { issues } = newValue.error;
    const errorContent =
      issues.length > 1
        ? `${issues[0].message}, and ${issues.length - 1} more`
        : issues[0].message;

    throw new Error(`Zod - ${errorContent}`);
  }

  return newValue;
}

export function strToNum(str: string): number {
  return isNaN(Number(str)) ? 0 : Number(str);
}
