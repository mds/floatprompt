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
    
    // Update build metadata section (safe status info only)
    const buildDate = new Date().toISOString().split('T')[0];
    const newMetadata = `<!-- BUILD_METADATA
Version: ${VERSION}  
Phase: Alpha (IP Protected)
Status: Core systems operational
Protection: Active until trademark completion
Last Updated: ${buildDate}
-->`;
    
    readmeContent = readmeContent.replace(
      /<!-- BUILD_METADATA[\s\S]*?-->/,
      newMetadata
    );
    
    // Verify core systems are present (without revealing details)
    const distDir = './private/dist';
    let systemStatus = 'operational';
    
    try {
      await fs.access(distDir);
      const files = await fs.readdir(distDir);
      const fpFiles = files.filter(f => f.endsWith('.fp'));
      
      if (fpFiles.length < 4) {
        systemStatus = 'building';
      }
    } catch {
      systemStatus = 'building';
    }
    
    // Update build status line (safe, non-revealing)
    readmeContent = readmeContent.replace(
      /\*Build system [^|]+\|/,
      `*Build system ${systemStatus} |`
    );
    
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

// For website content extraction (safe, public-ready content)
async function extractWebsiteContent() {
  console.log('📄 Extracting website-safe content...');
  
  try {
    const readmeContent = await fs.readFile('./README.md', 'utf-8');
    
    // Extract safe sections for website use
    const extractSection = (sectionName) => {
      const regex = new RegExp(`## 🚀 \\*\\*${sectionName}\\*\\*([\\s\\S]*?)(?=## |$)`, 'i');
      const match = readmeContent.match(regex);
      return match ? match[1].trim() : '';
    };
    
    const websiteContent = {
      protocol_overview: extractSection('Protocol Overview'),
      development_status: 'Alpha (IP Protected)',
      version: VERSION,
      tagline: 'The invisible OS for AI in a text file',
      ready_for_public: false, // Until trademark completed
      contact: 'https://mds.is'
    };
    
    // Save for website pipeline (safe content only)
    await fs.writeFile('./private/.website-content.json', JSON.stringify(websiteContent, null, 2));
    console.log('✅ Website content extracted (safe for public use)');
    
    return websiteContent;
    
  } catch (error) {
    console.error('❌ Failed to extract website content:', error.message);
    return { error: error.message };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const result = await updateReadme();
  
  if (result.updated) {
    console.log(`📊 Status: Version ${result.version} | System ${result.systemStatus} | ${result.buildDate}`);
    
    // Also extract website-safe content
    await extractWebsiteContent();
  }
}

export { updateReadme, extractWebsiteContent }; 