export interface Movie { 
    id: string
    title: string
    description: string
    duration_minutes: number
    poster_url: string
}

export interface Showtime { 
    id: string
    movie_id: string
    theater_name: string
    start_time: string
    seat_rows: number
    seat_cols: number
}