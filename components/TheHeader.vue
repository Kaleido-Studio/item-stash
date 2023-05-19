<template>
  <nav
    class="text-2xl mx-auto w-full p-4 backdrop-(blur-2 saturate-75) backdrop-filter hover:(backdrop-blur-16 backdrop-saturate-50) rounded-lg shadow shadow-gray-300 drop-shadow-md transition"
  >
    <h3>
      <NuxtLink href="/">
        <img :src="favicon" height="24" width="24" class="inline" />
        物品管理
      </NuxtLink>
    </h3>
  </nav>
</template>
<script setup lang="ts">
import favicon from '../assets/favicon.svg';
</script>
