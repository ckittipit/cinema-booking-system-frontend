<template>
    <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="font-semibold text-slate-800">{{ showtime.theater_name }}</h3>
        <p class="mt-2 text-sm text-slate-600">{{ showtime.start_time }}</p>
        <p class="mt-2 text-sm text-slate-500">{{ showtime.seat_rows }} x {{ showtime.seat_cols  }}</p>
    </div>
</template>

<script setup lang="ts">
import type { Showtime } from '../../types/movie'

defineProps<{
    showtime: Showtime
}>()
</script>

<style scoped>

</style>