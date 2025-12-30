<template>
<nav class="bg-neutral-secondary-soft fixed w-full z-20 top-0 start-0 border-b border-default">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div class="flex items-center space-x-3 rtl:space-x-reverse"> 
      <img src="/logo.svg" class="h-7" alt="Site Logo" />
      <!-- <span class="self-center text-xl text-heading font-semibold whitespace-nowrap">Flowbite</span> -->
    </div>
    <button data-collapse-toggle="navbar-solid" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-solid" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-solid">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-secondary-soft">
        <!-- other left-side links removed or commented to keep header clean -->
      </ul>
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

