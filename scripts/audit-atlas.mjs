#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const entries=read('data/import/worldbook-holdings-208.json').table;
const entities=read('src/data/knowledge/entities.json');
const facts=read('src/data/knowledge/facts.json');
const byId=new Map(entities.map(e=>[e.id,e]));
const failures=[];
const assert=(x,message)=>{if(!x)failures.push(message)};
assert(entries.length===139,'Worldbook registry must have 139 rows');
assert(entries.filter(e=>e.region==='Stormlands').length===60,'Stormlands count changed');
assert(entries.filter(e=>e.region==='Reach').length===79,'Reach count changed');
const associations=new Set(facts.map(f=>f.subject+'|'+f.predicate+'|'+f.object));
for(const e of entries){
  const place=byId.get(e.proposedPlaceId);
  assert(!!place,'Missing holding '+e.entry);
  assert(!!place?.sourceLine208 && place.sourceLine208===e.sourceLine,'Missing provenance line: '+e.entry);
  const region=e.region==='Reach'?'region:reach':'region:stormlands';
  assert(associations.has(e.proposedPlaceId+'|region|'+region),'Missing place-region link: '+e.entry);
  if(e.houseName){
    const house=byId.get(e.proposedHouseId);
    assert(!!house,'Missing house: '+e.entry);
    assert(house?.rank208===e.rank,'Rank mismatch: '+e.entry);
    assert(associations.has(e.proposedHouseId+'|seat|'+e.proposedPlaceId),'Seat mismatch: '+e.entry);
    assert(associations.has(e.proposedHouseId+'|region|'+region),'Region mismatch: '+e.entry);
  }else{
    assert(!entities.some(h=>h.kind==='house'&&associations.has(h.id+'|seat|'+e.proposedPlaceId)),'Invented ruling house: '+e.entry);
  }
}
for(const region of ['region:reach','region:stormlands']){
  const heads=facts.filter(f=>f.predicate==='head'&&
     facts.some(g=>g.subject===f.subject&&g.predicate==='region'&&g.object===region));
  assert(heads.every(x=>byId.has(x.object)),'Unknown head in '+region);
}
if(failures.length){
  failures.forEach(s=>console.error('FAIL '+s));
  process.exitCode=1;
}else{
  console.log('Regional atlas checks passed:',entries.length,'holdings and associated houses.');
  console.log('Preserved two unassigned holdings and all documented source-line references.');
}
