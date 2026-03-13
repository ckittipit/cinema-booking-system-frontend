export interface AdminBooking { 
    id: string
    user_id: string
    showtime_id: string
    seat_id: string
    status: string
    price: number
    created_at: string
    updated_at: string
}

export interface AuditLog { 
    id: string
    event_type: string
    seat_id?: string
    message: string
    created_at: string
}