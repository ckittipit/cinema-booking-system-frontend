// import { Showtime } from './movie'
export type SeatStatus = 'AVAILABLE' | 'LOCKED' | 'BOOKED'

export interface Seat { 
    seat_id: string
    status: SeatStatus
    expires_at?: string | null
}

export interface SeatMap { 
    showtime_id: string
    seats: Seat[]
}