<template>
    <div class="flex flex-wrap gap-4 rounded-xl border border-slate-200 bg-white p-4">
        <div class="flex items-center gap-2">
            <span class="inline-block h-4 w-4 rounded bg-green-500"></span>
            <span class="text-sm text-slate-700">Available</span>
        </div>
        <div class="flex items-center gap-2">
            <span class="inline-block h-4 w-4 rounded bg-amber-500"></span>
            <span class="text-sm text-slate-700">Locked</span>
        </div>
        <div class="flex items-center gap-2">
            <span class="inline-block h-4 w-4 rounded bg-red-500"></span>
            <span class="text-sm text-slate-700">Booked</span>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>