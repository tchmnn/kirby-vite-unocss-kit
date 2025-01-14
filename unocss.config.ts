import {
  defineConfig,
  presetTypography,
  presetIcons,
  presetWind,
} from "unocss";

export default defineConfig({
  shortcuts: [
    { box: "max-w-7xl mx-auto bg-gray-100 rounded-md shadow-sm p-4" },
  ],
  presets: [presetWind(), presetIcons(), presetTypography()],
});
