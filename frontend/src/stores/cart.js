import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'


export const useCart = defineStore('cart', () => {
  const items = ref([]) // each item: { id: uniqueKey, productId, title, price, qty, size }

  // Rehydrate from localStorage (persist cart across refreshes)
  try {
    const raw = localStorage.getItem('cart')
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) items.value = parsed
    }
  } catch (err) {
    // if parsing fails, ignore and start with empty cart
    console.warn('Failed to load cart from localStorage', err)
  }

  // Persist cart whenever items change
  watch(items, (val) => {
    try {
      localStorage.setItem('cart', JSON.stringify(val))
    } catch (err) {
      console.warn('Failed to save cart to localStorage', err)
    }
  }, { deep: true })

  // Sync across tabs/windows
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') {
        try {
          const newVal = e.newValue ? JSON.parse(e.newValue) : []
          items.value = newVal
        } catch (err) {
          console.warn('Failed to parse cart from storage event', err)
        }
      }
    })
  }

  function addItem(product, qty = 1, opts = {}) {
    const size = opts.size || 'default'
    const key = `${product.id}::${size}`
    const existing = items.value.find(i => i.id === key)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ id: key, productId: product.id, title: product.title, price: product.price, qty, size })
    }
  }

  function removeItem(id) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  function clear() {
    items.value = []
  }

  const totalCount = computed(() => items.value.reduce((s, i) => s + (i.qty || 0), 0))
  const totalPrice = computed(() => items.value.reduce((s, i) => s + (i.qty || 0) * (i.price || 0), 0))

  return { items, addItem, removeItem, clear, totalCount, totalPrice }
})
