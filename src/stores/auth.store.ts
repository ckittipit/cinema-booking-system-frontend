import { CurrentUser } from './../types/auth';
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, googleProvider } from '../services/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import api from '../services/api'
import type { CurrentUser } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
    const firebaseToken = ref('')
    const currentUser = ref<CurrentUser | null>(null)
    const loading = ref(false)
    const error = ref('')

    const loginWithGoogle = async () => {
        loading.value = true
        error.value = ''

        try {
            const result = await signInWithPopup(auth, googleProvider)
            const token = await result.user.getIdToken()

            const response = await api.post('/api/v1/auth/verify', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            currentUser.value = response.data.user
        } catch (err: any) {
            console.error(err)
            error.value = 'Login failed'
        } finally {
            loading.value = false
        }
    }

    const logout = async () => { 
        await signOut(auth)
        firebaseToken.value = ''
        currentUser.value = null
    }

    return {
        firebaseToken,
        currentUser,
        loading,
        error,
        loginWithGoogle,
        logout
    }
})