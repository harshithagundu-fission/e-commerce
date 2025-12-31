<template>
    <div class="max-w-3xl mx-auto mt-20 p-6">
        <h1 class="text-2xl font-bold mb-4">Checkout</h1>

        <div v-if="checkoutItem">
            <h2 class="text-lg font-semibold">Purchasing</h2>
            <div class="mt-3 p-4 border rounded bg-white">
                <div class="flex items-start gap-4">
                    <img :src="checkoutItem.image" alt="" class="w-28 h-28 object-contain" />
                    <div>
                        <div class="font-semibold">{{ checkoutItem.title }}</div>
                        <div class="text-sm text-muted">{{ checkoutQty }} x ${{ checkoutItem.price }}</div>
                        <div class="mt-2">Total: <strong>${{ (checkoutQty * checkoutItem.price).toFixed(2) }}</strong></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <h2 class="text-lg font-semibold">Bag Items</h2>
            <div v-if="cart.items.length === 0" class="text-sm text-muted mt-2">Your bag is empty.</div>
            <div v-else class="space-y-3 mt-3">
                <div v-for="item in cart.items" :key="item.id" class="flex items-center justify-between p-3 border rounded bg-white">
                    <div>
                        <div class="font-semibold">{{ item.title }}</div>
                        <div class="text-sm text-muted">Qty: {{ item.qty }}</div>
                    </div>
                    <div class="text-right">
                        <div class="font-semibold">${{ (item.price * item.qty).toFixed(2) }}</div>
                    </div>
                </div>

                <div class="flex items-center justify-between p-3 border rounded bg-gray-50">
                    <div>Total items: <strong>{{ cart.totalCount }}</strong></div>
                    <div>Total: <strong>${{ cart.totalPrice.toFixed(2) }}</strong></div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex gap-3">
            <button @click="confirmPurchase" class="bg-fg-brand text-white px-4 py-2 rounded">Confirm Purchase</button>
            <button v-if="!checkoutItem" @click="clearCart" class="px-4 py-2 border rounded">Clear Bag</button>
            <router-link to="/" class="px-4 py-2 text-sm text-muted">Continue shopping</router-link>
        </div>

        <div v-if="message" class="mt-4 text-green-600">{{ message }}</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../stores/cart'

const router = useRouter()
const cart = useCart()

const checkoutItem = ref(null)
const checkoutQty = ref(1)
const message = ref('')

onMounted(() => {
    try {
        const raw = sessionStorage.getItem('checkoutItem')
        if (raw) {
            const parsed = JSON.parse(raw)
            checkoutItem.value = parsed.item || null
            checkoutQty.value = parsed.qty || 1
        }
    } catch (e) {
        console.warn('Failed to read checkoutItem from sessionStorage', e)
    }
})

function confirmPurchase() {
    // Demo purchase: simulate success and clear relevant state
    if (checkoutItem.value) {
        // single-item checkout
        message.value = `Purchase successful: ${checkoutItem.value.title} x ${checkoutQty.value}`
        sessionStorage.removeItem('checkoutItem')
    } else if (cart.items.length) {
        message.value = `Purchase successful: ${cart.totalCount} item(s) — $${cart.totalPrice.toFixed(2)}`
        cart.clear()
    } else {
        alert('Nothing to purchase')
        return
    }

    // Optional: after a brief delay, redirect to home
    setTimeout(() => {
        router.push('/')
    }, 1200)
}

function clearCart() {
    cart.clear()
}
</script>

