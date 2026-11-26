import entitiesData from './entities.json';
import factsData from './facts.json';
import sourcesData from './sources.json';

export type EntityKind = 'house' | 'person' | 'place' | 'region' | 'title' | 'event';
export type Moment = { year: number; chapter?: number };
export type Evidence = { id: string; title: string; url: string; kind: string };
export type Heraldry = {
  image: string; blazon: string;
  credit: { author: string; url: string; license: string; licenseUrl: string };
};
export type Entity = {
  id: string; kind: EntityKind; name: string; page?: string; subtitle?: string;
  words?: string | null; arms?: Heraldry; placeType?: string;
  age208?: number; birthHouse?: string; year?: number; chapter?: number; awoiaf?: string;
  sources?: string[];
};
export type Fact = {
  id: string; subject: string; predicate: string; object: string; sources: string[];
  from?: Moment; until?: Moment; asOf?: Moment;
};
export const entities = entitiesData as Entity[];
export const facts = factsData as Fact[];
export const sources = sourcesData as Evidence[];
const index = new Map(entities.map(entity => [entity.id, entity]));
export const DEFAULT_DATE: Moment = { year: 208, chapter: 67 };

export function getEntity(id: string): Entity {
  const entity = index.get(id);
  if (!entity) throw new Error('Unknown knowledge entity: ' + id);
  return entity;
}

function key(moment: Moment, defaultChapter: number) {
  return moment.year * 1000 + (moment.chapter ?? defaultChapter);
}

export function activeAt(fact: Fact, at: Moment = DEFAULT_DATE): boolean {
  const now = key(at, 999);
  // A historical fact is only used before the date of its first confirmed appearance
  // when evidence establishes that it was already true.
  if (fact.asOf && now < key(fact.asOf, 0)) return false;
  if (fact.from && now < key(fact.from, 0)) return false;
  if (fact.until && now >= key(fact.until, 0)) return false;
  return true;
}

export function outgoing(subject: string, predicate: string, at: Moment = DEFAULT_DATE): Entity[] {
  return facts.filter(f => f.subject === subject && f.predicate === predicate && activeAt(f, at))
    .map(f => getEntity(f.object));
}

export function incoming(object: string, predicate: string, at: Moment = DEFAULT_DATE): Entity[] {
  return facts.filter(f => f.object === object && f.predicate === predicate && activeAt(f, at))
    .map(f => getEntity(f.subject));
}

export function undirected(subject: string, predicate: string, at: Moment = DEFAULT_DATE): Entity[] {
  const found = new Map<string, Entity>();
  for (const entity of [...outgoing(subject, predicate, at), ...incoming(subject, predicate, at)])
    found.set(entity.id, entity);
  return [...found.values()];
}

export function one(subject: string, predicate: string, at: Moment = DEFAULT_DATE): Entity | undefined {
  return outgoing(subject, predicate, at)[0];
}

export function parents(person: string, at: Moment = DEFAULT_DATE): Entity[] {
  return outgoing(person, 'child_of', at);
}

export function children(person: string, at: Moment = DEFAULT_DATE): Entity[] {
  return incoming(person, 'child_of', at);
}

export function partners(person: string, at: Moment = DEFAULT_DATE): Entity[] {
  return undirected(person, 'married_to', at);
}

export function betrothed(person: string, at: Moment = DEFAULT_DATE): Entity[] {
  return undirected(person, 'betrothed_to', at);
}

export function siblings(person: string, at: Moment = DEFAULT_DATE): Entity[] {
  const direct = new Map<string, Entity>();
  const ownParents = new Set(parents(person, at).map(p => p.id));
  for (const parent of ownParents)
    for (const relative of children(parent, at))
      if (relative.id !== person) direct.set(relative.id, relative);
  // Explicit sibling references are symmetric and can establish collateral
  // branches even when the parents' names have not been documented.
  for (const relative of undirected(person, 'sibling_of', at))
    if (relative.id !== person) direct.set(relative.id, relative);
  return [...direct.values()];
}

export function factSources(fact: Fact): Evidence[] {
  const lookup = new Map(sources.map(s => [s.id, s]));
  return fact.sources.map(id => {
    const source = lookup.get(id);
    if (!source) throw new Error('Unknown source ' + id);
    return source;
  });
}

export function identityRows(entity: Entity, at: Moment = DEFAULT_DATE): Array<{ label: string; text: string; link?: string }> {
  const rows: Array<{ label: string; text: string; link?: string }> = [];
  const add = (label: string, target?: Entity) => {
    if (target) rows.push({ label, text: target.name, link: target.page });
  };
  const literal = (label: string, text?: string | number | null) => {
    if (text !== null && text !== undefined) rows.push({ label, text: String(text) });
  };
  if (entity.kind === 'house') {
    add('Seat', one(entity.id, 'seat', at));
    add('Region', one(entity.id, 'region', at));
    add('Head', one(entity.id, 'head', at));
    add('Overlord', one(entity.id, 'sworn_to', at));
    literal('Words', entity.words ?? 'Unknown');
  }
  if (entity.kind === 'person') {
    // Ages are a 208 AC snapshot, not dynamically derived birth dates.
    if (at.year === 208) literal('Age', entity.age208);
    add('Father / mother', parents(entity.id, at)[0]);
    add('Other parent', parents(entity.id, at)[1]);
    add('Spouse', partners(entity.id, at)[0]);
    add('Betrothed', betrothed(entity.id, at)[0]);
    add('Title', outgoing(entity.id, 'holds_title', at)[0]);
    add('Residence', one(entity.id, 'resides_at', at));
  }
  if (entity.kind === 'place') {
    literal('Type', entity.placeType?.replace('_', ' '));
    add('Region', one(entity.id, 'region', at));
    add('Ruling house', one(entity.id, 'ruled_by', at));
    const seated = incoming(entity.id, 'seat', at).find(e => e.kind === 'house');
    add('Seat of', seated);
  }
  if (entity.kind === 'title') {
    add('Seat', one(entity.id, 'seat', at));
    add('Holder', incoming(entity.id, 'holds_title', at)[0]);
  }
  if (entity.kind === 'event') literal('Year', entity.year ? entity.year + ' AC' : undefined);
  return rows;
}
