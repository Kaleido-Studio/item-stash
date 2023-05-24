<script setup>
import SuccessSvg from '../assets/success.svg';
import FailSvg from '../assets/fail.svg';

const { query } = useRoute();
</script>

<template>
  <div class="card bg-white p-5 py-20 text-center m-4 mt-10">
    <div v-if="query?.success === 'true'">
      <img :src="SuccessSvg" />
      <h1 class="text-(center 2xl)">操作成功喵</h1>
      <p class="text-(center base) mt-5">借用物品：{{ query?.name }}</p>
      <p class="text-(center base) mt-2">
        借用时间：{{ new Date(parseInt(query?.time)).toLocaleString() }}
      </p>
      <p class="text-(center base) mt-2">请记得按时归还，</p>
    </div>
    <div v-else>
      <img :src="FailSvg" />
      <h1 class="text-(center 2xl)">操作失败喵</h1>
    </div>
  </div>
</template>
