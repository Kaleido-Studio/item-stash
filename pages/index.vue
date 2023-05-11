<script setup lang="ts">
const res = await useFetch('/api/hello');
</script>

<template>
  <div>
    <h1>Hello There</h1>
    {{ res }}
  </div>
</template>
