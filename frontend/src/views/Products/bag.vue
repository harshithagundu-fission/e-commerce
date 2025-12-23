<template>
  <div class="max-w-md bg-white p-4 rounded-lg space-y-4">

    <!-- Price -->
    <div>
      <p class="text-green-600 text-sm font-semibold">Special price</p>
      <p class="text-2xl font-bold">$109.95</p>
    </div>

    <!-- Quick actions: Buy Now (bag) + Clear -->
    <div class="flex items-center gap-3 mt-3">
      <router-link to="/buynow">
        <BuyNowButton />
      </router-link>
      <button @click="clear" class="px-3 py-1 border rounded">Clear bag</button>
      <div class="ml-auto text-sm text-muted">Items: <strong>{{ cart.totalCount }}</strong></div>
    </div>

    
    <!-- Size selector -->
    <div>
      <div class="flex items-center gap-2 mb-2">
        <p class="font-semibold">Size</p>
        <a href="#" class="text-blue-600 text-sm">Size Chart</a>
      </div>

      <div class="flex gap-2">
        <button
          v-for="size in sizes"
          :key="size"
          @click="selectSize(size)"
          :class="[
            'px-3 py-1 rounded border',
            selectedSize === size
              ? 'bg-fg-brand text-white border-transparent'
              : 'bg-white text-black border-gray-300 hover:bg-gray-50'
          ]"
          :aria-pressed="selectedSize === size"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Offers -->
    <div>
      <p class="font-semibold mb-2">Available offers</p>
      <ul class="text-sm space-y-1 text-gray-700">
        <li>✔ 5% cashback on select bank cards <a class="text-blue-600">T&C</a></li>
        <li>✔ Flat ₹50 off on EMI cards <a class="text-blue-600">T&C</a></li>
        <li>✔ Extra 73% off with special price <a class="text-blue-600">T&C</a></li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../../stores/cart'
import BuyNowButton from '../../components/BuyNowButton.vue'

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const selectedSize = ref(null)
const cart = useCart()

function selectSize(size) {
  selectedSize.value = size
}

function remove(id) {
  cart.removeItem(id)
}

function clear() {
  cart.clear()
}

function checkout() {
  alert('Checkout demo: bag contents will be cleared')
  cart.clear()
}
</script>

<style scoped>
.text-gray-700 { color: #374151 }
.bg-fg-brand { background-color: #0ea5a5 }
.text-gray-900 { color: #111827 }
.border-gray-300 { border-color: #d1d5db }
.bg-white { background-color: #ffffff }
.text-black { color: #000000 }
</style>
