<template>
    
     <!-- Size -->
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
          :class="['px-3 py-1 rounded border', selectedSize === size ? 'bg-fg-brand text-black' : 'bg-gray-100 text-gray-900']"
          :aria-pressed="selectedSize === size"
        >
          {{ size }}
        </button>
      </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '../stores/cart'

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const selectedSize = ref(null)

function selectSize(size) {
  selectedSize.value = size
}
</script>
