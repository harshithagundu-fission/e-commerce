<template>
  <div>
    <section class="pt-8 max-w-7xl mx-auto p-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Products</h1>
        <p class="text-sm text-muted">Fetched from a sample products API</p>
      </div>

      <!-- Add Product Form -->
      <div class="mb-6">
        <form @submit.prevent="addProduct" class="grid grid-cols-1 sm:grid-cols-2 gap-3 items-end">
          <input v-model="newProduct.title" placeholder="Title" required class="p-2 border rounded" />
          <input v-model.number="newProduct.price" type="number" placeholder="Price" required class="p-2 border rounded" />
          <input v-model="newProduct.image" placeholder="Image URL" class="p-2 border rounded sm:col-span-2" />
          <textarea v-model="newProduct.description" placeholder="Description" rows="2" class="p-2 border rounded sm:col-span-2"></textarea>
          <div class="sm:col-span-2">
            <button type="submit" class="bg-fg-brand text-white px-4 py-2 rounded">Create product</button>
          </div>
        </form>
      </div>

      <!-- Debug / Info -->
      <div class="mb-4 text-sm text-muted">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div>Products in list: <strong>{{ products.length }}</strong></div>
            <div>Selected: <strong>{{ selected.length }}</strong></div>
            <div>
              <button @click="selectAll" class="px-2 py-1 border rounded mr-2">Select all</button>
              <button @click="clearSelection" class="px-2 py-1 border rounded">Clear</button>
            </div>
          </div>
          <div>
            <button @click="showJson = !showJson" class="px-2 py-1 border rounded">{{ showJson ? 'Hide' : 'Show' }} raw JSON</button>
          </div>
        </div>
        <pre v-if="showJson" class="mt-2 max-h-40 overflow-auto text-xs bg-gray-50 p-2 border">{{ JSON.stringify(products, null, 2) }}</pre>
      </div>

      <div v-if="loading" class="py-12 text-center">Loading products...</div>
      <div v-else-if="error" class="py-12 text-center text-red-600">Error: {{ error }}</div>

      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <article v-for="(product, idx) in products" :key="product.id" :class="['border rounded-lg p-4 bg-white shadow-sm relative', isSelected(product.id) ? 'ring-2 ring-fg-brand' : '']" @click.self="toggleSelect(product.id)">
          <label class="absolute top-2 left-2 inline-flex items-center">
            <input type="checkbox" :checked="isSelected(product.id)" @change.stop.prevent="toggleSelect(product.id)" class="w-4 h-4" />
          </label>
          <router-link :to="`/product/${product.id}`">
            <img :src="product.image" alt="" class="h-40 w-full object-contain mb-3 cursor-pointer" />
          </router-link>
          <h2 class="text-md font-semibold truncate">{{ product.title }}</h2>
          <p class="text-sm text-body line-clamp-2 my-2">{{ product.description }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="font-bold">${{ product.price }}</span>
            <button @click.stop.prevent="addProductToSelection(product)" class="bg-fg-brand text-white px-3 py-1 rounded">Add</button>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useCart } from '../stores/cart'

const products = ref([])
const loading = ref(false)
const error = ref(null)
const newProduct = ref({ title: '', price: 0, image: '', description: '' })
const showJson = ref(false)

const sampleProducts = [
  {
    id: 1001,
    title: 'Sample T-Shirt',
    price: 19.99,
    description: 'A comfortable sample T-shirt used as a fallback product.',
    image: 'https://via.placeholder.com/300x300?text=T-Shirt'
  },
  {
    id: 1002,
    title: 'Sample Mug',
    price: 9.99,
    description: 'A sample mug to show product rendering.',
    image: 'https://via.placeholder.com/300x300?text=Mug'
  }
]

async function fetchProducts() {
  loading.value = true
  error.value = null
  try {
    // Using Fake Store API as an example endpoint. Replace with your real API.
    const res = await axios.get('https://fakestoreapi.com/products')
    products.value = res.data
  } catch (err) {
    error.value = err.message || 'Failed to fetch products'
    // Fallback to local sample products so the UI shows something
    products.value = sampleProducts
    console.warn('fetchProducts failed, using sampleProducts fallback', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

// Selection logic
const selected = ref([])

function isSelected(id) {
  return selected.value.includes(id)
}

function toggleSelect(id) {
  const idx = selected.value.indexOf(id)
  if (idx === -1) selected.value.push(id)
  else selected.value.splice(idx, 1)
}

function selectAll() {
  selected.value = products.value.map(p => p.id)
}

function clearSelection() {
  selected.value = []
}

function addProductToSelection(product) {
  // Example action when clicking Add on a product card: ensure it's selected and show console
  const cart = useCart()
  cart.addItem(product, 1)
  if (!isSelected(product.id)) selected.value.unshift(product.id)
  console.log('Product added to cart and selected:', product)
}

async function addProduct() {
  const payload = {
    title: newProduct.value.title,
    price: newProduct.value.price,
    image: newProduct.value.image || 'https://via.placeholder.com/150',
    description: newProduct.value.description || ''
  }

  try {
    // Replace with your real API endpoint if available
    const res = await axios.post('https://fakestoreapi.com/products', payload)
    const created = res?.data || { ...payload, id: Date.now() }
    products.value.unshift(created)
    newProduct.value = { title: '', price: 0, image: '', description: '' }
  } catch (err) {
    // Fallback: add locally if network/API fails
    const fallback = { ...payload, id: Date.now() }
    products.value.unshift(fallback)
    newProduct.value = { title: '', price: 0, image: '', description: '' }
    console.warn('Failed to persist product; added locally', err)
  }
}
</script>