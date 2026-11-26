#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const load = name => JSON.parse(fs.readFileSync(path.join(root, 'src/data/knowledge', name + '.json'), 'utf8'));
const entities = load('entities'), facts = load('facts'), sources = load('sources');
const ids = new Map(entities.map(e => [e.id, e]));
const evidence = new Set(sources.map(s => s.id));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const key = (m, fallback = 0) => m.year * 1000 + (m.chapter ?? fallback);
const active = (f, asOf) =>
  (!f.from || key(f.from) <= key(asOf, 999)) &&
  (!f.until || key(f.until) > key(asOf, 999)) &&
  (!f.asOf || key(f.asOf) <= key(asOf, 999));

check(ids.size === entities.length, 'Duplicate entity IDs');
check(evidence.size === sources.length, 'Duplicate source IDs');
check(new Set(facts.map(f => f.id)).size === facts.length, 'Duplicate fact IDs');
for (const e of entities) {
  check(['house', 'person', 'place', 'region', 'title', 'event'].includes(e.kind), e.id + ': unrecognized kind');
  if (e.page) {
    const base = 'src/content/docs/' + e.page.replace(/^\/|\/$/g, '');
    check(fs.existsSync(path.join(root, base + '.md')) || fs.existsSync(path.join(root, base + '.mdx')),
      e.id + ': linked article does not exist: ' + base);
  }
  if (e.arms) check(Boolean(e.arms.credit?.license && e.arms.credit?.url), e.id + ': image missing credit');
  check(Array.isArray(e.sources) && e.sources.length>0 && e.sources.every(s=>evidence.has(s)),e.id+': entity provenance missing');
}
for (const f of facts) {
  check(ids.has(f.subject), f.id + ': unknown subject: ' + f.subject);
  check(ids.has(f.object), f.id + ': unknown object: ' + f.object);
  check(f.subject !== f.object, f.id + ': self-relation');
  check(f.sources.length > 0 && f.sources.every(s => evidence.has(s)), f.id + ': missing provenance');
  if (f.from && f.until) check(key(f.from) < key(f.until), f.id + ': inverted date range');
  if (f.predicate === 'child_of')
    check(f.subject.startsWith('person:') && f.object.startsWith('person:'), f.id + ': parent links must join people');
}
for (const e of entities.filter(e => e.kind === 'house')) {
  const current = facts.filter(f => f.subject === e.id && f.predicate === 'head' && active(f, {year:208, chapter:67}));
  if (['house:rowan','house:grandison','house:meadows'].includes(e.id))
    check(current.length === 1, e.id + ': expected precisely one head in 208');
}
for (const e of entities.filter(e => e.kind === 'person')) {
  const knownParents = facts.filter(f => f.subject === e.id && f.predicate === 'child_of');
  check(knownParents.length <= 2, e.id + ': more than two established parents');
}
const marriage = facts.find(f => f.predicate === 'married_to' &&
  [f.subject,f.object].includes('person:leonette-meadows') && [f.subject,f.object].includes('person:garlan-footly'));
check(Boolean(marriage), 'Leonette marriage not represented');
if (marriage) {
  check(!active(marriage,{year:207}), '208 marriage leaked into 207');
  check(!active(marriage,{year:208,chapter:59}), 'Chapter 60 marriage leaked to Chapter 59');
  check(active(marriage,{year:208,chapter:60}), 'Chapter 60 marriage missing');
}
const rival = facts.find(f => f.predicate === 'betrothed_to' &&
  [f.subject,f.object].includes('person:triston-rowan') && [f.subject,f.object].includes('person:joy-penrose'));
check(Boolean(rival), 'Triston betrothal missing');
if (rival) check(!active(rival,{year:208,chapter:59}) && active(rival,{year:208,chapter:60}),
  'Betrothal chronology invalid');

for (const [house,head,heir] of [
  ['house:baratheon','person:edric-baratheon','person:lyonel-baratheon'],
  ['house:penrose','person:ronnel-penrose','person:robin-penrose']
]) {
  check(facts.some(f=>f.subject===house&&f.predicate==='head'&&f.object===head&&active(f,{year:208,chapter:67})),house+': 208 head missing');
  check(facts.some(f=>f.subject===heir&&f.predicate==='heir_to'&&f.object===house&&active(f,{year:208,chapter:67})),house+': 208 heir missing');
}
for (const [child,parent] of [
 ['person:lyonel-baratheon','person:edric-baratheon'],
 ['person:boremund-baratheon','person:edric-baratheon'],
 ['person:gowen-baratheon','person:edric-baratheon'],
 ['person:ormund-baratheon','person:laena-baratheon'],
 ['person:edwyn-baratheon','person:boremund-baratheon'],
 ['person:joy-penrose','person:elaena-targaryen'],
 ['person:laena-baratheon','person:ronnel-penrose'],
 ['person:jon-penrose','person:roland-penrose'],
 ['person:addam-penrose','person:alysanne-penrose']
])check(facts.some(f=>f.subject===child&&f.predicate==='child_of'&&f.object===parent),child+': known parent missing');
check(!ids.has('house:grandison-of-merewatch'),'Unplayed 224 AC house must not exist in 208 records');
if (failures.length) {
  for (const problem of failures) console.error('FAIL', problem);
  process.exitCode = 1;
} else {
  console.log('Knowledge model validated:',
    entities.length, 'entities;', facts.length, 'facts;', sources.length, 'sources.');
  console.log('Verified referential integrity, house heads, family links, source IDs and 207/208 chronology.');
}
