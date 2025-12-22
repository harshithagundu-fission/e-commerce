<template>
  <div>
    <Header />

    <section class="pt-20 max-w-7xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">Pricing</h1>
      <p class="mb-4 text-body">Overview of Flowbite pricing tiers and what each version includes.</p>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-default">
          <thead class="bg-neutral-primary-medium">
            <tr>
              <th class="text-left p-3">Plan / Version</th>
              <th class="text-left p-3">Cost</th>
              <th class="text-left p-3">What You Get</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-t">
              <td class="p-3 font-semibold">Open-Source (Free)</td>
              <td class="p-3">₹ 0 / free</td>
              <td class="p-3">Core Flowbite components &amp; community support (<a href="https://www.saasworthy.com/product/flowbite/pricing?utm_source=chatgpt.com" target="_blank" rel="noopener">SaaSworthy</a>)</td>
            </tr>

            <tr class="border-t bg-neutral-secondary-soft">
              <td class="p-3 font-semibold">Flowbite Pro (Dev Edition)</td>
              <td class="p-3"><strong>$299 one-time</strong></td>
              <td class="p-3">Full pro UI blocks, templates, extended components (<a href="https://flowbite.gumroad.com/l/uyrjh?utm_source=chatgpt.com" target="_blank" rel="noopener">Gumroad</a>)</td>
            </tr>

            <tr class="border-t">
              <td class="p-3 font-semibold">Demo Subscription Examples</td>
              <td class="p-3">~$29–$599/mo</td>
              <td class="p-3">Pricing tiers shown in marketing/demo templates — varies by offering (<a href="https://flowbite.com/marketing-ui/demo/pricing/pricing-3/?utm_source=chatgpt.com" target="_blank" rel="noopener">flowbite.com</a>)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-sm text-muted mt-4">Notes: Links open in new tabs and use <code>rel="noopener"</code> for security.</p>
    </section>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue'
</script>
