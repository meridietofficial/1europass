import { apiPost, apiGet, apiPut } from './client'
import { ENDPOINTS } from './endpoints'

export interface CreateHousingPayload {
  title: string
  property_type: string
  bedrooms?: string
  description?: string
  full_address?: string
  street_address?: string
  apartment_floor?: string
  postal_code?: string
  city?: string
  state_region?: string
  country?: string
  latitude?: number | null
  longitude?: number | null
  rent: number
  deposit?: number | null
  size_sqm?: number | null
  utilities_included?: boolean | null
  included_electricity: boolean
  included_water: boolean
  included_heating: boolean
  included_internet: boolean
  included_gas: boolean
  included_other: boolean
  included_other_spec?: string
  available_now: boolean
  available_date?: string
  use_profile_phone: boolean
  phone_code?: string
  phone_number?: string
  furnished?: string
  parking?: boolean | null
  pets?: boolean | null
  smoking?: boolean | null
  gender?: string
  elevator?: boolean | null
  balcony?: boolean | null
  laundry?: string
  floor?: string
  nearby_university?: string
  nearby_supermarket: boolean
  nearby_metro: boolean
  nearby_bus_stop: boolean
  nearby_train_station: boolean
  nearby_university_flag: boolean
  nearby_hospital: boolean
  nearby_gym: boolean
  nearby_cafe: boolean
  nearby_restaurant: boolean
  decl_legal_right: boolean
  decl_info_accurate: boolean
  decl_photos_current: boolean
  decl_agreed_terms: boolean
}

interface CreateHousingResponse {
  success: boolean
  message: string
  data: { id: string }
}

export async function createHousingListing(payload: CreateHousingPayload): Promise<string> {
  const res = await apiPost<CreateHousingResponse>(ENDPOINTS.housing.create, payload)
  return res.data.id
}

export async function fetchHousingListing(id: string): Promise<Record<string, unknown>> {
  const res = await apiGet<{ success: boolean; data: Record<string, unknown> }>(ENDPOINTS.housing.get(id))
  return res.data
}

export async function updateHousingListing(id: string, payload: CreateHousingPayload): Promise<void> {
  await apiPut<{ success: boolean }>(ENDPOINTS.housing.update(id), payload)
}
