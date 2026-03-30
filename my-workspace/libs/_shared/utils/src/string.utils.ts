export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function truncate(value: string, maxLength: number): string {
  return value.length > maxLength
    ? value.substring(0, maxLength) + '...'
    : value;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}
