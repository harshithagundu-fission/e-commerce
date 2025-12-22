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

const router = useRouter()
const message = ref('')

function clearAuth() {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
    // clear any other keys your app uses
  } catch (e) {
    // ignore
  }
}

function doLogout() {
  clearAuth()
  message.value = 'Logged out successfully. You can close this page or go back to the home page.'
}

function cancel() {
  router.back()
}

onMounted(() => {
  // If user already logged out, show a note; otherwise prompt to click the button
  try {
    const hasAuth = !!(localStorage.getItem('authToken') || localStorage.getItem('authEmail'))
    if (!hasAuth) message.value = 'You are already logged out.'
    else message.value = ''
  } catch (e) {
    message.value = ''
  }
})
</script>

<style scoped>
.text-muted { color: #6b7280 }
</style>
