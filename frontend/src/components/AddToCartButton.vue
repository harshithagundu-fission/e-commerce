<template>
  <button @click="addToCart" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
    Add to Cart
  </button>
</template>

<script setup>
import { useCart } from '../stores/cart'

const props = defineProps({
  product: { type: Object, default: null },
  size: { type: String, default: '' }
})

const cart = useCart()

// product data used by demo button when no product passed
const demoProduct = { id: 101, title: 'FoldSack Backpack', price: 109.95 }

function addToCart() {
  const product = props.product || demoProduct
  const size = props.size || ''

  if (props.product && !size && props.product.category !== 'electronics') {
    alert('please select the size first, to add the products to the cart')
    return
  }

  const opts = {}
  if (size) opts.size = size

  cart.addItem(product, 1, opts)
  alert('Product added to cart!')
}
</script>
