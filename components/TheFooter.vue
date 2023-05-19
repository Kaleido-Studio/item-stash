<template>
  <footer class="mx-auto w-full p-2 flex-(~ wrap) gap-2 card transition text-(zinc-400 sm)">
    <p>Backend: Dustella</p>
    <p>Frontend: BeiyanYunyi</p>
    <p class="flex-grow"></p>
    <p>Item-Stash v{{ version }}</p>
  </footer>
</template>
<script setup lang="ts">
import { version } from '../package.json';
</script>
