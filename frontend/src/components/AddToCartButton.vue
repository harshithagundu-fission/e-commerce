<template>
  <button @click="addToCart" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
    Add to Cart
  </button>
</template>

<script setup>
import { useCart } from '../stores/cart'

const cart = useCart()

// Example product data used by this demo button.
const demoProduct = { id: 101, title: 'FoldSack Backpack', price: 109.95 }

function addToCart() {
  cart.addItem(demoProduct, 1)
  alert('Product added to cart!')
}
</script>
