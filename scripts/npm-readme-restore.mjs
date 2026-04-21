/**
 * Restores package.json after npm-readme-inject (see postpack).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkgPath = path.join(root, 'package.json')
const bakPath = path.join(root, '.package.json.navi-readme.bak')

if (!fs.existsSync(bakPath)) {
  process.exit(0)
}

fs.copyFileSync(bakPath, pkgPath)
fs.unlinkSync(bakPath)
