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
  born?: string; died?: string;
  words?: string | null; arms?: Heraldry; placeType?: string;
  age208?: number; birthHouse?: string; year?: number; chapter?: number; awoiaf?: string;
  rank208?: string; regionalArea208?: string; geographicAnchor208?: string;
  legendaryFounder?: string; fieldSources?: Record<string,string[]>;
  titleNature?: 'hereditary_lordship' | 'dignity' | 'royal_appointment' | 'reach_appointment';
  eventType?: string;
  worldbookReference?: { source:string; line:number };
  registryRole?: string; catalogStatus?: string; sourceLine208?: number;
  householdReference?: { source: string; line: number };
  ageDescription208?: string; givenNameUnestablished?: boolean; deceasedBy208?: boolean;
  sources?: string[];
};
export type Fact = {
  id: string; subject: string; predicate: string; object: string; sources: string[];
  from?: Moment; until?: Moment; asOf?: Moment;
  role208?: string; rosterGroup208?: string; evidence?: Array<{source: string; line: number}>;
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

export type DetailRow = {
  label: string;
  text: string;
  link?: string;
  links?: { name: string; link?: string }[];
};

export function identityRows(entity: Entity, at: Moment = DEFAULT_DATE): DetailRow[] {
  const rows: DetailRow[] = [];
  const add = (label: string, target?: Entity) => {
    if (target) rows.push({ label, text: target.name, link: target.page });
  };
  const addMany = (label: string, targets: Entity[]) => {
    if (targets.length) rows.push({
      label, text: targets.map(x => x.name).join(', '),
      links: targets.map(x => ({name:x.name,link:x.page}))
    });
  };
  const literal = (label: string, value?: string | number | null) => {
    if (value !== null && value !== undefined && value !== '') rows.push({label,text:String(value)});
  };
  if (entity.kind === 'house') {
    add('Seat', one(entity.id,'seat',at));
    addMany('Historical seat association',outgoing(entity.id,'historical_seat',at));
    add('Region', one(entity.id,'region',at));
    addMany('Historical region',outgoing(entity.id,'historical_region',at));
    addMany('Historical overlord',outgoing(entity.id,'historical_overlord',at));
    add('Head', one(entity.id,'head',at));
    addMany('Heirs', incoming(entity.id,'heir_to',at));
    add('Overlord',one(entity.id,'sworn_to',at));
    addMany('Hereditary titles',incoming(entity.id,'associated_house',at).filter(t=>t.kind==='title'));
    literal('Rank',entity.rank208);
    literal('Words',entity.words??'Not recorded');
    literal('Legendary founder',entity.legendaryFounder);
  }
  if (entity.kind === 'person') {
    literal('Born',entity.born);
    if (at.year === 208) literal('Age',entity.ageDescription208??entity.age208);
    const byBirth = outgoing(entity.id,'born_to_house',at)[0] ??
      (entity.birthHouse ? index.get('house:'+entity.birthHouse) : undefined);
    if(byBirth) add('House by birth',byBirth);
    else if(entity.birthHouse) literal('House by birth','House '+entity.birthHouse[0].toUpperCase()+entity.birthHouse.slice(1));
    addMany('Parents',parents(entity.id,at));
    addMany('Spouses',partners(entity.id,at));
    addMany('Betrothed',betrothed(entity.id,at));
    addMany('Children',children(entity.id,at));
    addMany('Titles',outgoing(entity.id,'holds_title',at));
    add('Heir to',outgoing(entity.id,'heir_to',at)[0]);
    add('Residence',one(entity.id,'resides_at',at));
  }
  if (entity.kind === 'place') {
    literal('Type',entity.placeType?.replace(/_/g,' '));
    add('Region',one(entity.id,'region',at));
    const ruling = incoming(entity.id,'seat',at).find(h=>h.kind==='house') ??
      one(entity.id,'ruled_by',at);
    add('House',ruling);
    if(ruling) add('Lord',one(ruling.id,'head',at));
  }
  if (entity.kind === 'title') {
    literal('Nature',entity.titleNature?.replace(/_/g,' '));
    add('Associated house',one(entity.id,'associated_house',at));
    add('Seat',one(entity.id,'seat',at));
    addMany('Holders',incoming(entity.id,'holds_title',at));
  }
  if (entity.kind === 'region') {
    const ruling = one(entity.id,'ruled_by',at) ?? entities.find(h => h.kind==='house' && h.rank208==='Ruling' && outgoing(h.id,'region',at).some(r=>r.id===entity.id));
    add('Ruling house',ruling);
    add('Ruling seat',one(entity.id,'seat',at) ?? (ruling?one(ruling.id,'seat',at):undefined));
    literal('Documented houses',entities.filter(h=>h.kind==='house' && outgoing(h.id,'region',at).some(r=>r.id===entity.id)).length);
  }
  if (entity.kind === 'event') {
    literal('Date',entity.year?entity.year+' AC':undefined);
    literal('Type',entity.eventType);
    add('Region',one(entity.id,'region',at));
    addMany('Recorded participants',outgoing(entity.id,'participant',at));
  }
  return rows;
}

