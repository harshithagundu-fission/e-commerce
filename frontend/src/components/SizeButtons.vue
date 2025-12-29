<template>
  <div>
    <div class="flex items-center gap-2 mb-2">
      <p class="font-semibold">Size</p>
      <template v-if="isElectronics">
        <button type="button" class="text-yellow-700 bg-yellow-100 px-2 py-1 rounded text-sm" aria-hidden="true">Only this is available for now</button>
      </template>
      <template v-else>
        <button
          type="button"
          @click="openChart"
          class="text-blue-600 text-sm underline focus:outline-2 focus:outline-offset-2"
          aria-controls="size-chart"
          :aria-expanded="showChart"
        >
          Size Chart
        </button>
      </template>
    </div>

    <div class="flex gap-2" v-if="!isElectronics">
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

    <div v-if="showChart" id="size-chart" role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-4 shadow-lg">
        <div class="flex items-start justify-between mb-3">
          <h2 class="text-lg font-semibold">Size Chart</h2>
          <button ref="closeBtn" @click="closeChart" class="px-2 py-1 rounded text-sm bg-gray-100" aria-label="Close size chart">Close</button>
        </div>
        <div class="text-sm">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="border-b pb-2">Size</th>
                <th class="border-b pb-2">Chest (in)</th>
                <th class="border-b pb-2">Waist (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in sizes" :key="s">
                <td class="py-2">{{ s }}</td>
                <td class="py-2">{{ sizeMeasurements[s].chest }}</td>
                <td class="py-2">{{ sizeMeasurements[s].waist }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: null },
  category: { type: String, default: '' }
})
const emit = defineEmits(['update:modelValue'])

const sizes = ['S', 'M', 'L', 'XL', 'XXL']
const sizeMeasurements = {
  S: { chest: '34-36', waist: '28-30' },
  M: { chest: '38-40', waist: '31-33' },
  L: { chest: '42-44', waist: '34-36' },
  XL: { chest: '46-48', waist: '38-40' },
  XXL: { chest: '50-52', waist: '42-44' }
}

const showChart = ref(false)
const closeBtn = ref(null)

const isElectronics = computed(() => {
  try {
    return String(props.category || '').toLowerCase().trim() === 'electronics'
  } catch (e) {
    return false
  }
})

const selectedSize = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v)
})

function selectSize(size) {
  selectedSize.value = size
}

function openChart() {
  showChart.value = true
  nextTick(() => {
    if (closeBtn.value && typeof closeBtn.value.focus === 'function') closeBtn.value.focus()
  })
}

function closeChart() {
  showChart.value = false
}

function handleKey(e) {
  if (e.key === 'Escape' && showChart.value) closeChart()
}

window.addEventListener('keydown', handleKey)
onBeforeUnmount(() => window.removeEventListener('keydown', handleKey))
</script>
