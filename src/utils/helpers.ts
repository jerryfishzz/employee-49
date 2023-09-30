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

// Use this at the client side api, not the server side handler.
// This is for the validation of return data from the server.
export function safeValidateSource<T>(
  schema: z.Schema<T>,
  value: T | 'undefined',
) {
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
