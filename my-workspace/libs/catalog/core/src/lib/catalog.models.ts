export interface Product {
  id: string;
  name: string;
  price: number;
  featured?: boolean;
}

export interface ProductReadModel {
  product: Product | undefined;
}
