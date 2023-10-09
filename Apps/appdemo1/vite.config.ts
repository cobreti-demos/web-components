import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import sassDts from 'vite-plugin-sass-dts'
import {resolve} from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 8000,
        host: "0.0.0.0"
    },
    plugins: [
        sassDts(),
        react()
    ],
    resolve: {
        alias: {
            '@store': resolve(__dirname, './src/store'),
        }
    }
})
