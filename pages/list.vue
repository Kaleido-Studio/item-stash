<template>
  <div class="max-w-[980px] mx-auto">
    <table class="w-full border-collapse border-2! card text-center">
      <thead>
        <tr>
          <th class="border-2! py-3 text-[1.1rem]">物品名称</th>
          <th class="border-2! py-3 text-[1.1rem]">借用时间</th>
          <th class="border-2! py-3 text-[1.1rem]">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.name">
          <td class="border-1! py-2">{{ item.metadata.name ?? '' }}</td>
          <td class="border-1! py-2">{{ new Date(parseInt(item.name)).toLocaleString() }}</td>
          <td class="border-1! py-2">
            <button class="card px-3 py-1">详情</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <dialog id="info">占位</dialog>
</template>
<script setup lang="ts">
definePageMeta({ middleware: 'auth' });

const list = ref<
  {
    metadata: {
      name: string;
      time_begin: string;
      rent_qq: string;
    };
    name: string;
  }[]
>([]);

onMounted(async () => {
  const res = await useFetch<
    {
      metadata: {
        name: string;
        time_begin: string;
        rent_qq: string;
      };
      name: string;
    }[]
  >('/api/entries');
  list.value = res.data.value!;
});
</script>
