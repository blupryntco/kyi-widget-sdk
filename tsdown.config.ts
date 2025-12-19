import { defineConfig } from 'tsdown'

export default defineConfig([
  // Browser bundle (client + server for playground)
  {
    entry: {
      index: 'src/index.ts',
      server: 'src/server.ts',
    },
    format: ['esm'],
    dts: true,
    clean: true,
    sourcemap: true,
    minify: true,
    target: 'es2022',
    platform: 'browser',
    noExternal: ['jose'],
  },
  // Node.js bundle (for npm package)
  {
    entry: {
      index: 'src/index.ts',
      server: 'src/server.ts',
    },
    format: ['cjs'],
    dts: false,
    clean: false,
    sourcemap: true,
    minify: true,
    target: 'es2022',
    platform: 'node',
    external: ['jose'],
  },
])
