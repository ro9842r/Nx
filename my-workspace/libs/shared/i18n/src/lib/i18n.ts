const dictionary: Record<string, string> = {
  checkout: 'Checkout',
  dashboard: 'Dashboard',
};

export const t = (key: string): string => dictionary[key] ?? key;
