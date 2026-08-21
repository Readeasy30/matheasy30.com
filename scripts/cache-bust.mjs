#!/usr/bin/env node
/**
 * Cache-bust script for static sites with no build step.
 *
 * Scans every HTML file in the repo and adds/updates a ?v=<hash> query
 * parameter on local <link rel="stylesheet"> and <script src=...> tags.
 *
 * The hash is the first 8 characters of the MD5 of the referenced file's
 * contents, so it only changes when the actual file content changes.
 *
 * External URLs (https://, http://, //) and data: URIs are skipped.
 * Fragment-only links (#...) are skipped.
 *
 * Usage:  node scripts/cache-bust.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname, dirname, resolve, normalize, sep } from 'path';
import { createHash } from 'crypto';

const REPO_ROOT = process.cwd();

// ── Collect all HTML files ──────────────────────────────────────────────
function findHtmlFiles(dir, results = []) {
  for (const entry of readdirSync(dir)) {
    // Skip hidden dirs and common non-site dirs
    if (entry.startsWith('.') || entry === 'node_modules') continue;
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, results);
    } else if (entry.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// ── Hash a file's contents (first 8 chars of MD5) ──────────────────────
function fileHash(filePath) {
  try {
    const content = readFileSync(filePath);
    return createHash('md5').update(content).digest('hex').slice(0, 8);
  } catch {
    return null;
  }
}

// ── Resolve a relative href/src to an absolute repo path ───────────────
function resolveAssetPath(htmlFilePath, refPath) {
  // Strip existing query string and fragment
  const cleanPath = refPath.split('?')[0].split('#')[0];

  // Skip external URLs, protocol-relative, data URIs, and fragments
  if (
    cleanPath.startsWith('http://') ||
    cleanPath.startsWith('https://') ||
    cleanPath.startsWith('//') ||
    cleanPath.startsWith('data:') ||
    cleanPath === '' ||
    cleanPath.startsWith('#')
  ) {
    return null;
  }

  // Absolute path from repo root (starts with /)
  if (cleanPath.startsWith('/')) {
    return join(REPO_ROOT, cleanPath.slice(1));
  }

  // Relative path from the HTML file's directory
  return resolve(dirname(htmlFilePath), cleanPath);
}

// ── Process a single HTML file ─────────────────────────────────────────
function processHtmlFile(htmlFilePath) {
  let content = readFileSync(htmlFilePath, 'utf8');
  let modified = false;

  // Match <link rel="stylesheet" href="..."> tags
  content = content.replace(
    /(<link\s+[^>]*?href=")([^"]+)(")/gi,
    (match, prefix, href, suffix) => {
      // Only process if this is a stylesheet link
      if (!/rel\s*=\s*["']stylesheet["']/i.test(prefix)) return match;
      const assetPath = resolveAssetPath(htmlFilePath, href);
      if (!assetPath || !existsSync(assetPath)) return match;
      const hash = fileHash(assetPath);
      if (!hash) return match;

      const cleanHref = href.split('?')[0].split('#')[0];
      const fragment = href.includes('#') ? '#' + href.split('#')[1] : '';
      const newHref = `${cleanHref}?v=${hash}${fragment}`;

      if (newHref !== href) {
        modified = true;
        return `${prefix}${newHref}${suffix}`;
      }
      return match;
    }
  );

  // Match <script src="..."> tags
  content = content.replace(
    /(<script\s+[^>]*?src=")([^"]+)(")/gi,
    (match, prefix, src, suffix) => {
      const assetPath = resolveAssetPath(htmlFilePath, src);
      if (!assetPath || !existsSync(assetPath)) return match;
      const hash = fileHash(assetPath);
      if (!hash) return match;

      const cleanSrc = src.split('?')[0].split('#')[0];
      const fragment = src.includes('#') ? '#' + src.split('#')[1] : '';
      const newSrc = `${cleanSrc}?v=${hash}${fragment}`;

      if (newSrc !== src) {
        modified = true;
        return `${prefix}${newSrc}${suffix}`;
      }
      return match;
    }
  );

  if (modified) {
    writeFileSync(htmlFilePath, content, 'utf8');
    console.log(`  Updated: ${htmlFilePath.replace(REPO_ROOT, '')}`);
  }

  return modified;
}

// ── Main ────────────────────────────────────────────────────────────────
console.log('Cache-bust: scanning HTML files...');
const htmlFiles = findHtmlFiles(REPO_ROOT);
console.log(`Found ${htmlFiles.length} HTML file(s).`);

let updatedCount = 0;
for (const file of htmlFiles) {
  if (processHtmlFile(file)) {
    updatedCount++;
  }
}

console.log(`\nDone. ${updatedCount} file(s) updated.`);
if (updatedCount === 0) {
  console.log('All cache-bust hashes are already up to date.');
}
