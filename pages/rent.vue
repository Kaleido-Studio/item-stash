<template>
  <div class="max-w-[980px] mx-auto">
    <form id="data-form" class="flex flex-col flex-gap-3 sm:p-20 p-3" @submit.prevent="submit">
      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">物品信息</legend>
        <label class="">
          <p>物品名称</p>
          <input
            required
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="name"
            :value="$route.query.name"
            type="text"
          />
        </label>
        <label class="">
          <p>物品数量</p>
          <input
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="item_num"
            :value="1"
            type="number"
          />
        </label>
      </fieldset>

      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">借用人信息</legend>
        <label for="item-org" class="">
          <p>借用人 QQ</p>
          <input
            id="item-date"
            required
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="rent_qq"
            type="text"
          />
        </label>
        <label for="item-org" class="">
          <p>组织（选填）</p>
          <input
            id="item-date"
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="rent_rg"
            type="text"
          />
        </label>
      </fieldset>

      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">时间</legend>
        <label>
          借用时间
          <input
            required
            type="datetime-local"
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="rent_date"
          />
        </label>
        <label>
          预期归还时间
          <input
            required
            type="datetime-local"
            class="b-1 rounded-xl p-1 my-2 px-4 w-full"
            name="return_date"
          />
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
          <input
            class="opacity-0 absolute"
            required
            name="img"
            accept="image/*"
            type="file"
            @change="handleInput"
          />
        </label>
        {{ file ? '成功选择了图片' : '' }}
      </fieldset>

      <!-- field: 备注 -->
      <fieldset class="b-1 p-4 card">
        <legend class="font-bold text-xl text-shadow-sm">备注</legend>
        <textarea
          class="b-1 rounded-xl p-1 my-2 px-4 w-full"
          name="remark"
          placeholder="备注(可选)"
        ></textarea>
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

      <button
        type="submit"
        :class="'ld-ext-right running'"
        class="card cursor-pointer strongify rounded px-2 py-2 mt-2 bg-transparent text-center"
      >
        提交
        <div class="ld ld-ring"></div>
      </button>
    </form>

    {{ process }}
  </div>
</template>

<script setup lang="ts">
import 'ldbutton/index.min.css';
import '@loadingio/loading.css/loading.min.css';
import icon from '../assets/favicon.svg';

const file = ref<File | null>(null);
const imageURL = ref<string | null>(icon);
const previewWindow = ref<HTMLDialogElement | null>();
const process = ref(0);

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
  const result = await postWithProgress('/api/submit', form, (newValue) => {
    process.value = newValue;
  });
  console.log(result);
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
