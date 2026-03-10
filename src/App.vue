<template>
  <main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Cinema Booking System</h1>
    <p>Frontend is running...</p>
    <p>Backend health: {{ healthMessage }}</p>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const healthMessage = ref('Loading...')

const fetchHealth = async () => { 
  try { 
    const response = await axios.get(`${apiBaseUrl}/health`)
    healthMessage.value = `${response.data.status} - ${response.data.message}`
    console.log(healthMessage.value)
  } catch (error) {
    console.error('Error fetching health check:', error)
    healthMessage.value = 'Error fetching health check'
  }
}

onMounted(() => { 
  fetchHealth()
})
</script>

<style scoped>

</style>