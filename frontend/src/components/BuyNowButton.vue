<template>
  <button @click="buyNow" type="button" class="inline-flex items-center text-black bg-yellow-400 hover:bg-yellow-500 box-border border border-transparent shadow-sm font-medium rounded text-sm px-4 py-2">
    <svg class="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
    </svg>
    Buy Now
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const props = defineProps({
  product: { type: Object, required: false }
})

const router = useRouter()
const cart = useCart()

function buyNow() {
  // If a product prop is provided, save it for single-item checkout
  if (props.product && props.product.id) {
    try {
      sessionStorage.setItem('checkoutItem', JSON.stringify({ item: props.product, qty: 1 }))
    } catch (e) {
      console.warn('Failed to save checkout item to sessionStorage', e)
    }
  } else {
    // If no product prop, ensure cart has items before proceeding
    if (!cart.items.length) {
      alert('Your bag is empty. Add items before buying.')
      return
    }
    // remove any single-item checkout marker
    sessionStorage.removeItem('checkoutItem')
  }

  // Navigate to the BuyNow route where checkout is handled
  router.push({ name: 'Checkout' })
}
</script>

