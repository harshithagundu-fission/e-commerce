<template>
  <div class="max-w-4xl mx-auto mt-20 p-6">
    <div v-if="productsStore.productLoading" class="text-center py-12">Loading product...</div>
    <div v-else-if="productsStore.productError" class="text-center text-red-600">{{ productsStore.productError }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <img :src="productsStore.product.image" alt="" class="w-full h-96 object-contain bg-white p-4 rounded" />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ productsStore.product.title }}</h1>
        <p class="text-xl font-semibold text-green-600 mb-4">${{ productsStore.product.price }}</p>
        <p class="text-body mb-4">{{ productsStore.product.description }}</p>

                <div class="flex items-center gap-3">
                          <button @click="addToCart" class="bg-fg-brand text-white px-4 py-2 rounded">Add to cart</button>
                          <BuyNowButton :product="productsStore.product" />
                          <router-link to="/" class="text-sm text-muted">Back to products</router-link>
                        <div>
                          <SizeButtons v-model="selectedSize" :category="productsStore.product?.category" />
                        </div>
                        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCart } from '../stores/cart'
import { useProducts } from '../stores/products'
import BuyNowButton from '../components/BuyNowButton.vue'
import SizeButtons from '../components/SizeButtons.vue'


const route = useRoute()
const id = route.params.id

const productsStore = useProducts()
const selectedSize = ref(null)

async function fetchProduct() {
  await productsStore.fetchProduct(id)
}

function addToCart() {
  const cart = useCart()
  if (!productsStore.product) return
  if (!selectedSize.value) {
    alert('please select the size first, to add the products to the cart')
    return
  }
  cart.addItem(productsStore.product, 1, { size: selectedSize.value })
  alert('Added to cart')
}

onMounted(() => {
  fetchProduct()
})
</script>

