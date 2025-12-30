

<template>
  <Header v-if="!route.meta || !route.meta.hideHeader" />
  <main class="mt-16">
    <router-view />
  </main>
</template>

<script setup>
import Header from './components/Header.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>


