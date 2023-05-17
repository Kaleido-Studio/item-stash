<template>
  <Head><Link rel="shortcut icon" :href="favicon" /></Head>
  <TheHeader class="mb-4" />
  <NuxtPage />
  <TheFooter />
  <ClientOnly>
    <Plum />
  </ClientOnly>
</template>
<script setup lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import '@unocss/reset/tailwind-compat.css';
import favicon from './assets/favicon.svg';
</script>
