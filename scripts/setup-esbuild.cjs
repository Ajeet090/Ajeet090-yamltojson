const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const wasmDir = path.join(rootDir, 'node_modules', 'esbuild-wasm');
const tgzFile = path.join(rootDir, 'esbuild-wasm.tgz');

try {
  // 1. Ensure esbuild-wasm directory exists
  if (!fs.existsSync(wasmDir) && fs.existsSync(tgzFile)) {
    console.log('[setup-esbuild] Extracting esbuild-wasm.tgz...');
    fs.mkdirSync(wasmDir, { recursive: true });
    execSync(`tar -xzf "${tgzFile}" -C "${wasmDir}" --strip-components=1`, { stdio: 'inherit' });
  }

  // 2. Targets to patch
  const targets = [
    path.join(rootDir, 'node_modules', 'esbuild'),
    path.join(rootDir, 'node_modules', 'astro', 'node_modules', 'esbuild')
  ];

  for (const target of targets) {
    if (fs.existsSync(target) && fs.existsSync(wasmDir)) {
      const wasmFileInTarget = path.join(target, 'esbuild.wasm');
      if (!fs.existsSync(wasmFileInTarget)) {
        console.log(`[setup-esbuild] Patching ${target} with esbuild-wasm...`);
        const filesToCopy = ['esbuild.wasm', 'wasm_exec.js', 'wasm_exec_node.js'];
        for (const f of filesToCopy) {
          const src = path.join(wasmDir, f);
          if (fs.existsSync(src)) {
            fs.copyFileSync(src, path.join(target, f));
          }
        }
        const libSrc = path.join(wasmDir, 'lib');
        const libDest = path.join(target, 'lib');
        if (fs.existsSync(libSrc)) {
          fs.cpSync(libSrc, libDest, { recursive: true, force: true });
        }
      }
    }
  }
  console.log('[setup-esbuild] esbuild-wasm setup verified.');
} catch (e) {
  console.error('[setup-esbuild] Error:', e.message);
}
