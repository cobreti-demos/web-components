import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import { resolve } from 'path';

export default defineConfig({
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
   base: ''
});
