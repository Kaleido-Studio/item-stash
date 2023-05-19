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
    card: 'backdrop-blur-2 backdrop-filter backdrop-saturate-75 hover:backdrop-blur-16 hover:backdrop-saturate-50 rounded-lg shadow shadow-gray-300 filter drop-shadow-2xl transition',
  },
});
