import { defineConfig } from 'tsup'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const version = process.env.npm_package_version ?? '0.0.0'
const isProduction = process.env.NODE_ENV === 'production'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    tailwind: 'src/tailwind.ts',
  },
  tsconfig: 'tsconfig.app.json',
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: true,
  minify: isProduction,
  external: ['react', 'react-dom', 'tailwindcss'],
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    }
  },
  banner: {
    js: `/*! Navi-UI v${version} | MIT License */`,
  },
})
