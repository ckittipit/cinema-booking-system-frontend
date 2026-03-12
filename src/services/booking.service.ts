import api from './api'
import type { ApiResponse } from '../types/api'
import type { Booking, ConfirmBookingPayload } from '../types/booking'

export const confirmBooking = async (payload: ConfirmBookingPayload): Promise<Booking> => { 
    const response = await api.post<ApiResponse<Booking>>('/api/v1/bookings/confirm', payload)
    return response.data.data
}