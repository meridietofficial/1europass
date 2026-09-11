import { apiGet } from './client'
import { ENDPOINTS } from './endpoints'

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  sort_order: number
}

interface CategoriesResponse {
  success: boolean
  message: string
  data: Category[]
}

export async function fetchCategories(): Promise<Category[]> {
  const res = await apiGet<CategoriesResponse>(ENDPOINTS.categories.list)
  return res.data
}
