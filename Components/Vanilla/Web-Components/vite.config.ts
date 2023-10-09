import { defineConfig } from 'vitest/config'
import sassDts from 'vite-plugin-sass-dts'
import { resolve } from 'path';

export default defineConfig({
   test: {
      environment: 'jsdom',
      coverage: {
         provider: 'istanbul'
      }
   },
   preview: {
      host: '0.0.0.0',
      port: 8002
   },
   server: {
    port: 8001,
    host: "0.0.0.0"
   },
   plugins: [
    sassDts()
   ],
   build: {
      sourcemap: true,
      minify: false,
      lib: {
         formats: ['es', 'umd'],
         entry: resolve(__dirname, 'src/index.ts'),
         name: 'index',
         fileName: (format) => `index.${format}.js`
      }
   },
   base: '',
   resolve: {
      alias: {
         '@datatypes': resolve(__dirname, './src/datatypes'),
      }
   }
});
