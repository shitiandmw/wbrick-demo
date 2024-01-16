import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    plugins: [
      vue(),
      visualizer({
        open: false, // 打包完之后自动打开浏览器，显示打包资源占比情况
        gzipSize: true,
        brotliSize: true,
      }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
    ],
    base: env.VITE_DEPLOY_PATH || '/',
    build: {
      outDir: '../public'
    },
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       modifyVars: {
    //         'menu-dark-bg': '#ff3300',
    //       },
    //       javascriptEnabled: true,
    //     }
    //   }
    // },
  });
}
