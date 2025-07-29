#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

// Read version from package.json
const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'));
const VERSION = packageJson.version;

// Build configuration following modular architecture
const BUILD_CONFIG = {
  sourceDir: './src/os',
  outputDir: './dist/experimental',
  outputFile: `floatprompt-os.txt`,
  
  // Modular structure compilation order
  components: [
    // Phase 1: Infrastructure
    { file: 'header.md', type: 'frontmatter', phase: 'Infrastructure' },
    { file: 'boot.md', type: 'markdown', phase: 'Infrastructure' },
    
    // Phase 2: MDS Method (Core Functionality)
    { file: 'map.md', type: 'markdown', phase: 'Territory' },
    { file: 'decide.md', type: 'markdown', phase: 'Extraction' },
    { file: 'structure.md', type: 'markdown', phase: 'Assembly' },
    
    // Phase 3: Foundation
    { file: 'footer.md', type: 'markdown', phase: 'Infrastructure' }
  ]
};

// Experimental build configuration
const EXPERIMENTAL_CONFIG = {
  sourceDir: './src/experimental',
  outputDir: './dist/experimental',
  files: [
    'floatprompt-essential.txt'
  ]
};

// Library copy configuration - these are complete files that just need copying
const LIB_COPY_CONFIG = {
  sourceDir: './src/lib',
  outputDir: './dist/lib',
  files: [
    'blueprint.txt',
    'format.txt', 
    'voice-guide-creator.txt'
  ]
};

// Template copy configuration - copy the universal template to dist
const TEMPLATE_COPY_CONFIG = {
  sourceDir: './src',
  outputDir: './dist',
  files: [
    'floatprompt.txt'
  ]
};

async function ensureDirectory(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

async function readComponent(componentPath, sharedDir = './src/os/shared') {
  try {
    let content = await fs.readFile(componentPath, 'utf-8');
    
    // Process shared YAML injections
    content = await injectSharedComponents(content, sharedDir);
    
    return content.trim();
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read ${componentPath} - ${error.message}`);
    return null;
  }
}

async function injectSharedComponents(content, sharedDir = './src/os/shared') {
  // Process INJECT markers: <!-- INJECT: filename.json --> (or .yaml for backward compatibility)
  const jsonInjectRegex = /<!-- INJECT: (.+?)\.json -->/g;
  const yamlInjectRegex = /<!-- INJECT: (.+?)\.yaml -->/g;
  let processed = content;
  
  // Check if this is frontmatter with multiple JSON injections
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---$/m);
  if (frontmatterMatch) {
    const frontmatterContent = frontmatterMatch[1];
    const jsonMatches = [...frontmatterContent.matchAll(jsonInjectRegex)];
    
    if (jsonMatches.length > 0) {
      console.log(`🔗 Processing ${jsonMatches.length} JSON injections in frontmatter...`);
      
      // Merge all JSON components into a single object
      let mergedData = {};
      
      for (const match of jsonMatches) {
        const filename = match[1];
        const sharedPath = path.join(sharedDir, `${filename}.json`);
        
        console.log(`🔗 Injecting shared JSON: ${filename}.json...`);
        
        try {
          let sharedContent = await fs.readFile(sharedPath, 'utf-8');
          const jsonData = JSON.parse(sharedContent);
          
          // Extract the actual content (remove metadata comments) and merge
          for (const [key, value] of Object.entries(jsonData)) {
            if (!key.startsWith('_')) {
              mergedData[key] = value;
            }
          }
        } catch (error) {
          console.warn(`⚠️  Warning: INJECT FAILURE - ${filename}.json not found or invalid: ${error.message}`);
        }
      }
      
      // Create the merged JSON frontmatter
      const mergedJSON = JSON.stringify(mergedData, null, 2);
      
      // Replace the entire frontmatter with the merged JSON
      processed = processed.replace(frontmatterMatch[0], `---\n${mergedJSON}\n---`);
      
      console.log(`✅ Successfully merged ${jsonMatches.length} JSON components into frontmatter`);
    }
  } else {
    // Not frontmatter - process individual JSON injections
    const individualMatches = [...content.matchAll(jsonInjectRegex)];
    for (const match of individualMatches) {
      const filename = match[1];
      const sharedPath = path.join(sharedDir, `${filename}.json`);
      
      console.log(`🔗 Injecting shared JSON: ${filename}.json...`);
      
      try {
        let sharedContent = await fs.readFile(sharedPath, 'utf-8');
        const jsonData = JSON.parse(sharedContent);
        
        // Extract the actual content (remove metadata comments)
        let cleanedData = {};
        for (const [key, value] of Object.entries(jsonData)) {
          if (!key.startsWith('_')) {
            cleanedData[key] = value;
          }
        }
        
        // Inject as JSON format, not YAML
        const contentToInject = JSON.stringify(cleanedData, null, 2)
          .replace(/^{\n/, '') // Remove opening brace and newline
          .replace(/\n}$/, '') // Remove closing brace
          .replace(/^  /gm, '') // Remove base indentation
          .trim();
        
        if (!contentToInject.trim()) {
          console.warn(`⚠️  Warning: ${filename}.json contains no injectable content`);
          processed = processed.replace(match[0], `# ${filename}.json is empty`);
        } else {
          processed = processed.replace(match[0], contentToInject.trim());
        }
      } catch (error) {
        console.warn(`⚠️  Warning: INJECT FAILURE - ${filename}.json not found or invalid: ${error.message}`);
        processed = processed.replace(match[0], `# ERROR: Could not inject ${filename}.json - ${error.message}`);
      }
    }
  }
  
  // Process YAML injections for backward compatibility during transition
  const yamlMatches = [...content.matchAll(yamlInjectRegex)];
  for (const match of yamlMatches) {
    const filename = match[1];
    const sharedPath = path.join(sharedDir, `${filename}.yaml`);
    
    console.log(`🔗 Injecting shared YAML (legacy): ${filename}.yaml...`);
    
    try {
      let sharedContent = await fs.readFile(sharedPath, 'utf-8');
      
      // Remove comments and empty lines for clean injection
      const cleanContent = sharedContent
        .replace(/^#.*$/gm, '')  // Remove comment lines
        .trim();
      
      if (!cleanContent) {
        console.warn(`⚠️  Warning: ${filename}.yaml is empty or contains only comments`);
        processed = processed.replace(match[0], `# ${filename}.yaml is empty`);
      } else {
        // Replace the injection marker with actual YAML content
        processed = processed.replace(match[0], cleanContent);
      }
    } catch (error) {
      console.warn(`⚠️  Warning: INJECT FAILURE - ${filename}.yaml not found: ${error.message}`);
      processed = processed.replace(match[0], `# ERROR: Could not inject ${filename}.yaml - ${error.message}`);
    }
  }
  
  return processed;
}

