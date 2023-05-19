// https://nuxt.com/docs/api/configuration/nuxt-config

// get a, b and c from env
// const { a, b, c } = process.env;
import { hashSync } from 'bcryptjs';

export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  ssr: false,
  runtimeConfig: { PASSWORD: hashSync(process.env.PASSWORD!, 10) },
  app: { pageTransition: { name: 'page', mode: 'out-in' } },
});
