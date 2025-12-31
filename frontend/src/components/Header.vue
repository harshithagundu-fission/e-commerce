<template>
<nav class="bg-slate-800 text-white fixed w-full z-20 top-0 start-0 border-b border-slate-700">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse"> 
      <img src="/logo.svg" class="h-7" alt="Site Logo" />
    </div>
   
    <!-- Right side actions (always visible) -->
    <div class="flex items-center space-x-3">
      <router-link to="/services" class="px-3 py-2 rounded hover:bg-neutral-tertiary text-heading">Home</router-link>
      <router-link to="/profile" class="px-3 py-2 rounded hover:bg-neutral-tertiary text-heading">Profile</router-link>
      <router-link to="/cart" class="flex items-center px-3 py-2 rounded hover:bg-neutral-tertiary">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4"/></svg> 
        <span class="ml-2">Cart</span>
        <span class="ml-2 bg-white text-black px-2 py-0.5 rounded-full text-sm">{{ cart.totalCount }}</span>
      </router-link>
      <LoginButton />
      <LogoutButton />
    </div>
  </div>
</nav>



</template>

<script setup>
import LoginButton from './LoginButton.vue'
import LogoutButton from './LogoutButton.vue'
import { useCart } from '../stores/cart'

const cart = useCart()
</script>

