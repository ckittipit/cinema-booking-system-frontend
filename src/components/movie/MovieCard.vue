<template>
    <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 class="text-lg font-semibold text-slate-800">{{ movie.title }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ movie.description }}</p>
        <p class="mt-2 text-sm text-slate-500">Duration: {{ movie.duration_minutes }} Mins</p>
    </div>
</template>

<script setup lang="ts">
import type { Movie } from '../../types/movie'

defineProps<{
    movie: Movie
}>()
</script>

<style scoped>

</style>