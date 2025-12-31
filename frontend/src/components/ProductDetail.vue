<template>
  <div class="max-w-4xl mx-auto mt-20 p-6">
    <div v-if="productsStore.productLoading" class="text-center py-12">Loading product...</div>
    <div v-else-if="productsStore.productError" class="text-center text-red-600">{{ productsStore.productError }}</div>
    <div v-else-if="productsStore.product" class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <img :src="productsStore.product.image" alt="" class="w-full h-96 object-contain bg-white p-4 rounded" />

      <div>
        <h1 class="text-2xl font-bold mb-2">{{ productsStore.product.title }}</h1>
        <p class="text-xl font-semibold text-green-600 mb-4">${{ productsStore.product.price }}</p>
        <p class="text-body mb-4">{{ productsStore.product.description }}</p>



        <div class="flex items-center gap-3">
          <button @click="addToCart" class="bg-fg-brand text-white px-4 py-2 rounded">Add to cart</button>
          <router-link to="/" class="text-sm text-muted">Back to products</router-link>

          <div>
            <SizeButtons v-model="selectedSize" :category="productsStore.product?.category" />
          </div>

        </div>
    </div>
    <!-- //<h1>
    //  test
    //</h1> -->
        <buy-now-button/>
        <add-to-cart-button :product="productsStore.product" :size="selectedSize" />
    </div>
    <div v-else class="text-center py-12">Product not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../stores/cart'
import { useProducts } from '../stores/products'
import SizeButtons from './SizeButtons.vue'
import BuyNowButton from './BuyNowButton.vue'
import AddToCartButton from './AddToCartButton.vue'

const route = useRoute()
const id = route.params.id

const productsStore = useProducts()
const selectedSize = ref(null)

function addToCart() {
  const cart = useCart()
  if (!productsStore.product) return
  // allow electronics and jewelry to be added without a selected size
  function isJewelryCategory(cat) {
    try {
      const c = String(cat || '').toLowerCase().trim()
      return c === 'jewelery' || c === 'jewellery' || c === 'jewellary' || c === 'jewelry'
    } catch (e) {
      return false
    }
  }

  const cat = productsStore.product?.category || ''
  if (!selectedSize.value && !isJewelryCategory(cat) && String(cat).toLowerCase().trim() !== 'electronics') {
    alert('please select the size first, to add the products to the cart')
    return
  }

  const opts = {}
  if (selectedSize.value) opts.size = selectedSize.value
  cart.addItem(productsStore.product, 1, opts)
  alert('Added to cart')
}

onMounted(() => {
  productsStore.fetchProduct(id)
})
</script>


