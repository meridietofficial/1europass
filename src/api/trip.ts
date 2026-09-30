import { apiPost, apiGet, apiPut, apiPatch, apiDelete } from './client'
import { ENDPOINTS } from './endpoints'

export interface TripDraftPayload {
  title: string
  destination?: string
  trip_type?: string
  category?: string
  duration?: string
  start_date?: string
  end_date?: string
  budget?: number | string
  meeting_point?: string
  description?: string
  who_can_join?: string[]
}

export interface TripPhotosPayload {
  photos?: string[]
  itinerary?: { name: string; type: string; desc: string }[]
}

export interface TripListing {
  id: string
  title: string
  destination: string | null
  trip_type: string | null
  category: string | null
  duration: string | null
  start_date: string | null
  end_date: string | null
  budget: number | null
  meeting_point: string | null
  description: string | null
  who_can_join: string[] | null
  photos: string[] | null
  itinerary: { name: string; type: string; desc: string }[] | null
  status: string
  created_at: string
}

interface ApiResponse<T> {
  data: T
  message: string
}

export const TRIP_DRAFT_KEY = 'trip_draft_id'

export async function createTripDraft(payload: TripDraftPayload) {
  const res = await apiPost<ApiResponse<{ id: string }>>(ENDPOINTS.trip.create, payload)
  return res.data.id
}

export async function updateTripListing(id: string, payload: TripDraftPayload | TripPhotosPayload) {
  return apiPut<ApiResponse<{ id: string }>>(ENDPOINTS.trip.update(id), payload)
}

export async function getTripListing(id: string) {
  const res = await apiGet<ApiResponse<TripListing>>(ENDPOINTS.trip.get(id))
  return res.data
}

export async function publishTripListing(id: string) {
  return apiPatch<ApiResponse<{ status: string }>>(ENDPOINTS.trip.status(id), { status: 'active' })
}

export async function deleteTripListing(id: string) {
  return apiDelete<ApiResponse<null>>(ENDPOINTS.trip.delete(id))
}
