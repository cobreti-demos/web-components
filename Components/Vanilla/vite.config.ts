import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'
import path from 'node:path';

export default defineConfig({
   server: {
    port: 8001,
    host: "0.0.0.0"
   },
   plugins: [
    sassDts()
   ],
   resolve: {
      alias: {
         '@interfaces': path.resolve(__dirname, './src/interfaces')
      }
   }
});
