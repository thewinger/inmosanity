import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
/**
 * EXPERIMENTAL: Hacking nextjs internals
 */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const file = path.join(
  __dirname,
  '../node_modules',
  'next/dist/server/require-hook.js'
)
const content = await fs.promises.readFile(file, 'utf-8')

await fs.promises.writeFile(
  file,
  content.replace(
    'if (process.env.__NEXT_PRIVATE_PREBUNDLED_REACT) {',
    'if (true) {'
  )
)
