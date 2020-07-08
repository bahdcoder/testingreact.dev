export interface Product {
  id: number
  image: string | null
  name: string
  price?: string
  brand: string
  createdAt: string
  isActive: boolean
  isNew: boolean
  isSoldOut: boolean
  priceUnformatted: number
}
