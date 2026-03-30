export function getLocalizedName(
  name: Record<string, string>,
  langCode: string
): string {
  return name[langCode] ?? name['en'] ?? '';
}
