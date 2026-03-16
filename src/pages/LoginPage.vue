<template>
    <DefaultLayout>
        <section class="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-800">Login</h2>
            <p class="mt-2 text-sm text-slate-500">
                Sign in with Google to continue booking seats
            </p>

            <p v-if="authStore.error" class="mt-4 text-sm text-rose-600">
                {{ authStore.error }}
            </p>

            <button
                type="button"
                class="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
                :disabled="authStore.loading"
                @click="handleLogin"
            >
                {{ authStore.loading ? 'Signing in...' : 'Sign in with Google' }}
            </button>
        </section>
    </DefaultLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
    await authStore.loginWithGoogle()

    if (authStore.currentUser) {
        router.push('/')
    }
}
</script>

<style scoped>

</style>