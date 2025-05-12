import {defineConfig} from 'tsup';

export default defineConfig({
  outDir: 'build',
  entry: ['src/index.ts', 'src/server.ts'],
  target: 'es2021',
  minify: true,
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  external: ['pdf2pic', 'pdf-lib', 'gm', 'fs', 'child_process'],
  treeshake: true,
});
