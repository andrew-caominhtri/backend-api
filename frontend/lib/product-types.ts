export interface Product {
  id: number
  name: string
  price: number
  image: string
  category?: string | null
  brand?: string | null
}
