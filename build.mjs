import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from 'node:fs';
let html = readFileSync('index.html', 'utf8');
mkdirSync('dist', { recursive: true });
const styles = [...html.matchAll(/<link rel="stylesheet" href="([^"\:]+\.css)">/g)];
writeFileSync('dist/site.css', styles.map(([,file]) => readFileSync(file,'utf8')).join('\n'));
for (const [tag] of styles) html = html.replace(tag, '');
html = html.replace('</head>', '<link rel="stylesheet" href="site.css"></head>');
for (const [,asset] of html.matchAll(/(?:src|href)="([^"#:]+\.(?:js|svg|png))"/g)) {
  if (!asset.startsWith('http') && !existsSync(asset)) throw new Error('Missing asset: '+asset);
}
cpSync('assets','dist/assets',{recursive:true});
for (const file of ['script.js','motion.js','portfolio-motion.js','cinematic.js','favicon.svg']) cpSync(file,'dist/'+file);
writeFileSync('dist/index.html',html);
console.log('NERA built: all local HTML assets present, styles bundled.');
