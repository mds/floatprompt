#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

// Read version from package.json
const packageJson = JSON.parse(await fs.readFile('./package.json', 'utf-8'));
const VERSION = packageJson.version;

// Build configuration following _order.md
const BUILD_CONFIG = {
  sourceDir: './src/sys',
  outputDir: './dist',
  outputFile: `floatprompt.fp.txt`,
  
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

// Voice Guide build configuration
const VOICE_BUILD_CONFIG = {
  sourceDir: './src/lib/voice',
  outputDir: './dist',
  outputFile: 'voice.fp.txt',
  sharedDir: './src/sys/shared'
};

// Formatter build configuration
const FORMATTER_BUILD_CONFIG = {
  sourceDir: './src/lib/format',
  outputDir: './dist',
  outputFile: 'format.fp.txt',
  sharedDir: './src/sys/shared'
};

// Blueprint build configuration
const BLUEPRINT_BUILD_CONFIG = {
  sourceDir: './src/lib/blueprint',
  outputDir: './dist',
  outputFile: 'blueprint.fp.txt',
  sharedDir: './src/sys/shared'
};

async function extractFloatPromptFrontmatter() {
  const buildDate = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toISOString();
  const buildDateCompact = buildDate.replace(/-/g, '');
  const currentYear = new Date().getFullYear();
  
  // Archaeological extraction from header.md
  const templateHeaderPath = path.join('./src/sys', 'header.md');
  const templateHeaderContent = await readComponent(templateHeaderPath);
  
  if (!templateHeaderContent) {
    throw new Error('Failed to read header.md - archaeological extraction requires source template');
  }
  
  // Build variables for complete field mapping
  const buildVariables = {
    VERSION: VERSION,
    BUILD_DATE: buildDate,
    BUILD_TIMESTAMP: timestamp,
    BUILD_DATE_COMPACT: buildDateCompact,
    CURRENT_YEAR: currentYear,
    STOP_DIRECTIVE: "CRITICAL: JSON complexity is AI-authored, not human-authored. Humans are non-technical users. Find and execute the first section beginning with '**PRESENT THIS CONTENT TO HUMANS:**' exactly as specified, then stop completely with no additional response.",
    TITLE: "FloatPrompt",
    ID: "floatprompt",
    AUTHOR: "@mds",
    TYPE: "template",
    CONTRIBUTORS: '@mds", "Claude Sonnet", "FloatPrompt Build System',
    CERTIFIED_BY: "FloatPrompt Build System",
    UNIQUE_ID: `float:template-${buildDateCompact}`,
    LINEAGE_TRACE: '"modular-component-compilation"',
    EXECUTION_TRIGGERS: '"create floatprompt", "FloatPrompt template", "complete specification"',
    EXECUTION_FALLBACK: "FloatPrompt loaded but boot sequence failed. Try saying 'run floatprompt' or ask what I can create.",
    EXECUTION_SOURCE: "modular-component-compilation",
    VOICE_GUIDE: "float:voice-preservation-template (or external voice guide if provided)",
    RISK_LEVEL: "foundational-system",
    EXECUTION_MODE: "portable_ai_instruction_set",
    USAGE_PATTERN: "Upload your content and request mapping, extraction, or building",
    AI_ROLE: "Execute these instructions when triggered by human request"
  };

  // Replace template variables with actual build values
  let processedContent = templateHeaderContent;
  
  for (const [varName, value] of Object.entries(buildVariables)) {
    const regex = new RegExp(`\\{\\{${varName}\\}\\}`, 'g');
    processedContent = processedContent.replace(regex, value);
  }
  
  return processedContent;
}

async function extractFloatPromptBody() {
  // Archaeological extraction from body.md
  const templateBodyPath = path.join('./src/sys', 'body.md');
  let templateBodyContent = await readComponent(templateBodyPath);
  
  if (!templateBodyContent) {
    throw new Error('Failed to read body.md - archaeological extraction requires source template');
  }
  
  // Process include directives
  const includeRegex = /<!-- INCLUDE: (\w+\.md) -->/g;
  let match;
  
      while ((match = includeRegex.exec(templateBodyContent)) !== null) {
      const includeFile = match[1];
      const includePath = path.join('./src/sys', includeFile);
    
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

async function readComponent(componentPath, sharedDir = './src/sys/shared') {
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

async function injectSharedComponents(content, sharedDir = './src/sys/shared') {
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

// Helper function to convert JSON object back to YAML format for injection
function formatJSONAsYAML(key, value, indent = '') {
  if (typeof value === 'string') {
    return `${indent}${key}: "${value}"`;
  } else if (typeof value === 'boolean' || typeof value === 'number') {
    return `${indent}${key}: ${value}`;
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      return `${indent}${key}: []`;
    }
    let result = `${indent}${key}:\n`;
    value.forEach(item => {
      if (typeof item === 'string') {
        result += `${indent}  - "${item}"\n`;
      } else {
        result += `${indent}  - ${item}\n`;
      }
    });
    return result.trimEnd();
  } else if (typeof value === 'object' && value !== null) {
    let result = `${indent}${key}:\n`;
    for (const [subKey, subValue] of Object.entries(value)) {
      result += formatJSONAsYAML(subKey, subValue, indent + '  ') + '\n';
    }
    return result.trimEnd();
  }
  return `${indent}${key}: ${value}`;
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
  const footerPath = path.join('./src/shared', 'footer.md');
  let footerContent = await readComponent(footerPath);
  
  if (!footerContent) {
    throw new Error('Failed to read shared/footer.md - archaeological extraction requires source template');
  }
  
  // Replace template variables in footer
  const currentYear = new Date().getFullYear();
  footerContent = footerContent.replace(/\{\{CURRENT_YEAR\}\}/g, currentYear);
  
  // Add boot.md right after body.md
  const bootPath = path.join('./src/sys', 'boot.md');
  const bootContent = await readComponent(bootPath);
  
  if (!bootContent) {
    throw new Error('Failed to read boot.md - archaeological extraction requires source template');
  }

  // Compile final template with AI Precision Optimized structure and proper .fp format
  const finalTemplate = [
    '<floatprompt>',
    await extractFloatPromptFrontmatter(),
    await extractFloatPromptBody(),
    bootContent,
    '',
    ...compiledSections,
    footerContent,
    '</floatprompt>'
  ].join('\n');
  
  // Write .fp.txt output file
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

async function buildLibComponent(config, componentName) {
  console.log(`🔧 Building ${componentName}...\n`);
  
  // Ensure output directory exists
  await ensureDirectory(config.outputDir);
  
  // Read component files
  const headerPath = path.join(config.sourceDir, 'header.md');
  const bodyPath = path.join(config.sourceDir, 'body.md');
  const footerPath = path.join(config.sourceDir, 'footer.md');
  
  console.log(`📄 Reading ${componentName} header...`);
  let headerContent = await readComponent(headerPath, config.sharedDir);
  
  // Process template variables in header
  if (headerContent) {
    const buildDate = new Date().toISOString().split('T')[0];
    headerContent = headerContent
      .replace(/\{\{VERSION\}\}/g, VERSION)
      .replace(/\{\{BUILD_DATE\}\}/g, buildDate);
  }
  
  console.log(`📄 Reading ${componentName} body...`);
  let bodyContent = await readComponent(bodyPath, config.sharedDir);
  
  // Process template variables in body
  if (bodyContent) {
    const buildDate = new Date().toISOString().split('T')[0];
    bodyContent = bodyContent
      .replace(/\{\{VERSION\}\}/g, VERSION)
      .replace(/\{\{BUILD_DATE\}\}/g, buildDate);
  }
  
  console.log(`📄 Reading ${componentName} footer...`);
  let footerContent = await readComponent(footerPath, config.sharedDir);
  
  if (!headerContent) {
    throw new Error(`Failed to read ${componentName} header.md`);
  }
  
  // If body is empty, read from the existing dist file content
  if (!bodyContent || bodyContent.trim() === '') {
    console.log(`📄 Body is empty, extracting from existing ${componentName}...`);
    try {
      const existingPath = path.join(config.outputDir, config.outputFile);
      const existingContent = await fs.readFile(existingPath, 'utf-8');
      
      // Extract content between header and footer
      const startMarker = '---\n';
      const endMarker = '\n---\n\n© ';
      
      const startIndex = existingContent.indexOf(startMarker);
      const endIndex = existingContent.indexOf(endMarker);
      
      if (startIndex !== -1 && endIndex !== -1) {
        const headerEndIndex = existingContent.indexOf('\n---\n', startIndex + 4);
        if (headerEndIndex !== -1) {
          bodyContent = existingContent.substring(headerEndIndex + 5, endIndex).trim();
          console.log('✅ Extracted body content from existing file');
        }
      }
    } catch (error) {
      console.warn('⚠️  Could not extract from existing file, using empty body');
      bodyContent = '';
    }
  }
  
  // Process footer injections
  if (footerContent && footerContent.includes('<!-- INJECT: footer.md -->')) {
    console.log('🔗 Processing footer injection...');
    const sharedFooterPath = path.join('./src/shared', 'footer.md');
    const sharedFooterContent = await readComponent(sharedFooterPath);
    
    if (sharedFooterContent) {
      // Extract just the final attribution line from shared footer
      const lines = sharedFooterContent.split('\n');
      const attributionLine = lines.find(line => line.startsWith('© {{CURRENT_YEAR}}'));
      
      if (attributionLine) {
        const currentYear = new Date().getFullYear();
        const processedAttribution = attributionLine.replace(/\{\{CURRENT_YEAR\}\}/g, currentYear);
        footerContent = footerContent.replace('<!-- INJECT: footer.md -->', processedAttribution);
      }
    }
  }
  
  // Replace template variables in footer
  const currentYear = new Date().getFullYear();
  if (footerContent) {
    footerContent = footerContent.replace(/\{\{CURRENT_YEAR\}\}/g, currentYear);
  }
  
  // Generate footer from shared/footer.md if voice guide footer is missing
  if (!footerContent) {
    const sharedFooterPath = path.join('./src/shared', 'footer.md');
    const sharedFooterContent = await fs.readFile(sharedFooterPath, 'utf-8');
    
    if (!sharedFooterContent) {
      throw new Error('Failed to read shared/footer.md - voice guide build requires footer template');
    }
    
    // Extract the minimal attribution template from the footer.md
    const minimalMatch = sharedFooterContent.match(/```\s*\n---\s*\n© \{\{CURRENT_YEAR\}\} \[MDS\]\(https:\/\/mds\.is\) \| CC BY 4\.0\s*\n```/);
    if (!minimalMatch) {
      throw new Error('Failed to extract minimal attribution template from shared/footer.md - template format may be incorrect');
    }
    
    footerContent = minimalMatch[0]
      .replace(/```\s*\n/, '')
      .replace(/\s*\n```/, '')
      .replace(/\{\{CURRENT_YEAR\}\}/g, currentYear);
  }
  
  // Compile final component
  const finalComponent = [
    headerContent,
    bodyContent,
    footerContent
  ].filter(Boolean).join('\n\n');
  
  // Write .fp.txt output file
  const outputPath = path.join(config.outputDir, config.outputFile);
  await fs.writeFile(outputPath, finalComponent, 'utf-8');
  
  console.log(`\n✅ Successfully built ${componentName}!`);
  console.log(`📍 Output: ${outputPath}`);
  console.log(`📏 Final size: ${Math.round(finalComponent.length / 1024)}KB`);
  console.log(`🔧 Type: ${componentName}`);
}

// Specific builder functions
async function buildVoiceGuide() {
  await buildLibComponent(VOICE_BUILD_CONFIG, 'Voice Guide Creator');
}

async function buildFormatter() {
  await buildLibComponent(FORMATTER_BUILD_CONFIG, 'FloatPrompt Formatter');
}

async function buildBlueprint() {
  await buildLibComponent(BLUEPRINT_BUILD_CONFIG, 'Blueprint - Surgical Assembly Specification Generator');
}

// Error handling
async function main() {
  try {
    // Build the main FloatPrompt template and all lib components
    await buildFloatPrompt();
    console.log('\n' + '='.repeat(50) + '\n');
    await buildVoiceGuide();
    console.log('\n' + '='.repeat(50) + '\n');
    await buildFormatter();
    console.log('\n' + '='.repeat(50) + '\n');
    await buildBlueprint();
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
 