import { defineStore } from 'pinia'
import { ref } from 'vue'
import { signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth, googleProvider } from '../services/firebase'
import api from '../services/api'
import type { CurrentUser } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
    const firebaseUser = ref<User | null>(null)
    const currentUser = ref<CurrentUser | null>(null)
    const loading = ref(false)
    const error = ref('')
    const initialized = ref(false)

    const verifyWithBackend = async () => {
        const user = auth.currentUser
        if (!user) {
            currentUser.value = null
            return
        }

        const token = await user.getIdToken()
// console.log('firebase id token:', token)
// console.log('token length:', token?.length)
        const response = await api.post(
            '/api/v1/auth/verify',
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            },
        )

        currentUser.value = response.data.data
    }

    const loginWithGoogle = async () => {
        const result = await signInWithPopup(auth, googleProvider)

        const idToken = await result.user.getIdToken()

        // console.log('idToken:', idToken)
        // console.log('looks like jwt:', idToken.split('.').length === 3)

        const response = await api.post(
            '/api/v1/auth/verify',
            {},
            {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
            },
        )

        return response.data
    }

    const logout = async () => {
        await signOut(auth)
        firebaseUser.value = null
        currentUser.value = null
    }

    const initAuth = async () => {
        return new Promise<void>((resolve) => {
        onAuthStateChanged(auth, async (user) => {
            firebaseUser.value = user

            try {
                if (user) {
                    await verifyWithBackend()
                } else {
                    currentUser.value = null
                }
                } catch (err) {
                    console.error(err)
                    currentUser.value = null
                } finally {
                    initialized.value = true
                    resolve()
                }
            })
        })
    }

    return {
        firebaseUser,
        currentUser,
        loading,
        error,
        initialized,
        loginWithGoogle,
        logout,
        initAuth,
    }
})