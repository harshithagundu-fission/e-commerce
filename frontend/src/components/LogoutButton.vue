<template>
  <button @click="logout" class="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white">
    Logout
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function clearAuth() {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
  } catch (e) {
    // ignore
  }
}

function logout() {
  clearAuth()
  // notify other tabs
  try { window.dispatchEvent(new Event('storage')) } catch (e) {}
  // route to the dedicated logout page which also clears auth and optionally shows a message
  router.push('/logout')
}
</script>

<style scoped>
</style>
