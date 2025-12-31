<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="max-w-md w-full bg-white p-8 rounded shadow text-center">
      <h1 class="text-2xl font-bold mb-4">You're logged out</h1>
      <p class="mb-6 text-sm text-muted">You have successfully logged out. Click the button below to sign in again.</p>
      <router-link to="/login" class="inline-block bg-blue-600 text-white px-6 py-3 rounded">Login</router-link>
    </div>
  </div>
</template>

<script setup>
// simple static logged-out page with a login button
</script>


