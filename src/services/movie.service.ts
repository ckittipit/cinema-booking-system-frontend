import api from './api'
import type { ApiResponse } from '../types/api'
import type { Movie } from '../types/movie'

export const getMovies = async (): Promise<Movie[]> => { 
    const response = await api.get<ApiResponse<Movie[]>>('/api/v1/movies')
    return response.data.data
}