async function buildFloatPrompt() {
  console.log('🚀 Building FloatPrompt template using injection system...\n');
  
  // Ensure output directory exists
  await ensureDirectory(BUILD_CONFIG.outputDir);
  
  // Read the template file
  const templatePath = path.join(BUILD_CONFIG.sourceDir, '_template.md');
  console.log('📄 Reading template structure...');
  
  let template = await fs.readFile(templatePath, 'utf-8');
  if (!template) {
    throw new Error('Failed to read _template.md - template file required for build');
  }
  
  // Process all INJECT directives
  const injectRegex = /<!-- INJECT: (.+?) -->/g;
  const matches = [...template.matchAll(injectRegex)];
  
  for (const match of matches) {
    const filename = match[1];
    const filePath = path.join(BUILD_CONFIG.sourceDir, filename);
    
    console.log(`🔗 Injecting: ${filename}...`);
    
    try {
      let content = await fs.readFile(filePath, 'utf-8');
      
      // Replace the injection marker with actual content
      template = template.replace(match[0], content.trim());
    } catch (error) {
      console.warn(`⚠️  Warning: Could not inject ${filename} - ${error.message}`);
      template = template.replace(match[0], `<!-- ERROR: Could not inject ${filename} -->`);
    }
  }

  // Process template variables in the final assembled template
  const buildDate = new Date().toISOString().split('T')[0];
  const currentYear = new Date().getFullYear();
  const systemVersion = `v${VERSION}`;
  
  template = template
    .replace(/\{\{VERSION\}\}/g, VERSION)
    .replace(/\{\{DATE\}\}/g, buildDate)
    .replace(/\{\{CURRENT_YEAR\}\}/g, currentYear)
    .replace(/\{\{SYSTEM_VERSION\}\}/g, systemVersion)
    .replace(/\{\{AI_MODEL\}\}/g, "{{AI_MODEL}}"); // Keep this as template variable for runtime
  
  // Write final template
  const outputPath = path.join(BUILD_CONFIG.outputDir, BUILD_CONFIG.outputFile);
  await fs.writeFile(outputPath, template, 'utf-8');
  
  console.log(`\n✅ Successfully compiled FloatPrompt template using injection system!`);
  console.log(`📍 Output: ${outputPath}`);
  console.log(`📏 Final size: ${Math.round(template.length / 1024)}KB`);
  console.log(`🎯 Structure: Template-driven injection system`);
  console.log(`🏛️ Authority: Clean separation of template and content`);
  console.log(`📦 Version: ${VERSION}`);
}

