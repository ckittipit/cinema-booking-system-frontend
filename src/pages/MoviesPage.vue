<template>
    <DefaultLayout>
        <section class="space-y-4">
            <div>
                <h2 class="text-2xl font-bold text-slate-800">Movies</h2>\
                <p class="text-slate-500">Select a movie</p>
            </div>
            
            <LoadingState v-if="movieStore.loading" text="Loading..." />

            <EmptyState v-if="movieStore.error" :text="movieStore.error" />
            <EmptyState v-if="movieStore.movies.length === 0" text="No movie found" />

            <div v-else class="grid gap-4 md:grid-cols-2">
                <div
                    v-for="movie in movieStore.movies"
                    :key="movie.id"
                    class="cursor-pointer"
                    @click="goToShowtimes(movie.id)"
                >
                    <MovieCard :movie="movie" />
                </div>
            </div>
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '../stores/movie.store'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoadingState from '../components/common/LoadingState.vue'
import EmptyState from '../components/common/EmptyState.vue'
import MovieCard from '../components/movie/MovieCard.vue'

const router = useRouter()
const movieStore = useMovieStore()

const goToShowtimes = (movieId: string) => {
    router.push(`/movies/${movieId}/showtimes`)
}

onMounted(() => { 
    movieStore.fetchMovies()
})
</script>

<style scoped>

</style>