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

            <template v-else-if="showtimeStore.seatMap && showtimeStore.seatMap.seats.length > 0">
                <div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
                    <SeatGrid 
                        :seats="showtimeStore.seatMap.seats"
                        :selected-seat-id="bookingStore.selectedSeatId"
                        @select-seat="handleSelecteSeat"
                    />
                    <BookingSummary 
                        :selected-seat-id="bookingStore.selectedSeatId"
                        :loading="bookingStore.loading"
                        :error="bookingStore.error"
                        @confirm="handleConfirmbBooking"
                        @clear="handleClearSeat"
                    />
                </div>
                <div v-if="bookingStore.latestBooking" class="rounded-xl berder berder-green-200 bg-green-50 p-4 text-sm text-green-700">
                    Booking confirmed: Seat {{ bookingStore.latestBooking.seat_id }}
                </div>
            </template>

            <EmptyState v-else="!showtimeStore.seatMap || showtimeStore.seatMap.seats.length === 0" text="No seat map found" />

            <!-- <SeatGrid v-else :seats="showtimeStore.seatMap.seats" /> -->
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useShowtimeStore } from '../stores/showtime.store'
import { useBookingStore } from '../stores/booking.store'
import type { Seat } from '../types/seat'

import DefaultLayout from '../layouts/DefaultLayout.vue'
import LoadingState from '../components/common/LoadingState.vue'
import EmptyState from '../components/common/EmptyState.vue'
import SeatLegend from '../components/seat/SeatLegend.vue'
import SeatGrid from '../components/seat/SeatGrid.vue'
import BookingSummary from '../components/seat/BookingSummary.vue'

const route = useRoute()
const router = useRouter()
const showtimeStore = useShowtimeStore()
const bookingStore = useBookingStore()

const showtimeId = computed(() => String(route.params.showtimeId || ''))

const handleSelecteSeat = (seat: Seat) => { 
    bookingStore.selectSeat(seat.seat_id)
}
const handleClearSeat = () => { 
    bookingStore.clearSelectedSeat()
}
const handleConfirmbBooking = async () => { 
    if (!showtimeId.value) return

    const result = await bookingStore.confirmSelectedBooking(showtimeId.value, 250)
    if (result) { 
        await showtimeStore.fetchSeatMap(showtimeId.value)
        bookingStore.clearSelectedSeat()
    }
}

onMounted(() => { 
    if (showtimeId.value) showtimeStore.fetchSeatMap(showtimeId.value)
})
</script>

<style scoped>

</style>