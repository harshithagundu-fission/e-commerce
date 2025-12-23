<template>
  <div class="max-w-4xl mx-auto mt-20 p-6">
    <div v-if="loading" class="text-center py-12">Loading product...</div>
    <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <img :src="product.image" alt="" class="w-full h-96 object-contain bg-white p-4 rounded" />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ product.title }}</h1>
        <p class="text-xl font-semibold text-green-600 mb-4">${{ product.price }}</p>
        <p class="text-body mb-4">{{ product.description }}</p>

        

        <div class="flex items-center gap-3">
          <button @click="addToCart" class="bg-fg-brand text-white px-4 py-2 rounded">Add to cart</button>
          <router-link to="/" class="text-sm text-muted">Back to products</router-link>

          <div>
            <SizeButtons />
          </div>

        </div>
    </div>
    <!-- //<h1>
    //  test
    //</h1> -->
    <buy-now-button/>
    <add-to-cart-button/>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useCart } from '../stores/cart'
import SizeButtons from './SizeButtons.vue'
import BuyNowButton from './BuyNowButton.vue'
import AddToCartButton from './AddToCartButton.vue'



const route = useRoute()
const id = route.params.id

const product = ref(null)
const loading = ref(true)
const error = ref(null)

async function fetchProduct() {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
    product.value = res.data
  } catch (err) {
    error.value = err?.message || 'Failed to load product'
  } finally {
    loading.value = false
  }
}

function addToCart() {
  const cart = useCart()
  if (product.value) {
    cart.addItem(product.value, 1)
    alert('Added to cart')
  }
}

onMounted(() => {
  fetchProduct()
})
</script>

<style scoped>
.text-muted { color: #6b7280 }
</style>
