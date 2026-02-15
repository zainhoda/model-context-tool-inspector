#!/usr/bin/env node
/**
 * Build script to bundle @google/genai with its dependencies (p-retry)
 * for use in a Chrome extension.
 */

const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

async function build() {
  try {
    console.log('Building js-genai.js with bundled dependencies...');
    
    await esbuild.build({
      entryPoints: ['./node_modules/@google/genai/dist/web/index.mjs'],
      bundle: true,
      format: 'esm',
      outfile: 'js-genai.js',
      platform: 'browser',
      target: 'es2020',
      external: [],
      minify: false,
      sourcemap: false,
    });

    console.log('✓ Successfully built js-genai.js');
    
    // Clean up node_modules after build
    console.log('Cleaning up node_modules...');
    fs.rmSync('./node_modules', { recursive: true, force: true });
    console.log('✓ Cleanup complete');
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
