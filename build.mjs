import * as esbuild from 'esbuild';
import { cpSync, mkdirSync } from 'fs';

mkdirSync('dist', { recursive: true });

const minify = process.argv.includes('--minify');

// Bundle TypeScript
await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'dist/main.js',
  format: 'esm',
  minify,
  sourcemap: !minify,
});

// Copy static files
cpSync('index.html', 'dist/index.html');
cpSync('src/styles/main.css', 'dist/styles.css');
cpSync('public/og-image.svg', 'dist/og-image.svg');
cpSync('public/robots.txt', 'dist/robots.txt');
cpSync('public/_headers', 'dist/_headers');

console.log('✓ Build complete → dist/');
