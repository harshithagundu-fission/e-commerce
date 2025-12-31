<template>
  <div class="max-w-4xl mx-auto mt-20 p-6">
    <h1 class="text-2xl font-bold mb-4">Your Cart</h1>
    <div v-if="cart.items.length === 0" class="text-center text-muted">Your cart is empty.</div>
    <div v-else class="space-y-4">
      <div v-for="item in cart.items" :key="item.id" class="flex items-center justify-between p-4 border rounded">
        <div>
          <div class="font-semibold">{{ item.title }}</div>
          <div class="text-sm text-muted">Qty: {{ item.qty }}</div>
          <div v-if="item.size" class="text-sm text-muted">Size: {{ item.size }}</div>
        </div>
        <div class="text-right">
          <div class="font-semibold">${{ (item.price * item.qty).toFixed(2) }}</div>
          <button @click="remove(item.id)" class="mt-2 text-sm text-red-600">Remove</button>
        </div>
      </div>

      <div class="flex items-center justify-between mt-4 p-4 border rounded bg-gray-50">
        <div>Total items: <strong>{{ cart.totalCount }}</strong></div>
        <div>Total: <strong>${{ cart.totalPrice.toFixed(2) }}</strong></div>
      </div>

      <div class="mt-4 flex gap-2">
        <button @click="checkout" class="bg-fg-brand text-white px-4 py-2 rounded">Checkout</button>
        <button @click="clear" class="px-4 py-2 border rounded">Clear cart</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../stores/cart'
const cart = useCart()

function remove(id) {
  cart.removeItem(id)
}

function clear() {
  cart.clear()
}

function checkout() {
  alert('Checkout demo: cart contents will be cleared')
  cart.clear()
}
</script>

