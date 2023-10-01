import {defineConfig} from 'vitest/config'
import sassDts from 'vite-plugin-sass-dts'
import {resolve} from "path";

export default defineConfig({
    test: {
        coverage: {
            provider: 'istanbul'
        }
    },
    server: {
        port: 8103,
        host: "0.0.0.0"
    },
    plugins: [
        sassDts()
    ],
    resolve: {
        alias: {
            '@interfaces': resolve(__dirname, './src/interfaces'),
        }
    }
});
