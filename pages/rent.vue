<template>
  <div>
    <img v-if="imageURL" :src="imageURL" height="200" width="200" class="rounded p-2 card" />
    <label class="cursor-pointer strongify rounded px-2 py-1 mt-2 card">
      <input hidden accept="image/*" type="file" @change="handleInput" />
      设置图片
    </label>
  </div>
</template>
<script setup lang="ts">
import icon from '../assets/favicon.svg';

interface Item {
  id: string;
  name: string;
}

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
const route = useRoute();

const query = computed(() => route.query);

// klala
</script>
