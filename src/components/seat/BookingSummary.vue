<template>
    <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h3 class="text-lg font-semibold text-slate-800">Booking Summary</h3>
        <p class="mt-3 text-sm text-slate-600">
            Selected seat: 
            <span class="font-semibold text0slate-900">
                {{ selectedSeatId || '-' }}
            </span>
        </p>
        <p class="mt-2 text-sm text-slate-600">
            Price: 
            <span class="font-semibold text-slate-900">250</span>
        </p>
        <p v-if="error" class="mt-3 text-sm text-red-600">{{ error }}</p>
        <div class="mt-4 flex gap-3">
            <button class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                :disabled="!selectedSeatId || loading"
                @click="$emit('confirm')"
            >
                {{ loading ? 'Confirming...' : 'Confirm Booking' }}
            </button>
            <button class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 cursor-pointer"
                type="button"
                @click="$emit('clear')"
            >
                Clear
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    selectedSeatId: string
    loading?: boolean
    error?: string
}>()

defineEmits<{
    (e: 'confirm'): void
    (e: 'clear'): void
}>()
</script>

<style scoped>

</style>