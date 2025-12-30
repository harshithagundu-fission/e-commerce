<template>
  <div class="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">Login with Email</h1>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input v-model="email" type="email" required placeholder="you@example.com" class="w-full p-2 border rounded" />
      </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            :aria-invalid="!isPasswordValid"
            placeholder="At least 8 chars, upper+lower+number+special"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
            class="w-full p-2 border rounded"
          />
          <p v-if="password && !isPasswordValid" class="text-sm text-red-600 mt-1">Password must be 8+ chars and include uppercase, lowercase, number and special character.</p>
        </div>

      <div class="flex items-center justify-between">
        <button :disabled="loading" type="submit" class="bg-fg-brand text-white px-4 py-2 rounded">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>

        <!-- Secondary login uses entered credentials (calls submit) -->
        <button type="button" @click="submit" class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">
          Login
        </button>
      </div>
    </form>

    <div v-if="error" class="mt-4 text-red-600">{{ error }}</div>
    <div v-if="success" class="mt-4 text-green-600">{{ success }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import {computed}from'vue';

const router = useRouter()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref(null)
const success = ref(null)

const isPasswordValid = computed(() => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)
});

function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(value)
}

async function submit() {
  error.value = null
  success.value = null
  if (!validateEmail(email.value)) {
    error.value = 'Please enter a valid email address.'
    return
  }

  // Enforce password naming convention
  if (!isPasswordValid.value) {
    error.value = 'Password must be at least 8 characters and include uppercase, lowercase, a number and a special character.'
    return
  }

  loading.value = true
  try {
    // Example: send login request. Replace URL with your backend endpoint.
    // If your backend requires password, include it. Here we send both fields.
    const payload = { email: email.value }
    if (password.value) payload.password = password.value

    // Using a mock endpoint (this will likely 404). Replace with real API.
    const res = await axios.post('https://fakestoreapi.com/auth/login', payload).catch(err => {
      // Fake Store's auth endpoint expects username/password; treat as mock failure.
      return null
    })

    // If backend returns a token, store it; otherwise simulate success for demo
    if (res && res.data && (res.data.token || res.data.accessToken)) {
      const token = res.data.token || res.data.accessToken
      localStorage.setItem('authToken', token)
      success.value = 'Logged in successfully.'
      // navigate to home (products)
      // notify other components (header) that login state changed
      try { window.dispatchEvent(new Event('storage')) } catch (e) {}
      setTimeout(() => router.push('/services'), 600)
    } else {
      // Demo fallback: accept any email and mark as logged in locally
      localStorage.setItem('authEmail', email.value)
      // notify header to update
      try { window.dispatchEvent(new Event('storage')) } catch (e) {}
      success.value = 'Logged in (demo mode).'
      setTimeout(() => router.push('/services'), 600)
    }
  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.message || 'Login failed. Try again.'
  } finally {
    loading.value = false
  }
}

// Note: quick demo login removed — secondary Login now calls `submit()` to use user credentials
</script>

<style scoped>
.text-muted { color: #6b7280 }
</style>
