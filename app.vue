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
import '@unocss/reset/tailwind.css';
import 'vue-toastification/dist/index.css';
import { provideToast } from 'vue-toastification';
import favicon from './assets/favicon.svg';

provideToast({
  timeout: 2000,
  hideProgressBar: true,
  // @ts-expect-error vendor
  position: 'top-center',
});
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
input {
  @apply bg-transparent;
}
</style>
