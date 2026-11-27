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

const expectedHighgardenParents = [
  ["person:garth-tyrell","person:leo-tyrell"],
  ["person:garth-tyrell","person:arlanna-tyrell"],
  ["person:moryn-tyrell","person:leo-tyrell"],
  ["person:ceryse-oakheart","person:arlanna-tyrell"],
  ["person:olyvar-tyrell","person:leo-tyrell"],
  ["person:brenna-caswell","person:arlanna-tyrell"],
  ["person:harlen-tyrell","person:garth-tyrell"],
  ["person:harlen-tyrell","person:alys-tyrell"],
  ["person:harys-oakheart","person:ceryse-oakheart"],
  ["person:arron-redwyne","person:theomar-redwyne"],
  ["person:hugh-redwyne","person:arron-redwyne"],
];
for(const [child,parent] of expectedHighgardenParents)
  check(facts.some(f=>f.subject===child&&f.predicate==='child_of'&&f.object===parent),
        'Missing Highgarden family link '+child+' child of '+parent);
for(const [house,person] of [
  ['house:tyrell','person:leo-tyrell'],
  ['house:redwyne','person:theomar-redwyne'],
  ['house:oakheart','person:harys-oakheart']
])check(facts.some(f=>f.subject===house&&f.predicate==='head'&&f.object===person&&active(f,{year:208,chapter:67})),
  'Missing 208 lord '+house);
check(facts.some(f=>f.subject==='person:garth-tyrell'&&f.predicate==='heir_to'&&f.object==='house:tyrell'),
  'Garth Tyrell must be first heir of Highgarden');
check(facts.some(f=>f.subject==='person:harlen-tyrell'&&f.predicate==='heir_to'&&f.object==='house:tyrell'&&f.heirOrder208===2),
  'Harlen Tyrell follows Garth in succession');
check(facts.some(f=>f.subject==='person:ceryse-oakheart'&&f.predicate==='regent_for'&&f.object==='person:harys-oakheart'),
  'Ceryse must govern for her son');
check(!facts.some(f=>f.subject==='person:jeyne-meadows'&&f.predicate==='child_of'&&f.object==='person:brenna-caswell'),
  'Brenna is Jeyne Caswell’s stepmother, not biological mother');
check(!facts.some(f=>f.predicate==='betrothed_to'&&[f.subject,f.object].includes('person:harys-oakheart')&&[f.subject,f.object].includes('person:elyce-meadows')),
  'Unaccepted Harys–Elyce marriage proposal must not become betrothal');
const nonDynasticOffices=new Set([
  'title:warden-of-the-south','title:high-marshal-of-the-reach',
  'title:master-of-ships','title:lord-seneschal-of-highgarden',
  'title:lord-admiral-of-the-reach','title:marshal-of-the-dornish-marches'
]);
for(const title of nonDynasticOffices)
  check(!facts.some(f=>f.subject===title&&f.predicate==='associated_house'),
        title+': personal office must not be falsely attributed as hereditary house title');
const court= facts.filter(f=>f.object==='house:tyrell'&&f.rosterGroup208==='court_attendant');
check(court.some(f=>f.subject==='person:hugh-redwyne'),'Hugh Redwyne missing from young nobles roster');
check(court.some(f=>f.subject==='person:gyles-peake'&&/hostage/.test(f.role208||'')),
  'Gyles Peake must be documented as an involuntary ward, not ordinary visitor');
check(!facts.some(f=>f.subject==='person:moryn-tyrell'&&f.predicate==='holds_title'),
  'Moryn has personal patronage but no separate formal government office');

for(const [name,field] of [['household-appearance','appearance'],['household-reputation','reputation']]) {
  for(const [id,profile] of Object.entries(load(name))) {
    check(ids.get(id)?.kind==='person',name+': unknown person '+id);
    check(evidence.has(profile.source),name+': unknown source '+id);
    check(Number.isInteger(profile.line)&&profile.line>0,name+': missing paragraph reference '+id);
    check(typeof profile[field]==='string'&&profile[field].trim().length>0,name+': empty description '+id);
    if(field==='reputation') check(profile.asOf?.year===208&&profile.asOf?.chapter===67,name+': unbounded snapshot '+id);
  }
}
for(const f of facts.filter(f=>f.rosterGroup208)) {
  check(ids.get(f.subject)?.kind==='person'&&['house','place'].includes(ids.get(f.object)?.kind),f.id+': invalid household roster relation');
  check(typeof f.role208==='string'&&f.role208.trim().length>0,f.id+': missing household role');
}

for(const [id,age] of Object.entries(load('household-ages'))) {
  check(ids.get(id)?.kind==='person','Household age: unknown person '+id);
  check(evidence.has(age.source)&&Number.isInteger(age.line)&&age.line>0,'Household age: invalid source '+id);
  check(age.reference==='at_death'||(age.reference==='campaign_opening'&&age.year===207),'Household age: unknown time reference '+id);
  check(typeof age.age==='string'&&age.age.length>0,'Household age: empty age '+id);
}

if (failures.length) {
  for (const problem of failures) console.error('FAIL', problem);
  process.exitCode = 1;
} else {
  console.log('Knowledge model validated:',
    entities.length, 'entities;', facts.length, 'facts;', sources.length, 'sources.');
  console.log('Verified referential integrity, house heads, family links, source IDs and 207/208 chronology.');
}
