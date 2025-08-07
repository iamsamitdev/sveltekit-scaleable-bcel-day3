export interface Product {
  id: number
  name: string
  slug: string
  description: string
  price: number
  image: string
  category_id: number
  user_id: number
  created_at: string
  updated_at: string
  category_name?: string
  user_fullname?: string
}

// API Response interface
export interface ProductResponse {
  status: boolean
  total: number
  products: Product[]
}
