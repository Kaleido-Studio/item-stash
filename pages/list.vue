<template>
  <div class="max-w-[980px] mx-auto">
    <table class="w-full">
      <thead>
        <tr>
          <th>物品名称</th>
          <th>借用时间</th>
          <th>物品ID</th>
          <th>操作</th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
</script>
