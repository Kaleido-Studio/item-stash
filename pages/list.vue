<template>
  <div>
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
          <tr v-for="item in entriesList" :key="item.name">
            <td class="border-1! py-2">{{ item.metadata.name ?? '' }}</td>
            <td class="border-1! py-2">{{ new Date(parseInt(item.name)).toLocaleString() }}</td>
            <td class="border-1! py-2">
              <button class="card px-3 py-1" @click="openDialog(item)">详情</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <dialog id="info" ref="dialog" class="rounded-xl card h-2/3 w-4/5">
      <form class="flex flex-col">
        {{ info }}
        <div class="flex sm:flex-row-reverse flex-col items-center justify-center">
          <div class="sm:p-20">
            <section>
              <div class="inline-block">
                <h4 class="text-gray-600 py-1 pt-5">物品名字</h4>
                <p class="font-bold">{{ info?.metadata?.name ?? '无' }}</p>
              </div>
              <div class="inline-block pl-6">
                <h4 class="text-gray-600 py-1 pt-5">物品数量</h4>
                <p class="font-bold">{{ info?.metadata?.item_num ?? 0 }}</p>
              </div>
            </section>
            <section>
              <div class="inline-block">
                <h4 class="text-gray-600 py-1 pt-5">联系方式</h4>
                <p class="font-bold">{{ info?.metadata?.rent_qq ?? '未填写' }}</p>
              </div>
              <div class="inline-block pl-6">
                <h4 class="text-gray-600 py-1 pt-5">组织</h4>
                <p class="font-bold">{{ info?.metadata?.organization ?? '未填写' }}</p>
              </div>
            </section>
            <section>
              <h4 class="text-gray-600 py-1 pt-5">租借时间</h4>
              <p class="font-bold">{{ new Date(info!.metadata.rent_date).toLocaleString() }}</p>
              <h4 class="text-gray-600 py-1 pt-5">预期归还时间</h4>
              <p class="font-bold">{{ new Date(info!.metadata.return_date).toLocaleString() }}</p>
            </section>
            <section>
              <h4 class="text-gray-600 py-1 pt-5">备注</h4>
              <p class="font-bold">{{ info?.metadata?.remark || '未填写' }}</p>
            </section>
          </div>
          <img class="sm:max-w-1/5 w-4/5 max-h-[500px] card shadow-2xl" :src="imageData" />
        </div>
        <button
          class="card mx-auto m-5 strongify bg-transparent mt-4 py-1 px-7"
          formmethod="dialog"
        >
          关闭
        </button>
      </form>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import type { KVValue } from '~/server/utils/useKV';

definePageMeta({ middleware: 'auth' });
const dialog = ref<HTMLDialogElement | null>(null);

const imageData = ref<string>('');

const { entriesList, entriesUpdatedAt, loadEntries } = useEntries();

const info = ref<KVValue>({
  name: '',
  metadata: {
    name: '',
    item_num: 0,
    rent_qq: '',
    organization: '',
    rent_date: 0,
    return_date: 0,
    remark: '',
  },
});

onMounted(() => {
  if (!entriesUpdatedAt.value) {
    loadEntries();
  }
});

const openDialog = async (item: KVValue) => {
  dialog?.value?.showModal();
  info.value = item;
  const image = await useFetch(`/api/entries/${item.name}`);
  const imageHexBinString = image.data.value!;
  // convert hex into image base64
  imageData.value = `data:image/png;base64,${imageBase64String(imageHexBinString)}`;
};
</script>
