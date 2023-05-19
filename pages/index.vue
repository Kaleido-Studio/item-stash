<template>
  <div class="card p-4 flex flex-col items-center">
    <img
      v-if="imageURL"
      :src="imageURL"
      height="200"
      width="200"
      class="outline-(~ 1 gray) rounded p-2"
    />
    <label class="cursor-pointer outline-(~ 1 gray) rounded px-2 py-1 mt-2">
      <input hidden accept="image/*" type="file" @change="handleInput" />
      上传图片
    </label>
  </div>
</template>
<script setup lang="ts">
import icon from '../assets/favicon.svg';

const file = ref<File | null>(null);
const imageURL = ref<string | null>(icon);
watch(file, async () => {
  if (!file.value) {
    imageURL.value = null;
    return;
  }
  const buffer = await file.value.arrayBuffer();
  const blob = new Blob([buffer], { type: file.value.type });
  imageURL.value = URL.createObjectURL(blob);
});
const handleInput = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  if (!inputElement.files) return;
  [file.value] = inputElement.files;
};
</script>
