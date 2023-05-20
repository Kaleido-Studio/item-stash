<template>
  <div class="max-w-[980px] mx-auto">
    <form id="data-form" class="flex flex-col flex-gap-3 sm:p-20 p-3" @submit.prevent="submit">
      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">物品信息</legend>
        <label class="">
          <p>物品名称</p>
          <input
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="name"
            :value="$route.query.name"
            type="text"
          />
        </label>
        <label class="">
          <p>物品数量</p>
          <input class="b-1 rounded-xl p-1 my-2 px-4 w-full" name="name" :value="1" type="number" />
        </label>
      </fieldset>

      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">借用人信息</legend>
        <label for="item-org" class="">
          <p>借用人 QQ</p>
          <input
            id="item-date"
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="org"
            type="text"
          />
        </label>
        <label for="item-org" class="">
          <p>组织（选填）</p>
          <input
            id="item-date"
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="org"
            type="text"
          />
        </label>
      </fieldset>

      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">时间</legend>
        <label>
          借用时间
          <input type="datetime-local" class="b-1 rounded-xl p-1 my-2 px-4 w-full" name="date" />
        </label>
        <label>
          预期归还时间
          <input type="datetime-local" class="b-1 rounded-xl p-1 my-2 px-4 w-full" name="date" />
        </label>
      </fieldset>

      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">设置图片</legend>
        <!-- <br class="h-0" /> -->
        <label
          class="cursor-pointer strongify rounded px-2 mb-2 py-1 block w-25 text-center card"
          @click="preview"
        >
          {{ file ? '预览图片' : '上传图片' }}
          <input name="img" hidden accept="image/*" type="file" @change="handleInput" />
        </label>
        {{ file ? '成功选择了图片' : '' }}
      </fieldset>

      <dialog ref="previewWindow" class="rounded-xl animate-fadein animater">
        <fieldset class="b-1 p-4 card">
          <legend class="font-bold text-xl">图片预览</legend>
          <img v-if="imageURL" :src="imageURL" height="200" width="200" class="rounded p-2 card" />
        </fieldset>
        <div class="flex justify-between pt-10">
          <button
            class="cursor-pointer strongify rounded px-2 mb-2 py-1 block w-25 text-center card"
            @click="
              imageURL = null;
              file = null;
              previewWindow?.close();
            "
          >
            重新选择
          </button>
          <button
            class="cursor-pointer strongify rounded px-2 mb-2 py-1 block w-25 text-center card"
            @click="previewWindow?.close()"
          >
            确认
          </button>
        </div>
      </dialog>

      <input
        id="sub"
        class="cursor-pointer strongify rounded px-2 py-1 mt-2 bg-transparent"
        type="submit"
        value="提交"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import icon from '../assets/favicon.svg';

const file = ref<File | null>(null);
const imageURL = ref<string | null>(icon);
const previewWindow = ref<HTMLDialogElement | null>();

const handleInput = (e: Event) => {
  const inputElement = e.target as HTMLInputElement;
  if (!inputElement.files) return;
  if (inputElement.files.length === 0) return;
  [file.value] = inputElement.files;

  const reader = new FileReader();
  reader.readAsDataURL(file.value);
  reader.onloadend = () => {
    imageURL.value = reader.result as string;
  };
};

const submit = async (e: Event) => {
  const form = new FormData(e.target as HTMLFormElement);
};

const preview = (e: Event) => {
  if (file.value === null) return;
  e.stopPropagation();
  e.preventDefault();
  previewWindow.value?.showModal();
};
</script>

<style module>
@keyframes fadein {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.6);
  }
}

dialog[open] {
  animation-name: fadein;
  animation-duration: 0.4s;
  animation-fill-mode: both;
}

dialog {
  animation-name: fadeout;
  animation-duration: 0.4s;
  animation-fill-mode: both;
}
</style>
