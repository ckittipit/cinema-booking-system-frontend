<template>
    <div class="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">
        {{ text || 'Loading...' }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    text?: string
}>()
</script>

<style scoped>

</style>