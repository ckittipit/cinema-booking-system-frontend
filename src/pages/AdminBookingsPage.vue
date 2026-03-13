<template>
    <DefaultLayout>
        <section class="space-y-4 text-slate-800">
            <h2 class="text-2xl font-bold text-slate-800">Admin bookings</h2>

            <div v-if="loading" class="rounded-xl border bg-white p-4">Loading...</div>
            <div v-else-if="error" class="rounded-xl border bg-white p-4 text-red-600">{{ error }}</div>
            <div v-else class="overflow-x-auto rounded-xl border bg-white">
                <table class="min-w-full text-sm">
                    <thead class="bg=slate-100 text-left">
                        <tr>
                            <th class="px-4 py-3">Seat</th>
                            <th class="px-4 py-3">Status</th>
                            <th class="px-4 py-3">Showtime</th>
                            <th class="px-4 py-3">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(booking, index) in bookings" :key="booking.id" class="border-t">
                            <td class="px-4 py-3">{{ booking.seat_id }}</td>
                            <td class="px-4 py-3">{{ booking.status }}</td>
                            <td class="px-4 py-3">{{ booking.showtime_id }}</td>
                            <td class="px-4 py-3">{{ booking.price }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { getAdminbookings } from '../services/admin.service'
import type { AdminBooking } from '../types/admin'

const bookings = ref<AdminBooking[]>()
const loading = ref(false)
const error = ref('')

onMounted(async () => { 
    loading.value = true
    error.value = ''

    try {
        bookings.value = await getAdminbookings()
    } catch (err) {
        console.error(err)
        error.value = 'Failed to frtch admin bookings'
    } finally { 
        loading.value = false
    }
})
</script>

<style scoped>

</style>