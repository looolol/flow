/**
 * Returns today - 3 days in string format.
 * Used for the NHL API, which returns a GameWeek starting on the date
 * So by using -3 from today, we get +/- 3 days from today
 */
export function getToday(): string {
  const today = new Date();
  today.setDate(today.getDate() - 3);
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd}`;
}

/**
 * 3 Days Ago
 */
export function getDateRangeStart(): Date {
  const today = new Date();
  today.setDate(today.getDate() - 3);
  return today;
}

/**
 * 3 Days From Now
 */
export function getDateRangeEnd(): Date {
  const today = new Date();
  today.setDate(today.getDate() + 3);
  return today;
}