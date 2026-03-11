<template>
  <!-- <main class="p-4">
    <h1 class="text-2xl font-bold mb-4">Cinema Booking System</h1>
    <p>Frontend is running...</p>
    <p>Backend health: {{ healthMessage }}</p>
    <p>Movies: {{ movies }}</p>
  </main> -->
  <RouterView />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
const healthMessage = ref('Loading...')
const movies = ref([])

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

const fetchMovies = async () => { 
  try { 
    const response = await axios.get(`${apiBaseUrl}/api/v1/movies`)
    movies.value = response.data
    console.log('Movies:', response.data)
  } catch (error) {
    console.error('Error fetching movies:', error)
  }
}

onMounted(() => { 
  fetchHealth()
  fetchMovies()
})
</script>

<style scoped>

</style>