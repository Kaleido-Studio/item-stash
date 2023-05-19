<script setup lang="ts">
// @ts-ignore TS2304: Cannot find name 'QRCode'.
import QRCode from 'qrcode';
import { computedAsync } from '@vueuse/core';
import html2canvas from 'html2canvas';

definePageMeta({ middleware: 'auth' });
const baseurl = import.meta.env.DEV ? '/' : (import.meta.env.VITE_DEPLOY_URL as string);
const text = ref('物品名字');
const card = ref<null | HTMLElement>();

const refresh = () => triggerRef(text);

const generatedUrl = computed(
  () => `${baseurl}rent?name=${encodeURIComponent(text.value)}&id=${genId()}`,
);

const imageUrl = computedAsync(() =>
  QRCode.toDataURL(generatedUrl.value, { errorCorrectionLevel: 'H' }),
);

const download = async () => {
  const canvas = await html2canvas(card.value as HTMLElement, {
    scale: 2,
    backgroundColor: 'transparent',
  });
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'rent.png';
  a.click();
};
</script>

<template>
  <div class="flex flex-col items-center max-w-[700px] mx-auto py-10">
    <div class="py-5 w-full">
      <label for="text">物品名称</label>
      <input id="text" v-model="text" type="text" class="card p-3 m-2 bg-white" name="text" />
    </div>

    <div class="pb-5 w-full">
      生成的链接
      <NuxtLink
        :href="`/rent?name=${encodeURIComponent(text)}&id=${genId()}`"
        class="color-[#2F2F2F] font-bold underline bg-white"
      >
        {{ generatedUrl }}
      </NuxtLink>
    </div>

    <div class="w-full flex items-center justify-around flex-gap-10">
      <button class="p-3 card text-(xl center) w-1/2 inline" @click="download">下载该图片</button>
      <button class="p-3 card text-(xl center) w-1/2 inline" @click="refresh">刷新物品ID</button>
    </div>

    <div
      ref="card"
      class="card w-[700px] h-[300px] my-10 b-black bg-white flex flex-row items-center justify-center"
    >
      <div class="flex flex-col justify-center items-end tracking-wider">
        <p class="text-xl">借用物品名称</p>
        <h1 class="text-3xl font-bold">{{ text }}</h1>
        <p class="text-xl">请扫描右侧二维码借用物品</p>
      </div>
      <img :src="imageUrl" alt="" class="w-[250px] h-[250px]" />
    </div>
  </div>
</template>
