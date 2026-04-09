#!/usr/bin/env node

// ============================================
// RUN ALL - Ejecuta todos los ejercicios del repositorio
// ============================================
// Uso: node run-all.js
// ============================================

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const BASE_DIR = __dirname;

const categories = [
  '01-arrays-strings',
  '02-linked-lists',
  '03-trees',
  '04-graphs',
  '05-dynamic-programming',
  '06-stacks-queues',
  '07-backtracking',
  '08-binary-search',
  '09-design',
  '10-js-concepts',
];

let totalFiles = 0;
let passed = 0;
let failed = 0;
const failures = [];

console.log('='.repeat(60));
console.log('  INTERVIEW PREP JS - Ejecutando todos los ejercicios');
console.log('='.repeat(60));

for (const category of categories) {
  const dirPath = path.join(BASE_DIR, category);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('.js'))
    .sort();

  if (files.length === 0) continue;

  console.log(`\n${'─'.repeat(60)}`);
  console.log(`  📂 ${category}`);
  console.log(`${'─'.repeat(60)}`);

  for (const file of files) {
    totalFiles++;
    const filePath = path.join(dirPath, file);
    try {
      const output = execSync(`node "${filePath}"`, {
        timeout: 15000,
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      });
      passed++;
      const testCount = (output.match(/✓/g) || []).length;
      console.log(`  ✅ ${file} (${testCount} tests)`);
    } catch (err) {
      failed++;
      const errorMsg = err.stderr || err.stdout || err.message;
      failures.push({ file: `${category}/${file}`, error: errorMsg });
      console.log(`  ❌ ${file}`);
      console.log(`     Error: ${errorMsg.split('\n')[0]}`);
    }
  }
}

console.log(`\n${'='.repeat(60)}`);
console.log(`  RESULTADOS FINALES`);
console.log(`${'='.repeat(60)}`);
console.log(`  Total archivos: ${totalFiles}`);
console.log(`  Pasados:        ${passed} ✅`);
console.log(`  Fallidos:       ${failed} ❌`);
console.log(`${'='.repeat(60)}`);

if (failures.length > 0) {
  console.log('\n  FALLOS DETALLADOS:');
  for (const f of failures) {
    console.log(`\n  📄 ${f.file}`);
    console.log(`     ${f.error.substring(0, 200)}`);
  }
}

process.exit(failed > 0 ? 1 : 0);
