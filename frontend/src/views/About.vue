<template>
    <div>
        <div class="pt-20 max-w-7xl mx-auto p-4">
            <!-- <h1 class="text-3xl font-bold mb-4">About Us</h1>
            <p class="text-lg text-body mb-6">Welcome to our application! We are dedicated to providing the best service possible.</p>
            <p class="text-lg text-body">Flowbite helps you build modern websites faster by giving ready-made UI components styled with Tailwind CSS.</p>
            <p class="text-lg text-body font-semibold mt-4">Use Flowbite when:</p>
            <ul class="list-disc pl-6 text-lg text-body">
                <li>You are using Tailwind CSS</li>
                <li>You want fast UI development</li>
                <li>You don’t want to design everything yourself</li>
            </ul> -->

            <section class="mt-8 bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold mb-3">Logged-in user</h2>
                <div v-if="hasAuth">
                    <p><strong>Email:</strong> {{ authEmail }}</p>
                    <p v-if="authToken"><strong>Login token:</strong> {{ authToken }}</p>
                    <p v-if="authId"><strong>Login id:</strong> {{ authId }}</p>
                </div>
                <div v-else class="text-sm text-muted">No user is currently logged in.</div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const authEmail = ref('')
const authToken = ref('')
const authId = ref('')
const hasAuth = ref(false)

function readAuth() {
    try {
        authEmail.value = localStorage.getItem('authEmail') || ''
        authToken.value = localStorage.getItem('authToken') || ''
        authId.value = localStorage.getItem('authId') || ''
        hasAuth.value = !!(authEmail.value || authToken.value || authId.value)
    } catch (e) {
        authEmail.value = ''
        authToken.value = ''
        authId.value = ''
        hasAuth.value = false
    }
}

onMounted(() => {
    readAuth()
    // listen for storage events so About updates if auth changes in another tab
    window.addEventListener('storage', readAuth)
})
</script>