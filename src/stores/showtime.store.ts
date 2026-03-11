import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Showtime } from '../types/movie'
import type { SeatMap } from '../types/seat'
import { getShowtimeByMovieId, getSeatMapByShowtimId } from '../services/showtime.service'

export const useShowtimeStore = defineStore('showtime', () => { 
    const showtimes = ref<Showtime[]>([])
    const seatMap = ref<SeatMap | null>(null)
    const loading = ref(false)
    const error = ref('')

    const fetchShowtimes = async (movieId: string) => { 
        loading.value = true
        error.value = ''

        try { 
            showtimes.value = await getShowtimeByMovieId(movieId)
        } catch (err) {
            error.value = 'Failed to fetch showtimes'
        } finally {
            loading.value = false
        }
    }

    const fetchSeatMap = async (showtimeId: string) => { 
        loading.value = true
        error.value = ''

        try { 
            seatMap.value = await getSeatMapByShowtimId(showtimeId)
        } catch (err) {
            error.value = 'Failed to fetch seat map'
        } finally {
            loading.value = false
        }
    }

    return {
        showtimes,
        seatMap,
        loading,
        error,
        fetchShowtimes,
        fetchSeatMap
    }
})