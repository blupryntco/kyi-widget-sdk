// .github/supply-chain-check.mjs — zero-dep, Node 20
import { existsSync, readFileSync } from 'node:fs'

let ok = true
const fail = (m) => {
  console.error(`✗ ${m}`)
  ok = false
}
const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : '')

// 1. lockfile committed
if (!existsSync('pnpm-lock.yaml')) fail('pnpm-lock.yaml missing')

// 2. frozen install, no bare install
const ci = read('.github/workflows/ci.yml')
if (!/pnpm install --frozen-lockfile/.test(ci)) fail('ci.yml install is not frozen')

// 3. cooldown in workspace file
if (!/minimumReleaseAge:/.test(read('pnpm-workspace.yaml'))) fail('minimumReleaseAge not set')

// 4. script allow-list in package.json
if (!/"onlyBuiltDependencies"/.test(read('package.json')))
  fail('pnpm.onlyBuiltDependencies allow-list missing')

// 5. audit step present
if (!/pnpm audit/.test(ci)) fail('no pnpm audit step in ci.yml')

// 6. third-party actions SHA-pinned (actions/* may stay on tags)
for (const [, ref] of ci.matchAll(/uses:\s*([^\s#]+)/g)) {
  const [repo, sha] = ref.split('@')
  if (!repo.startsWith('actions/') && !/^[0-9a-f]{40}$/.test(sha))
    fail(`${repo} is not pinned to a 40-char SHA`)
}

process.exit(ok ? 0 : 1)
