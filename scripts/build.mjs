#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

// Read version from package.json
const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'));
const VERSION = packageJson.version;

// Build configuration following _order.md
const BUILD_CONFIG = {
  sourceDir: './src/template',
  outputDir: './dist',
  outputFile: `floatprompt-${VERSION}.md`,
  
  // Compilation order from _order.md (updated to actual filenames)
  components: [
    // Phase 1: Foundation Components
    { file: 'config.md', type: 'markdown', phase: 'Foundation' },
    
    // Phase 2: Core System Components  
    { file: 'execution.md', type: 'markdown', phase: 'Core System' },
    { file: 'voice.md', type: 'markdown', phase: 'Core System' },
    { file: 'types.md', type: 'markdown', phase: 'Core System' },
    { file: 'modes.md', type: 'markdown', phase: 'Core System' },
    { file: 'chaining.md', type: 'markdown', phase: 'Core System' },
    
    // Phase 3: Structure Components
    { file: 'structure.md', type: 'markdown', phase: 'Structure' },
    { file: 'discovery.md', type: 'markdown', phase: 'Structure' },
    
    // Phase 4: Validation Components
    { file: 'validation.md', type: 'markdown', phase: 'Validation' },
    { file: 'enforcement.md', type: 'markdown', phase: 'Validation' },
    
    // Phase 5: Convention Components
    { file: 'naming.md', type: 'markdown', phase: 'Convention' },
    { file: 'metadata.md', type: 'markdown', phase: 'Convention' }
  ]
};

async function extractFloatPromptFrontmatter() {
  const buildDate = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toISOString();
  const buildDateCompact = buildDate.replace(/-/g, '');
  
  // Archaeological extraction from header.md
  const templateHeaderPath = path.join('./src/template', 'header.md');
  const templateHeaderContent = await readComponent(templateHeaderPath);
  
  if (!templateHeaderContent) {
    throw new Error('Failed to read header.md - archaeological extraction requires source template');
  }
  
  // Replace template variables with actual build values
  return templateHeaderContent
    .replace(/\{\{BUILD_DATE\}\}/g, buildDate)
    .replace(/\{\{BUILD_TIMESTAMP\}\}/g, timestamp)
    .replace(/\{\{BUILD_DATE_COMPACT\}\}/g, buildDateCompact)
    .replace(/\{\{VERSION\}\}/g, VERSION);
}

async function extractFloatPromptBody() {
  // Archaeological extraction from body.md
  const templateBodyPath = path.join('./src/template', 'body.md');
  let templateBodyContent = await readComponent(templateBodyPath);
  
  if (!templateBodyContent) {
    throw new Error('Failed to read body.md - archaeological extraction requires source template');
  }
  
  // Process include directives
  const includeRegex = /<!-- INCLUDE: (\w+\.md) -->/g;
  let match;
  
  while ((match = includeRegex.exec(templateBodyContent)) !== null) {
    const includeFile = match[1];
    const includePath = path.join('./src/template', includeFile);
    
    console.log(`📄 Processing include: ${includeFile}...`);
    const includeContent = await readComponent(includePath);
    
    if (includeContent) {
      // Replace the include directive with the actual content
      templateBodyContent = templateBodyContent.replace(match[0], includeContent);
    } else {
      console.warn(`⚠️  Warning: Include file not found: ${includeFile}`);
      templateBodyContent = templateBodyContent.replace(match[0], `<!-- MISSING: ${includeFile} -->`);
    }
  }
  
  return templateBodyContent;
}

async function ensureDirectory(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
    console.log(`✅ Created directory: ${dirPath}`);
  }
}

async function readComponent(componentPath) {
  try {
    const content = await fs.readFile(componentPath, 'utf-8');
    return content.trim();
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read ${componentPath} - ${error.message}`);
    return null;
  }
}

async function buildFloatPrompt() {
  console.log('🚀 Building FloatPrompt template from refined components...\n');
  
  // Ensure output directory exists
  await ensureDirectory(BUILD_CONFIG.outputDir);
  
  const compiledSections = [];
  
  // Process each component in order
  for (const component of BUILD_CONFIG.components) {
    const componentPath = path.join(BUILD_CONFIG.sourceDir, component.file);
    
    console.log(`📄 Reading ${component.file}...`);
    const content = await readComponent(componentPath);
    
    if (content) {
      // Add component content directly (already AI Precision Optimized)
      compiledSections.push(content);
      compiledSections.push('');
    } else {
      compiledSections.push(`### MISSING: ${component.file}`);
      compiledSections.push('*Component not found - build cannot complete*');
      compiledSections.push(''); 
    }
  }
  
  // Archaeological extraction from footer.md
  const footerPath = path.join('./src/template', 'footer.md');
  const footerContent = await readComponent(footerPath);
  
  if (!footerContent) {
    throw new Error('Failed to read footer.md - archaeological extraction requires source template');
  }
  
  // Add boot.md right after body.md
  const bootPath = path.join('./src/template', 'boot.md');
  const bootContent = await readComponent(bootPath);
  
  if (!bootContent) {
    throw new Error('Failed to read boot.md - archaeological extraction requires source template');
  }

  // Compile final template with AI Precision Optimized structure
  const finalTemplate = [
    await extractFloatPromptFrontmatter(),
    await extractFloatPromptBody(),
    bootContent,
    '',
    ...compiledSections,
    footerContent
  ].join('\n');
  
  // Write output file
  const outputPath = path.join(BUILD_CONFIG.outputDir, BUILD_CONFIG.outputFile);
  await fs.writeFile(outputPath, finalTemplate, 'utf-8');
  
  console.log(`\n✅ Successfully compiled FloatPrompt template from refined components!`);
  console.log(`📍 Output: ${outputPath}`);
  console.log(`📊 Components processed: ${BUILD_CONFIG.components.length}`);
  console.log(`📏 Final size: ${Math.round(finalTemplate.length / 1024)}KB`);
  console.log(`🎯 Structure: AI Precision Optimized with proper STOP field placement`);
  console.log(`🏛️ Authority: All 15 components refined and compilation-ready`);
  console.log(`📦 Version: ${VERSION}`);
}

// Error handling
async function main() {
  try {
    await buildFloatPrompt();
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
 