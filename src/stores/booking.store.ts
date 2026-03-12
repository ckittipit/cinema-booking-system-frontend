import { ref } from 'vue'
import { defineStore } from 'pinia'
import { confirmBooking } from '../services/booking.service'
import type { Booking } from '../types/booking'

export const useBookingStore = defineStore('booking', () => { 
    const selectedSeatId = ref('')
    const latestBooking = ref<Booking | null>(null)
    const loading = ref(false)
    const error = ref('')

    const selectSeat = (seatId: stirng) => { 
        selectedSeatId.value = seatId
    }
    const clearSelectedSeat = () => { 
        selectedSeatId.value = ''
    }

    const confirmSelectedBooking = async (showtimeId: string, price = 250) => { 
        if (!selectedSeatId.value) { 
            error.value = 'Please select a seat first.'
            return null
        }

        loading.value = true
        error.value = ''

        try {
            const booking = await confirmBooking({
                showtime_id: showtimeId,
                seat_id: selectedSeatId.value,
                price,
            })

            latestBooking.value = booking
            return booking
        } catch (err) {
            console.error(err)
            error.value = 'Failed to confirm booking.'
            return null
        } finally { 
            loading.value = false
        }
    }

    return {
        selectedSeatId,
        latestBooking,
        loading,
        error,
        selectSeat,
        clearSelectedSeat,
        confirmSelectedBooking
    }
})
