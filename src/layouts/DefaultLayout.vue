<template>
    <div class="min-h-screen bg-slate-50">
        <AppHeader />
        <main class="mx-auto max-w-6xl px-4 py-6">
            <slot />
        </main>
    </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/common/AppHeader.vue'
</script>

<style scoped>

</style>