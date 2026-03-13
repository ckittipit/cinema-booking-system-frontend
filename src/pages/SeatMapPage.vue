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
                        :locked-seat-id="bookingStore.lockedBooking?.seat_id"
                        :countdown-text="bookingStore.countdownText"
                        :loading="bookingStore.loading"
                        :error="bookingStore.error"
                        @lock="handleLockSeat"
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
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useShowtimeStore } from '../stores/showtime.store'
import { useBookingStore } from '../stores/booking.store'
import type { Seat } from '../types/seat'
import { showtimeWebsocketService } from '../services/websocket.service'

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

const fetchSeatMap = async () => { 
    if (showtimeId.value) await showtimeStore.fetchSeatMap(showtimeId.value)
}

const handleSelecteSeat = (seat: Seat) => { 
    bookingStore.selectSeat(seat.seat_id)
}
const handleClearSeat = async () => { 
    // console.log('zxczx')
    const relesed = await bookingStore.releaseLockedBooking()
    // console.log(relesed)
    if (relesed) await fetchSeatMap()
}
const handleLockSeat = async () => { 
    if (!showtimeId.value) return

    const result = await bookingStore.lockSelectedSeat(showtimeId.value, 250)
    if (result) await fetchSeatMap()
}
const handleConfirmbBooking = async () => { 
    if (!showtimeId.value) return

    const result = await bookingStore.confirmLockedBooking()
    if (result) await fetchSeatMap()
}

watch(
    () => bookingStore.countdown,
    async (value) => { 
        if (value === 0 && bookingStore.lockedBooking) { 
            bookingStore.clearLocalLockState()
            await fetchSeatMap()
        }
    }
)

onMounted(async () => { 
    bookingStore.clearLocalLockState()
    await fetchSeatMap()

    if (showtimeId.value) { 
        showtimeWebsocketService.connect(showtimeId.value, async () => { 
            await fetchSeatMap()
        })
    }
})

onUnmounted(() => { 
    bookingStore.clearLocalLockState()
    showtimeWebsocketService.disconnect()
}) 
</script>

<style scoped>

</style>