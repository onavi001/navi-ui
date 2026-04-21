/**
 * Embeds README.md into package.json as the `readme` field before pack/publish.
 * npmjs.com uses this field for the package page; the README file alone is not always indexed.
 * @see scripts/npm-readme-restore.mjs (postpack)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const pkgPath = path.join(root, 'package.json')
const bakPath = path.join(root, '.package.json.navi-readme.bak')
const readmePath = path.join(root, 'README.md')

if (fs.existsSync(bakPath)) {
  console.error(
    '[npm-readme-inject] Backup already exists (interrupted publish?). Remove it after checking:\n  ',
    bakPath,
  )
  process.exit(1)
}

fs.copyFileSync(pkgPath, bakPath)
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.readme = fs.readFileSync(readmePath, 'utf8')
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
