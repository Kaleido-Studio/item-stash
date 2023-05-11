<template>here is the rent page.{{ query }}</template>
<script setup lang="ts">
interface Item {
  id: string;
  name: string;
}

const route = useRoute();

const query = computed(() => route.query);
</script>
