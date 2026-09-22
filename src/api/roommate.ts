import { apiPost, apiGet, apiPut } from './client'
import { ENDPOINTS } from './endpoints'

export interface CreateRoommatePayload {
  title: string
  intent: 'have-room' | 'need-room'
  room_type: 'private' | 'shared'
  description?: string
  street_address?: string
  apartment_floor?: string
  postal_code?: string
  city?: string
  state_region?: string
  country?: string
  latitude?: number | null
  longitude?: number | null
  rent?: number | null
  budget_max?: number | null
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
  pets_allowed?: boolean | null
  smoking_allowed?: boolean | null
  gender_preference?: string
  housemates?: string
  age_min?: number | null
  age_max?: number | null
  nearby_supermarket?: boolean
  nearby_metro?: boolean
  nearby_bus_stop?: boolean
  nearby_train_station?: boolean
  nearby_university_flag?: boolean
  nearby_hospital?: boolean
  nearby_gym?: boolean
  nearby_cafe?: boolean
  nearby_restaurant?: boolean
  nearby_university?: string
  decl_info_accurate?: boolean
  decl_photos_current?: boolean
  decl_agreed_terms?: boolean
  share_profile?: boolean
}

interface CreateRoommateResponse {
  success: boolean
  message: string
  data: { id: string }
}

export async function createRoommateListing(payload: CreateRoommatePayload): Promise<string> {
  const res = await apiPost<CreateRoommateResponse>(ENDPOINTS.roommates.create, payload)
  return res.data.id
}

export async function fetchRoommateListing(id: string): Promise<Record<string, unknown>> {
  const res = await apiGet<{ success: boolean; data: Record<string, unknown> }>(ENDPOINTS.roommates.get(id))
  return res.data
}

export async function updateRoommateListing(id: string, payload: Partial<CreateRoommatePayload>): Promise<void> {
  await apiPut<{ success: boolean }>(ENDPOINTS.roommates.update(id), payload)
}
