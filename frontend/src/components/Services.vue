<template>
  <div>
    <section class="pt-8 max-w-7xl mx-auto p-4">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-3xl font-bold">Products</h1>
      </div>

      <!-- Add Product Form -->
      <div class="mb-6">
        
      </div>

      <!-- Filters / Debug -->
      <div class="mb-4 text-sm text-muted flex items-center justify-between">
        <div class="flex items-center gap-3">
          <label class="text-sm">Filter:</label>
          <select v-model="selectedCategory" class="p-2 border rounded">
            <option value="">All</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
          <!-- <button @click="showJson = !showJson" class="px-2 py-1 border rounded">{{ showJson ? 'Hide' : 'Show' }} raw JSON</button> -->
        </div>
      </div>
      <pre v-if="showJson" class="mt-2 max-h-40 overflow-auto text-xs bg-gray-50 p-2 border">{{ JSON.stringify(products, null, 2) }}</pre>

      <div v-if="loading" class="py-12 text-center">Loading products...</div>
      <div v-else-if="error" class="py-12 text-center text-red-600">Error: {{ error }}</div>

      <div v-else class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <!-- Show only first 4 products on the main page (after filter) -->
        <article v-for="(product, idx) in shownProducts" :key="product.id" class="border rounded-lg p-4 bg-white shadow-sm relative">
          <router-link :to="`/product/${product.id}`">
            <img :src="product.image || 'https://via.placeholder.com/300x300?text=No+Image'" alt="" class="h-40 w-full object-contain mb-3 cursor-pointer" />
          </router-link>
          <h2 class="text-md font-semibold truncate mb-2">{{ product.title }}</h2>
          <p class="text-sm text-body line-clamp-2 my-2">{{ product.description || 'No description available.' }}</p>
          <div class="flex items-center justify-between mt-3">
            <span class="font-bold">${{ product.price }}</span>
            <button @click.stop.prevent="addProductToSelection(product)" class="bg-fg-brand text-white px-3 py-1 rounded">Add</button>
          </div>
        </article>
      </div>
      <!-- Pagination (only visible when a category filter is applied) -->
      <div v-if="selectedCategory" class="mt-6 flex items-center justify-center gap-3">
        <button @click="prevPage" :disabled="page === 1" class="px-3 py-1 border rounded disabled:opacity-50">Prev</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page >= totalPages" class="px-3 py-1 border rounded disabled:opacity-50">Next</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useCart } from '../stores/cart'

const router = useRouter()

const products = ref([])
const loading = ref(false)
const error = ref(null)
const newProduct = ref({ title: '', price: 0, image: '', description: '', category: '' })
const showJson = ref(false)
const selectedCategory = ref('')

const page = ref(1)
const pageSize = ref(4)

const filteredProducts = computed(() => {
  const cat = (selectedCategory.value || '').toLowerCase().trim()
  if (!cat) return products.value || []
  // exact match on category to avoid partial matches (e.g., 'men' matching 'women')
  return (products.value || []).filter(p => (((p.category || '') + '').toLowerCase().trim() === cat))
})

  const totalPages = computed(() => Math.max(1, Math.ceil((filteredProducts.value || []).length / pageSize.value)))

// Fisher-Yates shuffle (non-mutating)
function shuffleArray(arr) {
  const a = (arr || []).slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = a[i]
    a[i] = a[j]
    a[j] = tmp
  }
  return a
}

const shuffledAll = computed(() => shuffleArray(products.value || []))

const shownProducts = computed(() => {
  // If no category filter (All) show all products (shuffled, no page limit)
  if (!selectedCategory.value) return shuffledAll.value

  // For filtered views, if there are matches use them; otherwise, if the selected
  // category matches our backpack fallback, return the backpack so the UI shows
  // its image/description instead of empty placeholders.
  const matched = filteredProducts.value || []
  if (matched.length === 0) {
    return []
  }

  const shuffled = shuffleArray(matched)
  const start = (page.value - 1) * pageSize.value
  const end = start + pageSize.value
  return shuffled.slice(start, end)
})

// Reset page when filter changes
watch(selectedCategory, () => { page.value = 1 })

const sampleProducts = [
  {
    id: 1001,
    title: 'Sample T-Shirt',
    price: 19.99,
    description: 'A comfortable sample T-shirt used as a fallback product.',
    category: 'clothing',
    image: 'https://via.placeholder.com/300x300?text=T-Shirt'
  },
  {
    id: 1002,
    title: 'Sample Mug',
    price: 9.99,
    description: 'A sample mug to show product rendering.',
    category: 'home',
    image: 'https://via.placeholder.com/300x300?text=Mug'
  }
]

// Dynamic categories derived from products
const categories = computed(() => {
  const set = new Set()
  ;(products.value || []).forEach(p => {
    if (p && p.category) set.add(p.category)
  })
  // ensure 'others' category is present if any product claims it
  return Array.from(set)
})

async function fetchProducts() {
  loading.value = true
  error.value = null
  try {
    // Using Fake Store API as an example endpoint. Replace with your real API.
    const res = await axios.get('https://fakestoreapi.com/products')
    products.value = res.data
    // Normalize categories: move any Foldsack backpack product to 'others'
    products.value.forEach(p => {
      try {
        const t = String(p.title || '').toLowerCase()
        if (t.includes('fjallraven') || t.includes('foldsack') || t.includes('fold sack')) {
          p.category = 'others'
        }
      } catch (e) {
        // ignore
      }
    })

    // Remove any duplicate demo/backpack product with exact title 'FoldSack Backpack'
    products.value = products.value.filter(p => String(p.title || '').trim() !== 'FoldSack Backpack')

    // Removed demo backpack fallback insertion to avoid duplicate/empty products
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

// Add-to-cart helper
function addProductToSelection(product) {
  // Require the user to select size on the product detail page
  alert('please select the size first, to add the products to the cart')
  router.push(`/product/${product.id}`)
}

function prevPage() {
  page.value = Math.max(1, page.value - 1)
}

function nextPage() {
  page.value = Math.min(totalPages.value, page.value + 1)
}

async function addProduct() {
  const payload = {
    title: newProduct.value.title || 'Untitled Product',
    price: newProduct.value.price,
    image: newProduct.value.image || 'https://via.placeholder.com/150',
    description: newProduct.value.description || '',
    category: newProduct.value.category || ''
  }

  try {
    // Replace with your real API endpoint if available
    const res = await axios.post('https://fakestoreapi.com/products', payload)
    const created = res?.data || { ...payload, id: Date.now() }
    products.value.unshift(created)
    newProduct.value = { title: '', price: 0, image: '', description: '', category: '' }
    page.value = 1
  } catch (err) {
    // Fallback: add locally if network/API fails
    const fallback = { ...payload, id: Date.now() }
    products.value.unshift(fallback)
    newProduct.value = { title: '', price: 0, image: '', description: '', category: '' }
    page.value = 1
    console.warn('Failed to persist product; added locally', err)
  }
}
</script>