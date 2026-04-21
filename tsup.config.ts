import { defineConfig } from 'tsup'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const version = process.env.npm_package_version ?? '0.0.0'
const isProduction = process.env.NODE_ENV === 'production'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** tsup extracts CSS to a chunk and drops the import from JS; re-link so `import '@navi01/react/tailwind'` loads styles. */
function linkTailwindCssChunks(): void {
  const dir = path.join(__dirname, 'dist')
  const esmPath = path.join(dir, 'tailwind.js')
  const cjsPath = path.join(dir, 'tailwind.cjs')
  if (fs.existsSync(esmPath)) {
    let s = fs.readFileSync(esmPath, 'utf8')
    if (!s.includes('tailwind.css')) {
      const m = s.match(/^(\/\*![\s\S]*?\*\/\s*)/)
      s = m
        ? `${m[1]}import './tailwind.css';\n${s.slice(m[0].length)}`
        : `import './tailwind.css';\n${s}`
      fs.writeFileSync(esmPath, s)
    }
  }
  if (fs.existsSync(cjsPath)) {
    let s = fs.readFileSync(cjsPath, 'utf8')
    if (!s.includes('tailwind.css')) {
      const m = s.match(/^(['"])use strict\1;\s*/)
      const rest = m ? s.slice(m[0].length) : s
      s = `'use strict';\nrequire('./tailwind.css');\n${rest}`
      fs.writeFileSync(cjsPath, s)
    }
  }
}

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
  async onSuccess() {
    linkTailwindCssChunks()
  },
})
