import fs from 'fs'
import path from 'path'
/**
 * EXPERIMENTAL: Hacking nextjs internals
 */

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
