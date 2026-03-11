<template>
    <div class="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-slate-500">
        {{ text }}
    </div>
</template>

<script setup lang="ts">
defineProps<{
    text?: string
}>()
</script>

<style scoped>

</style>