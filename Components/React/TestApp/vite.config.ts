import {defineConfig} from 'vitest/config'
import sassDts from 'vite-plugin-sass-dts'

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
    ]
});
