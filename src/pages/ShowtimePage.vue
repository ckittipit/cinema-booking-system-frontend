<template>
    <DefaultLayout>
        <div>
            <button class="mb-3 text-sm text-blue-600 hover:underline" type="button" @click="router.push('/')" >
                Back to movies
            </button>
            <h2 class="text-2xl font-bold text-slate-800">Showtimes</h2>
            <p class="text-slate-500">
                {{ selectedMovie?.title || 'Selected movie' }}
            </p>
        </div>

        <LoadingState v-if="showtimeStore.loading" text="Loading showtimes..." />

        <EmptyState v-else-if="showtimeStore.error" :text="showtimeStore.error" />
        <EmptyState v-else-if="showtimeStore.showtimes.length === 0" text="No showtimes found" />

        <div v-else class="grid gap-4 md:grid-cols-2">
            <div v-for="showtime in showtimeStore.showtimes"
                :key="showtime.id"
                class="cursor-pointer"
                @click="goToSeatMap(showtime.id)"
            >
                <ShowtimeCard :showtime="showtime" />
            </div>
        </div>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useMovieStore } from '../stores/movie.store'
import { useShowtimeStore } from '../stores/showtime.store'

import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoadingState from '../components/common/LoadingState.vue'
import EmptyState from '../components/common/EmptyState.vue'
import ShowtimeCard from '../components/showtime/ShowtimeCard.vue'

const route = useRoute()
const router = useRouter()
const movieStore = useMovieStore()
const showtimeStore = useShowtimeStore()

const movieId = computed(() => String(route.params.movieId || ''))
const selectedMovie = computed(() => { 
    movieStore.movies.find((movie) => movie.id === movieId.value) 
})

const goToSeatMap = (showtimeId: string) => { 
    router.push(`/showtimes/${showtimeId}/seats`)
}

onMounted(async () => { 
    if (movieStore.movies.length === 0) await movieStore.fetchMovies()
    if (movieId.value) await showtimeStore.fetchShowtimes(movieId.value)
})
</script>

<style scoped>

</style>