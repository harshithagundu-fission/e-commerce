<template>
  <button @click="logout" class="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white">
    Logout
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const router = useRouter()
const cart = useCart()

function clearAuth() {
  try {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authEmail')
    localStorage.removeItem('authId')
  } catch (e) {
    // ignore
  }
}

function logout() {
  // ask for confirmation first
  const ok = confirm('Are you sure you want to log out and exit the site?')
  if (!ok) return

  // clear auth and cart state
  clearAuth()
  try { cart.clear() } catch (e) {}

  // notify other tabs
  try { window.dispatchEvent(new Event('storage')) } catch (e) {}

    // Redirect to the login page so user can log back in.
    try {
      router.replace('/loggedout')
    } catch (e) {
      window.location.href = '/loggedout'
    }
}
</script>

