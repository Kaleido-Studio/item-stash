<template>
  <Head><Link rel="shortcut icon" :href="favicon" /><Title>物品管理</Title></Head>
  <div class="flex flex-col items-center min-h-[100vh]">
    <TheHeader class="mb-4" />
    <main class="max-w-[80rem] px-2 w-full flex-grow">
      <NuxtPage />
    </main>
    <TheFooter class="mt-4" />
  </div>
  <Plum />
</template>
<script setup lang="ts">
// eslint-disable-next-line import/no-extraneous-dependencies
import '@unocss/reset/tailwind-compat.css';
import favicon from './assets/favicon.svg';
</script>
