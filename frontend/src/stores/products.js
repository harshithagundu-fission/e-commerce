import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProducts = defineStore('products', () => {
  // State for products list
  const products = ref([])
  const productsLoading = ref(false)
  const productsError = ref(null)

  // State for single product
  const product = ref(null)
  const productLoading = ref(false)
  const productError = ref(null)

  // Actions
  async function fetchProducts() {
    productsLoading.value = true
    productsError.value = null
    try {
      const res = await axios.get('https://fakestoreapi.com/products')
      products.value = res.data
    } catch (err) {
      productsError.value = err?.message || 'Failed to load products'
    } finally {
      productsLoading.value = false
    }
  }

  async function fetchProduct(id) {
    productLoading.value = true
    productError.value = null
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      product.value = res.data
    } catch (err) {
      productError.value = err?.message || 'Failed to load product'
    } finally {
      productLoading.value = false
    }
  }

  function clearProduct() {
    product.value = null
    productError.value = null
  }

  return {
    // Products list state
    products,
    productsLoading,
    productsError,
    fetchProducts,

    // Single product state
    product,
    productLoading,
    productError,
    fetchProduct,
    clearProduct
  }
})
