<template>
  <div>
    <Header />

    <section class="pt-20 max-w-7xl mx-auto p-4">
      <h1 class="text-3xl font-bold mb-4">Flowbite Overview</h1>

      <p class="text-lg text-body mb-6">
        Flowbite is a UI component library built on Tailwind CSS, offering a large set of pre-built
        UI elements you can use to build interfaces quickly.
      </p>

      <div class="grid gap-4 md:grid-cols-3">
        <article class="p-4 border rounded-lg bg-neutral-primary-medium">
          <h2 class="text-xl font-semibold mb-2">1. UI Component Library (Core)</h2>
          <p class="text-body mb-2">Includes buttons, navbars, cards, alerts, modals, dropdowns, tooltips, date-pickers, forms, pagination, etc.</p>
          <a href="https://flowbite.com" target="_blank" rel="noopener" class="text-fg-brand hover:underline">flowbite.com</a>
        </article>

        <article class="p-4 border rounded-lg bg-neutral-primary-medium">
          <h2 class="text-xl font-semibold mb-2">2. Interactive Components with JavaScript</h2>
          <p class="text-body mb-2">Many components include interactive behavior via data attributes or JS initialization APIs (modals, dropdowns, tabs).</p>
          <a href="https://flowbite.com" target="_blank" rel="noopener" class="text-fg-brand hover:underline">flowbite.com</a>
        </article>

        <article class="p-4 border rounded-lg bg-neutral-primary-medium">
          <h2 class="text-xl font-semibold mb-2">3. Tailwind CSS Integration</h2>
          <ul class="list-disc pl-5 text-body">
            <li>Works as a plugin for Tailwind</li>
            <li>Uses Tailwind utility classes for styling</li>
            <li>Supports ESM and CJS JavaScript modules</li>
          </ul>
          <a href="https://flowbite.com" target="_blank" rel="noopener" class="text-fg-brand hover:underline mt-2 block">flowbite.com</a>
        </article>
      </div>

      <div class="mt-6">
        <p class="text-lg font-semibold">Quick usage</p>
        <ul class="list-disc pl-6">
          <li>Install `flowbite` and add it to your `tailwind.config.js` content/plugins (recommended).</li>
          <li>Or use the Flowbite JS CDN if you prefer not to install the package.</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>