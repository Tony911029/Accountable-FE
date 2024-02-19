import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import jsconfigPaths from "vite-jsconfig-paths";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import fs from "fs/promises";
import {resolve} from "path";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
// https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1376605159
// https://github.com/vitejs/vite/discussions/3112#discussioncomment-747411

// dns.setDefaultResultOrder('verbatim')

export default defineConfig(({command}) => ({
    ...(process.env.NODE_ENV === 'development'
        ? {
            define: {
                global: {},
            },
        }
        : {}),
    base: "/",
    resolve: {
        alias: {
            src: resolve(__dirname, "./src"),
            ...(process.env.NODE_ENV !== 'development'
                ? {
                    './runtimeConfig': './runtimeConfig.browser', //fix production build
                }
                : {}),
        },
    },
    define:
    // https://github.com/aws-amplify/amplify-js/issues/9639#issuecomment-1413650169
    // in development, amplifyjs relies on webpack or similar somewhere so we need to add this for now
        command === 'serve'
            ? {
                global: {},
            }
            : undefined,
    plugins: [
        react(),
        jsconfigPaths(),
        esbuildCommonjs(["axios", "url-join"]),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
            ],
            imports: [
                {
                    react: ["useEffect", ["default", "React"]],
                },
            ],
        }),],
    esbuild: {
        loader: "jsx",
        include: /src[\/\\].*\.jsx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad({ filter: /src[\/\\].*\.js$/ }, async (args) => ({
                            loader: "jsx",
                            contents: await fs.readFile(args.path, "utf8"),
                        }));
                    },
                },
            ],
        },
    },
    server: {
        port: 3000,
        host: true,
    },
    build: {
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
                    return
                }
                warn(warning)
            }}
    }
}))

