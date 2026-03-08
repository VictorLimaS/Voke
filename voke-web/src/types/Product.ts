export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  categoryId: string;
  createdAt: string;
  category?: Category; 
  images: ProductImage[];
}