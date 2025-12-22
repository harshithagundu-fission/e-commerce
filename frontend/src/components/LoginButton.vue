<template>
  <button @click="go" class="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white">
    Login
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function go() {
  router.push('/login')
}
</script>

<style scoped>
/* minimal styling; relies on existing theme classes */
</style>
