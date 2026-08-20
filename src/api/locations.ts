import { apiGet } from './client'
import { ENDPOINTS } from './endpoints'

export interface ApiCountry {
  name: string
  iso2: string
  phone_code: string
}

interface LocResponse<T> {
  success: boolean
  message: string
  data: T
}

export const fetchCountries = async (): Promise<ApiCountry[]> => {
  const res = await apiGet<LocResponse<ApiCountry[]>>(ENDPOINTS.locations.countries)
  return res.data
}

export const fetchStates = async (country: string): Promise<string[]> => {
  const res = await apiGet<LocResponse<string[]>>(
    `${ENDPOINTS.locations.states}?country=${encodeURIComponent(country)}`
  )
  return res.data
}

export const fetchCities = async (country: string, state: string): Promise<string[]> => {
  const res = await apiGet<LocResponse<string[]>>(
    `${ENDPOINTS.locations.cities}?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}`
  )
  return res.data
}
