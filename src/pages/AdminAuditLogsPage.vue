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
                            <th class="px-4 py-3">Event</th>
                            <th class="px-4 py-3">Seat</th>
                            <th class="px-4 py-3">Message</th>
                            <th class="px-4 py-3">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(log, index) in logs" :key="log.id" class="border-t">
                            <td class="px-4 py-3">{{ log.event_type }}</td>
                            <td class="px-4 py-3">{{ log.seat_id }}</td>
                            <td class="px-4 py-3">{{ log.message }}</td>
                            <td class="px-4 py-3">{{ log.created_at }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAdminAuditLogs } from '../services/admin.service'
import type { AuditLog } from '../types/admin'

import DefaultLayout from '../layouts/DefaultLayout.vue'

const logs = ref<AuditLog[]>([])
const loading = ref(false)
const error = ref('')

onMounted(async () => { 
    loading.value = true
    error.value = ''

    try {
        logs.value = await getAdminAuditLogs()
    } catch (err) {
        console.error(err)
        error.value = 'Failed to fetch audit logs'
    } finally { 
        loading.value = false
    }
})
</script>

<style scoped>

</style>