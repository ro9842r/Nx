export const isValidSku = (sku: string): boolean => sku.length >= 3;

export const isValidPrice = (price: number): boolean => price >= 0;
