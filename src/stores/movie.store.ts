import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Movie } from '../types/movie'
import { getMovies } from '../services/movie.service'

export const useMovieStore = defineStore('movie', () => {
    const movies = ref<Movie[]>([])
    const loading = ref(false)
    const error = ref('')

    const fetchMovies = async () => { 
        loading.value = true
        error.value = ''

        try { 
            movies.value = await getMovies()
        } catch (err) {
            error.value = 'Failed to fetch movies'
        } finally {
            loading.value = false
        }
    }

    return {
        movies,
        loading,
        error,
        fetchMovies
    }
})