<template>
    <header class="border-b bg-white">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div>
            <h1 class="text-2xl font-bold text-slate-800">Cinema Booking System</h1>
            <p class="text-sm text-slate-500">Vue 3 + Go(Echo) + MongoDB + Redis</p>
        </div>

        <div class="flex items-center gap-3">
            <template v-if="authStore.currentUser">
                <div class="text-right">
                    <p class="text-sm font-medium text-slate-800">
                    {{ authStore.currentUser.name }}
                    </p>
                    <p class="text-xs text-slate-500">
                    {{ authStore.currentUser.role }}
                    </p>
                </div>

                <button
                    type="button"
                    class="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
                    @click="handleLogout"
                >
                    Logout
                </button>
            </template>

            <button
                v-else
                type="button"
                class="rounded-lg bg-slate-900 px-3 py-2 text-sm text-white"
                @click="router.push('/login')"
            >
                Login
            </button>
        </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
    await authStore.logout()
    router.push('/login')
}
</script>

<style scoped>

</style>