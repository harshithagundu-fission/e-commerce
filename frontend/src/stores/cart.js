import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCart = defineStore('cart', () => {
  const items = ref([]) // each item: { id, title, price, qty }

  function addItem(product, qty = 1) {
    const existing = items.value.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ id: product.id, title: product.title, price: product.price, qty })
    }
  }

  function removeItem(id) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) items.value.splice(idx, 1)
  }

  function clear() {
    items.value = []
  }

  const totalCount = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  const totalPrice = computed(() => items.value.reduce((s, i) => s + i.qty * i.price, 0))

  return { items, addItem, removeItem, clear, totalCount, totalPrice }
})
