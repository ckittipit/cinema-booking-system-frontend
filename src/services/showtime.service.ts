import api from './api'
import type { ApiResponse } from '../types/api'
import type { Showtime } from '../types/movie'
import type { SeatMap } from '../types/seat'

export const getShowtimeByMovieId = async (movieId: string): Promise<Showtime[]> => { 
    const response = await api.get<ApiResponse<Showtime[]>>(`/api/v1/movies/${movieId}/showtimes`)
    return response.data.data
}

export const getSeatMapByShowtimId = async (showtimeId: string): Promise<SeatMap> => { 
    const response = await api.get<ApiResponse<SeatMap>>(`/api/v1/showtimes/${showtimeId}/seats`)
    return response.data.data
}