async function copyLibraryFiles() {
  console.log('📚 Copying library files to dist/lib/...\n');
  
  // Ensure output directory exists
  await ensureDirectory(LIB_COPY_CONFIG.outputDir);
  
  for (const filename of LIB_COPY_CONFIG.files) {
    const sourcePath = path.join(LIB_COPY_CONFIG.sourceDir, filename);
    const outputPath = path.join(LIB_COPY_CONFIG.outputDir, filename);
  
    console.log(`📄 Copying: ${filename}...`);
    
    try {
      let content = await fs.readFile(sourcePath, 'utf-8');
  
      // Process template variables if any exist
    const buildDate = new Date().toISOString().split('T')[0];
      const currentYear = new Date().getFullYear();
      const systemVersion = `v${VERSION}`;
      
      content = content
      .replace(/\{\{VERSION\}\}/g, VERSION)
        .replace(/\{\{DATE\}\}/g, buildDate)
        .replace(/\{\{CURRENT_YEAR\}\}/g, currentYear)
        .replace(/\{\{SYSTEM_VERSION\}\}/g, systemVersion)
        .replace(/\{\{AI_MODEL\}\}/g, "{{AI_MODEL}}"); // Keep this as template variable for runtime
      
      await fs.writeFile(outputPath, content, 'utf-8');
      
      console.log(`✅ Successfully copied: ${filename} (${Math.round(content.length / 1024)}KB)`);
    } catch (error) {
      console.error(`❌ Failed to copy ${filename}:`, error.message);
      }
    }
  
  console.log(`\n✅ Successfully copied ${LIB_COPY_CONFIG.files.length} library files!`);
  console.log(`📍 Output directory: ${LIB_COPY_CONFIG.outputDir}`);
}

async function copyTemplateFiles() {
  console.log('📋 Copying universal template to dist/...\n');
  
  // Ensure output directory exists
  await ensureDirectory(TEMPLATE_COPY_CONFIG.outputDir);
  
  for (const filename of TEMPLATE_COPY_CONFIG.files) {
    const sourcePath = path.join(TEMPLATE_COPY_CONFIG.sourceDir, filename);
    const outputPath = path.join(TEMPLATE_COPY_CONFIG.outputDir, filename);
  
    console.log(`📄 Copying: ${filename}...`);
    
    try {
      let content = await fs.readFile(sourcePath, 'utf-8');
  
      // Process template variables if any exist
      const buildDate = new Date().toISOString().split('T')[0];
      const currentYear = new Date().getFullYear();
      const systemVersion = `v${VERSION}`;
      
      content = content
        .replace(/\{\{VERSION\}\}/g, VERSION)
        .replace(/\{\{DATE\}\}/g, buildDate)
        .replace(/\{\{CURRENT_YEAR\}\}/g, currentYear)
        .replace(/\{\{SYSTEM_VERSION\}\}/g, systemVersion)
        .replace(/\{\{AI_MODEL\}\}/g, "{{AI_MODEL}}"); // Keep this as template variable for runtime
      
      await fs.writeFile(outputPath, content, 'utf-8');
      
      console.log(`✅ Successfully copied: ${filename} (${Math.round(content.length / 1024)}KB)`);
    } catch (error) {
      console.error(`❌ Failed to copy ${filename}:`, error.message);
    }
  }
  
  console.log(`\n✅ Successfully copied universal template!`);
  console.log(`📍 Output directory: ${TEMPLATE_COPY_CONFIG.outputDir}`);
}

async function copyExperimentalFiles() {
  console.log('🧪 Copying experimental files to dist/experimental/...\n');
  
  // Ensure output directory exists
  await ensureDirectory(EXPERIMENTAL_CONFIG.outputDir);
  
  for (const filename of EXPERIMENTAL_CONFIG.files) {
    const sourcePath = path.join(EXPERIMENTAL_CONFIG.sourceDir, filename);
    const outputPath = path.join(EXPERIMENTAL_CONFIG.outputDir, filename);
  
    console.log(`📄 Copying: ${filename}...`);
    
    try {
      let content = await fs.readFile(sourcePath, 'utf-8');
  
      // Process template variables if any exist
      const buildDate = new Date().toISOString().split('T')[0];
      const currentYear = new Date().getFullYear();
      const systemVersion = `v${VERSION}`;
      
      content = content
        .replace(/\{\{VERSION\}\}/g, VERSION)
        .replace(/\{\{DATE\}\}/g, buildDate)
        .replace(/\{\{CURRENT_YEAR\}\}/g, currentYear)
        .replace(/\{\{SYSTEM_VERSION\}\}/g, systemVersion)
        .replace(/\{\{AI_MODEL\}\}/g, "{{AI_MODEL}}"); // Keep this as template variable for runtime
      
      await fs.writeFile(outputPath, content, 'utf-8');
      
      console.log(`✅ Successfully copied: ${filename} (${Math.round(content.length / 1024)}KB)`);
    } catch (error) {
      console.error(`❌ Failed to copy ${filename}:`, error.message);
    }
  }
  
  console.log(`\n✅ Successfully copied ${EXPERIMENTAL_CONFIG.files.length} experimental files!`);
  console.log(`📍 Output directory: ${EXPERIMENTAL_CONFIG.outputDir}`);
}

// Error handling
async function main() {
  try {
    // Build main FloatPrompt OS
    await buildFloatPrompt();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Copy library files
    await copyLibraryFiles();
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Copy universal template
    await copyTemplateFiles();
    console.log('\n' + '='.repeat(50) + '\n');

    // Copy experimental files
    await copyExperimentalFiles();
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
 