#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

// Read version from package.json
const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'));
const VERSION = packageJson.version;

async function updateReadme() {
  console.log('🔄 Updating README.md...');
  
  try {
    let readmeContent = await fs.readFile('./README.md', 'utf-8');
    
    // Update version in Development Status section (safe, non-revealing)
    readmeContent = readmeContent.replace(
      /\*\*Development Status\*\* \*\(Version [^)]+\)\*/,
      `**Development Status** *(Version ${VERSION})*`
    );
    
    // Update build metadata section (Core/Pro architecture)
    const buildDate = new Date().toISOString().split('T')[0];
    const newMetadata = `<!-- BUILD_METADATA
Version: ${VERSION}  
Phase: Alpha - Core/Pro Architecture
Status: Core systems operational
Architecture: Core (Universal) + Pro (Advanced)
Last Updated: ${buildDate}
-->`;
    
    readmeContent = readmeContent.replace(
      /<!-- BUILD_METADATA[\s\S]*?-->/,
      newMetadata
    );
    
    // Verify core systems are present (Core/Pro architecture)
    const distDir = './dist';
    let systemStatus = 'operational';
    
    try {
      await fs.access(distDir);
      const files = await fs.readdir(distDir);
      const fpFiles = files.filter(f => f.endsWith('.fp.txt'));
      
      // Check for Core/Pro architecture files
      const hasCoreFile = fpFiles.some(f => f.includes('floatprompt-core'));
      const hasProFiles = fpFiles.some(f => f.includes('floatprompt-pro'));
      
      if (!hasCoreFile || !hasProFiles || fpFiles.length < 5) {
        systemStatus = 'building';
      }
    } catch {
      systemStatus = 'building';
    }
    
    // Build status integrated into BUILD_METADATA section
    
    await fs.writeFile('./README.md', readmeContent, 'utf-8');
    console.log('✅ README.md updated successfully');
    
    return {
      version: VERSION,
      buildDate,
      systemStatus,
      updated: true
    };
    
  } catch (error) {
    console.error('❌ Failed to update README.md:', error.message);
    return { updated: false, error: error.message };
  }
}

// Simplified script - no website content extraction needed

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await updateReadme();
  
  if (result.updated) {
    console.log(`📊 Status: Version ${result.version} | System ${result.systemStatus} | ${result.buildDate}`);
  }
}

export { updateReadme }; 