<template>
  <footer
    class="mx-auto w-full p-2 flex-(~ wrap) justify-between gap-2 card transition text-(zinc-400 sm)"
  >
    <p>Dustella & BeiyanYunyi</p>
    <a href="https://github.com/Kaleidom/item-stash" target="_blank" class="underline">
      Copyleft · AGPLv3
    </a>
    <p>Item-Stash v{{ version }}</p>
  </footer>
</template>
<script setup lang="ts">
import { version } from '../package.json';
</script>
