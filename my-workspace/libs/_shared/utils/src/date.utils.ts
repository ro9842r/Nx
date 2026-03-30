export function formatDate(date: Date, locale = 'en-US'): string {
  return date.toLocaleDateString(locale);
}

export function parseISODate(iso: string): Date {
  return new Date(iso);
}

export function getYearRange(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}
