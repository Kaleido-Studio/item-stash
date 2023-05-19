<template>
  <div class="p-4 flex flex-col items-center">
    <div class="flex-(~ col) max-w-sm w-full">
      <h1 class="px-2 py-1 text-(xl center)">请先登录</h1>
      <form class="flex-(~ col)" @submit.prevent="handleSubmit">
        <label class="card p-4 mt-4">
          密码
          <input v-model="password" type="password" class="strongify p-2 rounded" />
        </label>
        <button type="submit" class="card strongify bg-transparent mt-4 py-1 px-2">登录</button>
      </form>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { FetchError } from 'ofetch';
import { useToast } from 'vue-toastification';

const route = useRoute();
const query = computed(() => route.query as { redirect?: string });
const loggedin = useLogin();
const password = ref('');
const toast = useToast();
const handleSubmit = (e: Event) => {
  $fetch('/api/checkpwd', { method: 'POST', body: { password: password.value } })
    .then(() => {
      loggedin.value = true;
      navigateTo(query.value.redirect || '/', { replace: true });
    })
    .catch((ev) => {
      const event = ev as FetchError;
      switch (event.status) {
        case 400:
          toast.error('请输入密码');
          break;
        case 401:
          toast.error('密码错误');
          break;
        default:
          break;
      }
    });
};
</script>
