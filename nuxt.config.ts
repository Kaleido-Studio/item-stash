// https://nuxt.com/docs/api/configuration/nuxt-config

// get a, b and c from env
// const { a, b, c } = process.env;
const { accountId, apiToken, namespaceId } = process.env;

export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  nitro: {
    storage: {
      KV: {
        driver: 'cloudflare-kv-http',
        accountId,
        apiToken,
        namespaceId,
      },
    },
  },
});
