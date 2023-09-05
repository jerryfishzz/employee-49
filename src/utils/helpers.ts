// Get a date object offset by offsetDays
export function getCertainDate(offsetDays?: number): Date {
  const today = new Date();
  const certainDate = new Date(today);

  return !offsetDays
    ? today
    : new Date(certainDate.setDate(certainDate.getDate() + offsetDays));
}
