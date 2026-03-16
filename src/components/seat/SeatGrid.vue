<template>
    <div class="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
        <div v-for="[row, rowSeats] in groupedSeats"
            :key="row"
            class="flex items-center gap-3"
        >
            <div class="w-6 font-semibold text-slate-700">{{ row }}</div>
            <div class="flex flex-wrap gap-2">
                <button v-for="(seat) in rowSeats"
                    :key="seat.seat_id"
                    type="button"
                    class="min-w-[52px] rounded-lg px-3 py-2 text-sm font-medium"
                    :class="seatClass(seat)"
                    :disabled="seat.status !== 'AVAILABLE'",
                    @click="handleClickSeat(seat)"
                >
                    {{ seat.seat_id }} {{ seat.status }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Seat } from '../../types/seat'

const props = defineProps<{
    seats: Seat[],
    selectedSeatId?: string
}>()

const emit = defineEmits<{
    (e: 'select-seat', seat: Seat): void
}>()

const seatClass = (seat: Seat) => { 
    if (seat.status === 'BOOKED') return 'bg-red-500 text-white cursor-not-allowed'
    if (seat.status === 'LOCKED') return 'bg-amber-500 text-white cursor-not-allowed'
    if (seat.seat_id === props.selectedSeatId) return 'bg-blue-600 text-white'
    return 'bg-green-500 text-white hover:opacity-90 cursor-pointer'
}

const handleClickSeat = (seat: Seat) => { 
    console.log(seat)
    if (seat.status !== 'AVAILABLE') return
    emit('select-seat', seat)
}

const groupedSeats = computed(() => { 
    const map = new Map<string, Seat[]>()
    for (const seat of props.seats) { 
        const row = seat.seat_id.charAt(0)
        if (!map.has(row)) { 
            map.set(row, [])
        }
        map.get(row)?.push(seat)
    }

    return Array.from(map.entries())
})
</script>

<style scoped>

</style>