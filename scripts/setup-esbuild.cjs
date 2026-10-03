const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');

// 1. Skip WASM patch in CI/Cloudflare environment where native esbuild is installed
if (process.env.CF_PAGES || process.env.CI || process.env.VERCEL || process.env.NETLIFY) {
  console.log('[setup-esbuild] CI/Deployment environment detected. Skipping WASM patch to use native esbuild.');
  process.exit(0);
}

// 2. Check if native esbuild binary is present and working
try {
  const nativeEsbuild = path.join(rootDir, 'node_modules', 'esbuild', 'bin', 'esbuild');
  const nativeEsbuildExe = path.join(rootDir, 'node_modules', 'esbuild', 'bin', 'esbuild.exe');
  const binPath = fs.existsSync(nativeEsbuildExe) ? nativeEsbuildExe : (fs.existsSync(nativeEsbuild) ? nativeEsbuild : null);

  if (binPath) {
    execSync(`"${binPath}" --version`, { stdio: 'ignore' });
    console.log('[setup-esbuild] Native esbuild binary is functional. Skipping WASM patch.');
    process.exit(0);
  }
} catch (err) {
  console.log('[setup-esbuild] Native esbuild check failed. Falling back to esbuild-wasm...');
}

const wasmDir = path.join(rootDir, 'node_modules', 'esbuild-wasm');
const tgzFile = path.join(rootDir, 'esbuild-wasm.tgz');

try {
  // 3. Ensure esbuild-wasm directory exists
  if (!fs.existsSync(wasmDir) && fs.existsSync(tgzFile)) {
    console.log('[setup-esbuild] Extracting esbuild-wasm.tgz...');
    fs.mkdirSync(wasmDir, { recursive: true });
    execSync(`tar -xzf "${tgzFile}" -C "${wasmDir}" --strip-components=1`, { stdio: 'inherit' });
  }

  // 4. Targets to patch
  const targets = [
    path.join(rootDir, 'node_modules', 'esbuild'),
    path.join(rootDir, 'node_modules', 'astro', 'node_modules', 'esbuild')
  ];

  for (const target of targets) {
    if (fs.existsSync(target) && fs.existsSync(wasmDir)) {
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
      const binSrc = path.join(wasmDir, 'bin');
      const binDest = path.join(target, 'bin');
      if (fs.existsSync(binSrc)) {
        fs.cpSync(binSrc, binDest, { recursive: true, force: true });
      }
    }
  }
  console.log('[setup-esbuild] esbuild-wasm setup verified.');
} catch (e) {
  console.error('[setup-esbuild] Error:', e.message);
}
