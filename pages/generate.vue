<script setup lang="ts">
// @ts-ignore TS2304: Cannot find name 'QRCode'.
import QRCode from 'qrcode';
import { computedAsync } from '@vueuse/core';
import html2canvas from 'html2canvas';

const text = ref('物品名字');
const card = ref<null | HTMLElement>();

const refresh = () => triggerRef(text);

const generatedUrl = computed(
  () => `https://item.0w0.al/rent?name=${encodeURIComponent(text.value)}&id=${genId()}`,
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
  <div class="max-w-[980px] mx-auto p-5 py-10">
    la
    <div class="py-10">
      <label for="text">Name</label>
      <input id="text" v-model="text" type="text" class="p-3 b-1 bg-white" name="text" />
      <button class="p-3 bg-blue-500 text-white" @click="refresh">刷新下一个该物品</button>
    </div>
    <a :href="generatedUrl" class="color-blue underline bg-white p-2">{{ generatedUrl }}</a>
    <div ref="card" class="w-[700px] h-[300px] m-3 b-3 b-black bg-white flex flex-row">
      <div class="flex flex-col justify-center items-end tracking-wider">
        <p class="text-xl">借用物品名称</p>
        <h1 class="text-3xl font-bold">{{ text }}</h1>
        <p class="text-xl">请扫描右侧二维码借用物品</p>
      </div>
      <img :src="imageUrl" alt="" />
    </div>
    <button class="p-3 bg-blue-500 text-white" @click="download">下载</button>
  </div>
</template>
