import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { confirmBooking, lockSeat, releaseBooking } from '../services/booking.service'
import type { Booking } from '../types/booking'

export const useBookingStore = defineStore('booking', () => { 
    const selectedSeatId = ref('')
    const lockedBooking = ref<Booking | null>(null)
    const latestBooking = ref<Booking | null>(null)
    const loading = ref(false)
    const error = ref('')
    const countdown = ref(0)
    let countdownTimer: number | null = null

    const selectSeat = (seatId: string) => { 
        selectedSeatId.value = seatId
    }
    const clearSelectedSeat = () => { 
        selectedSeatId.value = ''
    }
    const stopCountdown = () => { 
        if (countdownTimer) { 
            window.clearInterval(countdownTimer)
            countdownTimer = null
        }
    }
    const clearLocalLockState = () => { 
        selectedSeatId.value = ''
        lockedBooking.value = null
        countdown.value = 0
        stopCountdown()
    }

    const startCountdown = (expiresAt?: string | null) => { 
        if (!expiresAt) { 
            countdown.value = 0
            return
        }

        if (countdownTimer) { 
            window.clearInterval(countdownTimer)
        }

        const update = () => { 
            const diff = Math.max(0, Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000))
            countdown.value = diff

            if (diff <= 0 && countdownTimer) { 
                window.clearInterval(countdownTimer)
                countdownTimer = null
            }
        }

        update()
        countdownTimer = window.setInterval(update, 1000)
    }

    const lockSelectedSeat = async (showtimeId: string, price = 250) => { 
        if (!selectedSeatId.value) { 
            error.value = 'Please select a seat first'
            return null
        }

        loading.value = true
        error.value = ''

        try {
            const booking = await lockSeat({
                showtime_id: showtimeId,
                seat_id: selectedSeatId.value,
                price
            })

            lockedBooking.value = booking
            // console.log('lockedBooking.value: ', lockedBooking.value)
            startCountdown(booking.expires_at)
            return booking
        } catch (err: any) {
            console.error(err)
            error.value = err?.response?.data?.message || 'Failed to lock seat'
            return null
        } finally { 
            loading.value = false
        }
    }

    const confirmLockedBooking = async () => { 
        if (!lockedBooking.value?.ID) {
            error.value = 'No locked booking found'
            return null
        }

        loading.value = true
        error.value = ''

        try {
            const booking = await confirmBooking(lockedBooking.value.ID)
            latestBooking.value = booking
            clearLocalLockState()
            return booking
        } catch (err: any) {
            console.error(err)
            error.value = err?.response?.data?.message || 'Failed to confirm booking'
            return null
        } finally { 
            loading.value = false
        }
    }

    const countdownText = computed(() => { 
        const minutes = Math.floor(countdown.value / 60)
        const seconds = countdown.value % 60
        
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    })

    // const confirmSelectedBooking = async (showtimeId: string, price = 250) => { 
    //     if (!selectedSeatId.value) {
    //         error.value = 'Please select a seat first.'
    //         return null
    //     }

    //     loading.value = true
    //     error.value = ''

    //     try {
    //         const booking = await confirmBooking({
    //             showtime_id: showtimeId,
    //             seat_id: selectedSeatId.value,
    //             price,
    //         })

    //         latestBooking.value = booking
    //         return booking
    //     } catch (err) {
    //         console.error(err)
    //         error.value = 'Failed to confirm booking.'
    //         return null
    //     } finally {
    //         loading.value = false
    //     }
    // }
    
    const releaseLockedBooking = async () => { 
        // console.log('lockedBooking.value?.id: ', lockedBooking.value?.ID)
        if (!lockedBooking.value?.ID) { 
            clearLocalLockState()
            return true
        }

        loading.value = true
        error.value = ''

        try {
            // console.log('asdsadsd')
            await releaseBooking(lockedBooking.value.ID)
            clearLocalLockState()
            return true
        } catch (err: any) {
            error.value = err?.response?.data?.message || 'Failed to release booking'
            return false
        } finally { 
            loading.value = false
        }
    }

    return {
        selectedSeatId,
        lockedBooking,
        latestBooking,
        loading,
        error,
        countdown,
        countdownText,
        selectSeat,
        clearSelectedSeat,
        clearLocalLockState,
        lockSelectedSeat,
        confirmLockedBooking,
        releaseLockedBooking
        // confirmSelectedBooking
    }
})
