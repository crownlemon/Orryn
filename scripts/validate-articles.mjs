#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const base=path.join(root,'src/content/docs');
const entities=JSON.parse(fs.readFileSync(path.join(root,'src/data/knowledge/entities.json'),'utf8'));
const ids=new Set(entities.map(e=>e.id));
const categories={
  characters:{kind:'person',headings:['Appearance and character','Family','History'],tree:'personId'},
  houses:{kind:'house',headings:['History','Family','Lordship and household','Events in 208 AC'],tree:'houseId'},
  places:{kind:'place',headings:['Description','History','Lordship','Events in 208 AC']},
  realm:{kind:'region',headings:['Geography','History and government','Houses and places']},
  events:{kind:'event',headings:['Account','Background','Consequences']},
  titles:{kind:'title',headings:['Nature of the title','Holders','History']}
};
const errors=[],counts={};
function check(ok,msg){if(!ok)errors.push(msg)}
for(const [category,conf] of Object.entries(categories)){
  const dir=path.join(base,category);
  const files=fs.readdirSync(dir).filter(name=>/\.mdx?$/.test(name));
  counts[category]=files.length;
  for(const name of files){
    const src=fs.readFileSync(path.join(dir,name),'utf8');
    const slug=name.replace(/\.mdx?$/,'');
    const id=conf.kind+':'+(category==='realm'?slug.replace(/^the-/,''):category==='events'&&slug==='cress-hill'?'cress-hill-affair':slug);
    const prefix=category+'/'+name;
    check(name.endsWith('.mdx'),prefix+': all encyclopedia articles must use MDX');
    check(ids.has(id),prefix+': missing knowledge entity '+id);
    const identity=[...src.matchAll(/<ArticleIdentity\s+entityId="([^"]+)"\s*\/>/g)];
    check(identity.length===1 && identity[0][1]===id,prefix+': expected single shared ArticleIdentity for '+id);
    const headings=[...src.matchAll(/^## (.*)$/gm)].map(m=>m[1]);
    const order=headings.map(h=>conf.headings.indexOf(h));
    check(order.every(n=>n>=0),prefix+': noncanonical top-level section '+headings.filter(h=>!conf.headings.includes(h)).join(', '));
    check(order.every((n,i)=>i===0||n>order[i-1]),prefix+': headings out of order or repeated');
    check(!/<aside[^>]*orr-infobox|<svg\b|<KnowledgeInfobox\b/.test(src),prefix+': legacy infobox or diagram remains');
    const imports=[...src.matchAll(/^import ArticleIdentity from /gm)];
    check(imports.length===1,prefix+': expected one shared ArticleIdentity import');
    if(conf.tree){
      const trees=[...src.matchAll(/<KnowledgeFamilyTree\s+(houseId|personId)="([^"]+)"\s*\/>/g)];
      check(trees.length===1 && trees[0][1]===conf.tree && trees[0][2]===id,prefix+': expected one generated family tree');
      check(headings.includes('Family'),prefix+': missing family section');
    } else {
      check(!/<KnowledgeFamilyTree\b/.test(src),prefix+': unexpected family tree');
    }
    const page=entities.find(e=>e.id===id)?.page;
    if(page)check(page==='/'+category+'/'+slug+'/',prefix+': entity page route differs from article');
  }
}
if(errors.length){
  for(const e of errors)console.error('FAIL '+e);
  process.exitCode=1;
}else{
  console.log('Article model validated:',Object.values(counts).reduce((a,b)=>a+b,0),'articles.');
  console.log(JSON.stringify(counts));
  console.log('All category schemas, shared infoboxes and generated family trees conform.');
}
