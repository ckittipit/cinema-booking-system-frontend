import api from './api'
import type { ApiResponse } from '../types/api'
import type { Booking, LockSeatPayload } from '../types/booking'

export const lockSeat = async (payload: LockSeatPayload): Promise<Booking> => { 
    const response = await api.post<ApiResponse<Booking>>('/api/v1/bookings/lock', payload)
    return response.data.data
}

export const confirmBooking = async (bookingId: string): Promise<Booking> => { 
    const response = await api.post<ApiResponse<Booking>>(`/api/v1/bookings/${bookingId}/confirm`)
    return response.data.data
}

export const releaseBooking = async (bookingId: string): Promise<void> => { 
    await api.post(`/api/v1/bookings/${bookingId}/release`)
}