import type { Product } from '~/interfaces/IProduct.ts'

export interface CartItem {
  product: Product;
  quantity: number;
}