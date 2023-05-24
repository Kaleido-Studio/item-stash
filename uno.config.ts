/* eslint-disable import/no-extraneous-dependencies */
import {
  defineConfig,
  presetAttributify,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetAttributify()],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  shortcuts: {
    card:
      'backdrop-(blur-2 filter saturate-75) hover:(backdrop-blur-8 backdrop-saturate-60 drop-shadow-md) ' +
      'focus-within:(backdrop-blur-16 backdrop-saturate-50 drop-shadow) ' +
      'rounded-lg shadow shadow-gray-300 filter drop-shadow-lg transition',
    strongify: 'outline-(~ 1 zinc-300)',
  },
});
