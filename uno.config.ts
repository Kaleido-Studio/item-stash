/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'unocss/vite';
import {
  presetWind,
  presetAttributify,
  transformerAttributifyJsx,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss';

export default defineConfig({
  presets: [presetWind(), presetAttributify()],
  transformers: [transformerAttributifyJsx(), transformerVariantGroup(), transformerDirectives()],
  shortcuts: {
    card: 'backdrop-blur-8 backdrop-filter backdrop-saturate-75 hover:backdrop-blur-16 hover:backdrop-saturate-50 rounded-lg shadow shadow-gray-300 filter drop-shadow-2xl transition',
  },
});
