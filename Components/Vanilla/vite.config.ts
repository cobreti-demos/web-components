import { defineConfig } from 'vite'
import sassDts from 'vite-plugin-sass-dts'

export default defineConfig({
   server: {
    port: 8001,
    host: "0.0.0.0"
   },
   plugins: [
    sassDts()
   ]
});
