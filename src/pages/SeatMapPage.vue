<template>
    <DefaultLayout>
        <section class="space-y-4">
            <div>
                <button class="mb-3 text-sm text-blue-600 hover:underline" type="button" @click="router.back()">Back</button>
                <h2 class="text-2xl font-bold text-slate-800">Seat Map</h2>
                <p clsas="text-slate-500">
                    Showtime ID: {{ showtimeId }}
                </p>
            </div>

            <SeatLegend />

            <LoadingState v-if="showtimeStore.loading" text="Loading seat map..." />

            <EmptyState v-else-if="showtimeStore.error" :text="showtimeStore.error" />
            <EmptyState v-else-if="!showtimeStore.seatMap || showtimeStore.seatMap.seats.length === 0" text="No seat map found" />

            <SeatGrid v-else :seats="showtimeStore.seatMap.seats" />
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useShowtimeStore } from '../stores/showtime.store'

import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoadingState from '../components/common/LoadingState.vue'
import EmptyState from '../components/common/EmptyState.vue'
import SeatLegend from '../components/seat/SeatLegend.vue'
import SeatGrid from '../components/seat/SeatGrid.vue'

const route = useRoute()
const router = useRouter()
const showtimeStore = useShowtimeStore()

const showtimeId = computed(() => String(route.params.showtimeId || ''))

onMounted(() => { 
    if (showtimeId.value) showtimeStore.fetchSeatMap(showtimeId.value)
})
</script>

<style scoped>

</style>