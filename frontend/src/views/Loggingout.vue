<template>
  <div class="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow text-center">
    <h1 class="text-2xl font-bold mb-3">Logging out</h1>
    <p class="text-body mb-4">Use the button below to logout — this page will remain visible until you navigate away.</p>
      <div v-if="message" class="text-sm text-muted">{{ message }}</div>
    <div class="mt-4">
      <button @click="doLogout" class="px-4 py-2 bg-red-600 text-white rounded">Logout now</button>
      <button @click="cancel" class="ml-2 px-3 py-2 border rounded">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const router = useRouter()
const cart = useCart()
const message = ref('')

function clearAuth() {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
    localStorage.removeItem('authId')
  } catch (e) {
    // ignore
  }
}

function doLogout() {
  clearAuth()
  try { cart.clear() } catch (e) {}
  try { window.dispatchEvent(new Event('storage')) } catch (e) {}
  message.value = 'Logged out successfully. Redirecting to login screen...'
  setTimeout(() => router.replace('/loggedout'), 800)
}

function cancel() {
  router.back()
}

onMounted(() => {
  // Always clear auth when visiting this route, then redirect
  try {
    clearAuth()
    try { cart.clear() } catch (e) {}
    try { window.dispatchEvent(new Event('storage')) } catch (e) {}
  } catch (e) {}
  message.value = 'You have been logged out. Redirecting to login screen...'
  setTimeout(() => router.replace('/loggedout'), 800)
})
</script>

<style scoped>
.text-muted { color: #6b7280 }
</style>
