<script setup lang="ts">
const file = ref<File | null>(null);
const imageURL = ref<string | null>(null);
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

<template>
  <div>
    <h1>Hello There</h1>
    <img v-if="imageURL" :src="imageURL" height="200" width="200" />

    <label class="hover:cursor-pointer">
      <input hidden accept="image/*" type="file" @change="handleInput" />
      上传图片
    </label>
  </div>
</template>
