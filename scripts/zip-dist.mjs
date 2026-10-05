// Zips the production build (dist/) into dist.zip so it can be uploaded to any static host.
import AdmZip from 'adm-zip'
import { existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const dist = resolve(root, 'dist')
const out = resolve(root, 'dist.zip')

if (!existsSync(dist)) {
  console.error('dist/ not found — run `vite build` first.')
  process.exit(1)
}

const zip = new AdmZip()
zip.addLocalFolder(dist) // files sit at the zip root, so index.html is at the top level
zip.writeZip(out)

const mb = (statSync(out).size / 1024 / 1024).toFixed(1)
console.log(`\n✓ dist.zip created (${mb} MB) → ${out}`)
