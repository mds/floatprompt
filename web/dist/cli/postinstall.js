#!/usr/bin/env node
/**
 * FloatPrompt Postinstall Script
 *
 * Runs after `npm install floatprompt` to automatically wire up
 * the postbuild script in the host project's package.json.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
/**
 * Detect if we're running in the floatprompt package itself (not a host project)
 */
function isOwnPackage(pkg) {
    return pkg.name === 'floatprompt';
}
/**
 * Check if a build script exists
 */
function hasBuildScript(pkg) {
    return Boolean(pkg.scripts?.build);
}
/**
 * Check if floatprompt is already in postbuild
 */
function hasFloatPromptInPostbuild(pkg) {
    const postbuild = pkg.scripts?.postbuild || '';
    return postbuild.includes('floatprompt');
}
/**
 * Detect the framework from dependencies
 */
function detectFramework(pkg) {
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    if (deps['next'])
        return 'Next.js';
    if (deps['astro'])
        return 'Astro';
    if (deps['gatsby'])
        return 'Gatsby';
    if (deps['@11ty/eleventy'])
        return 'Eleventy';
    if (deps['vite'])
        return 'Vite';
    if (deps['nuxt'])
        return 'Nuxt';
    if (deps['svelte'] || deps['@sveltejs/kit'])
        return 'SvelteKit';
    return null;
}
async function run() {
    const cwd = process.cwd();
    const packageJsonPath = join(cwd, 'package.json');
    // Read package.json
    let pkg;
    try {
        const content = await readFile(packageJsonPath, 'utf-8');
        pkg = JSON.parse(content);
    }
    catch {
        // No package.json or can't read it - skip silently
        return;
    }
    // Don't modify our own package.json during development
    if (isOwnPackage(pkg)) {
        return;
    }
    // Check if floatprompt is already configured
    if (hasFloatPromptInPostbuild(pkg)) {
        console.log('✓ FloatPrompt already configured in postbuild script');
        return;
    }
    // Ensure scripts object exists
    if (!pkg.scripts) {
        pkg.scripts = {};
    }
    // Add or append to postbuild script
    if (pkg.scripts.postbuild) {
        // Append to existing postbuild
        pkg.scripts.postbuild = `${pkg.scripts.postbuild} && floatprompt`;
    }
    else {
        // Create new postbuild
        pkg.scripts.postbuild = 'floatprompt';
    }
    // Write package.json
    try {
        const newContent = JSON.stringify(pkg, null, 2) + '\n';
        await writeFile(packageJsonPath, newContent, 'utf-8');
    }
    catch (error) {
        console.error('Could not update package.json:', error instanceof Error ? error.message : error);
        return;
    }
    // Log success with helpful context
    const framework = detectFramework(pkg);
    const hasBuild = hasBuildScript(pkg);
    console.log('');
    console.log('✓ Added postbuild script to package.json');
    if (framework) {
        console.log(`  Detected: ${framework}`);
    }
    if (hasBuild) {
        console.log('  FloatPrompt will run automatically after "npm run build"');
    }
    else {
        console.log('  FloatPrompt will run after your build command.');
        console.log('  (No build script detected yet — add one when ready)');
    }
    console.log('');
}
run().catch((error) => {
    // Don't fail the install on postinstall errors
    console.error('FloatPrompt postinstall warning:', error.message);
});
//# sourceMappingURL=postinstall.js.map