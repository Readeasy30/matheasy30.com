#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { createHash } from 'crypto';

const REPO_ROOT = process.cwd();

function findHtmlFiles(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) findHtmlFiles(fullPath, results);
    else if (entry.endsWith('.html')) results.push(fullPath);
  }
  return results;
}

function fileHash(filePath) {
  try { return createHash('md5').update(readFileSync(filePath)).digest('hex').slice(0, 8); }
  catch { return null; }
}

function resolveAssetPath(htmlFilePath, refPath) {
  const cleanPath = refPath.split('?')[0].split('#')[0];
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://') || cleanPath.startsWith('//') || cleanPath.startsWith('data:') || cleanPath === '' || cleanPath.startsWith('#')) return null;
  if (cleanPath.startsWith('/')) return join(REPO_ROOT, cleanPath.slice(1));
  return resolve(dirname(htmlFilePath), cleanPath);
}

function processHtmlFile(htmlFilePath) {
  let content = readFileSync(htmlFilePath, 'utf8');
  let modified = false;
  content = content.replace(/(<link\s+[^>]*?href=")([^"]+)(")/gi, (match, prefix, href, suffix) => {
    if (!/rel\s*=\s*["']stylesheet["']/i.test(prefix)) return match;
    const assetPath = resolveAssetPath(htmlFilePath, href);
    if (!assetPath || !existsSync(assetPath)) return match;
    const hash = fileHash(assetPath);
    if (!hash) return match;
    const cleanHref = href.split('?')[0].split('#')[0];
    const newHref = `${cleanHref}?v=${hash}`;
    if (newHref !== href) { modified = true; return `${prefix}${newHref}${suffix}`; }
    return match;
  });
  content = content.replace(/(<script\s+[^>]*?src=")([^"]+)(")/gi, (match, prefix, src, suffix) => {
    const assetPath = resolveAssetPath(htmlFilePath, src);
    if (!assetPath || !existsSync(assetPath)) return match;
    const hash = fileHash(assetPath);
    if (!hash) return match;
    const cleanSrc = src.split('?')[0].split('#')[0];
    const newSrc = `${cleanSrc}?v=${hash}`;
    if (newSrc !== src) { modified = true; return `${prefix}${newSrc}${suffix}`; }
    return match;
  });
  if (modified) { writeFileSync(htmlFilePath, content, 'utf8'); console.log(`  Updated: ${htmlFilePath.replace(REPO_ROOT, '')}`); }
  return modified;
}

console.log('Cache-bust: scanning HTML files...');
const htmlFiles = findHtmlFiles(REPO_ROOT);
console.log(`Found ${htmlFiles.length} HTML file(s).`);
let updatedCount = 0;
for (const file of htmlFiles) { if (processHtmlFile(file)) updatedCount++; }
console.log(`\nDone. ${updatedCount} file(s) updated.`);
if (updatedCount === 0) console.log('All cache-bust hashes are already up to date.');
