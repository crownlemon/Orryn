# Phase 2: AWOIAF-aligned knowledge model

Development branch: dev/awoiaf-knowledge-model
Status: pilot, not a complete Westeros import.
Historical target: story opening in 207 AC; current snapshot through Chapter 67 in 208 AC.

## Architectural reference

A Wiki of Ice and Fire distinguishes house, person, place, title, and event articles, with corresponding infoboxes, templates, categories and inter-article links. This prototype adopts those distinctions and familiar field labels. It does not assume that AWOIAF itself stores all relationships in one normalized database.

Useful reference points:

- https://awoiaf.westeros.org/index.php/Template:Infobox_house/doc
- https://awoiaf.westeros.org/index.php/Module:Infobox_character
- https://awoiaf.westeros.org/index.php/Category:Infobox_templates
- https://awoiaf.westeros.org/index.php/List_of_houses
- https://awoiaf.westeros.org/index.php/Category:Castles
- https://awoiaf.westeros.org/index.php/Lord_of_Goldengrove

The initial field map is not exhaustive. New template parameters must be verified before being adopted.

## Structure

- src/data/knowledge/entities.json: identity records for houses, people, castles, regions, titles and events.
- src/data/knowledge/facts.json: source-backed relations, with optional starting, ending and attestation moments.
- src/data/knowledge/sources.json: public reference URLs and the internal Worldbook, Householdbook and chapters used as evidence.
- src/data/knowledge/awoiaf-field-map.json: mapping from AWOIAF article conventions to structured fields.
- src/data/knowledge/index.ts: typed lookups and dated relationships.
- src/components/KnowledgeInfobox.astro: data-generated house, character and place infoboxes.
- src/components/KnowledgeFamilyTree.astro: linked family trees generated from the relationships.
- src/content/docs/prototype/knowledge-model.mdx: branch-only page demonstrating the components.
- scripts/validate-knowledge.mjs: integrity tests.

The core relationships are seat, region, sworn_to, head, holds_title, child_of, married_to, sibling_of, betrothed_to, resides_at, serves, heir_to, participant, and place. Marriage is symmetric even though stored once. Parents are never inferred from a surname or house membership. A value of null for house words means no motto has been established.

House Rowan, Goldengrove, Lord of Goldengrove and Rycherd Rowan each have their own stable entity ID. This prevents accidentally treating the hereditary office as the same object as its holder.

## Historical chronology

Facts have optional from, until (exclusive), and asOf moments, using AC years and chapter numbers where known. An event explicitly starting in Chapter 60 cannot appear in a Chapter 59 view.

For the pilot, Leonette Meadows marries Garlan Footly and Triston Rowan becomes betrothed to Joy Penrose in Chapter 60. These states are absent from 207 AC and from Chapter 59 in 208 AC. Unknown exact dates and unplayed future developments are not invented.

The snapshot model cannot yet reconstruct every earlier period. Do not present a complete historical time selector before auditing earlier facts.

## Testing and release

From a local checkout run:

1. npm install
2. npm run validate:knowledge
3. npm run build

The validator checks references, article routes, names, the three current heads, parent counts, chronology, and missing provenance. A successful validator does not prove the Astro build or browser rendering: build and visual tests are separately required.

Keep this work in the development branch. No existing house or character article has been replaced yet. Reusing AWOIAF text or images requires applicable licenses and attribution, and direct excerpts from the novels have separate rights. Internal planning and future secrets must not be published.

Creating this branch does not itself privatize the repository or the Cloudflare Pages deployment. Privacy requires separate access controls.

## Next steps

1. Verify the build and the generated preview against the current pages.
2. Audit more AWOIAF infobox and category conventions.
3. Extract an inventory of the Worldbook and Householdbook entities, with unknowns and conflicts flagged rather than completed by guesswork.
4. Convert the existing article templates to data-driven components after review.
5. Only then extend the import to wider Westeros and earlier history.
