export interface ConfirmBookingPayload { 
    showtime_id: string
    seat_id: string
    price: number
}

export interface Booking { 
    id: string
    user_id: string
    showtim_id: string
    seat_id: string
    status: string
    price: number
    created_at: string
}