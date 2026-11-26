# Full migration roadmap

Development branch: dev/awoiaf-knowledge-model
Live branch: main (no Phase 2 migration commits)
Publication rule: no bulk article release before source, licensing, chronology and browser checks.

## Workstream A: Environment and legal foundations
Status: development branch established; CI checks active. Privacy and local image hosting not yet configured.
- Keep main unchanged until a reviewed merge.
- Verify artwork licensing per file; do not assume all wiki images are CC BY-SA.
- Reused AWOIAF text requires appropriate CC BY-SA attribution and adaptation notices.
- Do not treat a private site as a blanket copyright exemption.

## Workstream B: AWOIAF-compatible knowledge model
Status: implemented pilot with large 208 AC regional seed.
- House, person, place, region, hereditary title and historical event are distinct entities.
- Source-backed relationships can be queried by year/chapter.
- Shared generated infoboxes and connected family diagrams are implemented.
- Exact infobox house parameters have an initial documented map; other templates require further verification.
- Test ambiguous names, dynastic cadet lines and succession before full import.

## Workstream C: Pre-story published history
Status: research and field mapping begun; full history not imported.
- Gather published historical houses, major offices, dated rulers, marriages, wars, conflicts and places using source-backed indexes.
- Filter any post-baseline event and post-208 cadet branch.
- Import facts, not contemporary AWOIAF householder snapshots.
- Keep source attribution and edition/version when permitted by license.
- Never copy novels verbatim.

## Workstream D: Our established baseline
Status: imported Worldbook 208 AC house/holding register; Householdbook house index completed.
- 139 holdings, 46 distinct Householdbook house names, and full relevant source-line mapping.
- Current source-grounded region, rank, seat, overlord, lord and heir fields in the network.
- More household people, officers, wards, members and marriages require careful extraction and reconciliation.
- Flag inconsistent spellings and unfinished lineage rather than inventing missing details.
- Keep private speculative plans out of the public repository and current-year dataset.

## Workstream E: Generated article system
Status: working prototypes in the development branch.
- Render house, character and place infoboxes from data, not repeated hardcoded HTML.
- Render linked family trees and derived heirs.
- Maintain lengthy, readable, historically grounded article prose separately from normalized facts.
- Do not replace current main articles until side-by-side review confirms parity.

## Workstream F: Regional atlas and geographical expansion
Status: Reach and Stormlands 208 AC registers seeded; atlas generated.
- Inspect rank/overlord/holding hierarchies and all 139 entries.
- Establish map locators only where reliable geographic evidence exists.
- Expand to Crownlands, Westerlands, Riverlands, Vale, North, Iron Islands, Dorne as evidence becomes available.
- Do not turn an unnamed holding into a fabricated noble house.

## Workstream G: Chapters and historical change
Status: chronological engine and Chapter 60 marriage/betrothal tests implemented.
- Extract actual played events, preserving date, place, participants and change type.
- Reconcile the accepted chapters with household baselines before recording mutations.
- Query earlier dates without accidentally importing later events.
- Do not publish speculative future outcomes, secrets or unresolved proposals as facts.

## Workstream H: Integrity and release
Status: automated validation and Astro build CI; browser preview review remains.
- Run npm run validate:knowledge; npm run audit:atlas; npm run build.
- Review spelling/aliases, parentage, house words, titles, heraldry and links.
- Check visual layout in branch-specific preview, especially wide family diagrams.
- Merge into main in small verified batches only with explicit approval.

## Deliverables already in repository

- data/import/worldbook-holdings-208.json
- data/import/household-houses-v12.json
- data/import/coverage.json
- src/data/knowledge/entities.json
- src/data/knowledge/facts.json
- src/data/knowledge/sources.json
- src/data/knowledge/awoiaf-field-map.json
- src/data/knowledge/index.ts
- src/components/KnowledgeInfobox.astro
- src/components/KnowledgeFamilyTree.astro
- src/components/KnowledgeAtlas.astro
- src/content/docs/prototype/knowledge-model.mdx
- src/content/docs/prototype/regional-atlas.mdx
- scripts/validate-knowledge.mjs
- scripts/audit-atlas.mjs
- .github/workflows/phase2-knowledge.yml

## Explicitly not yet done

The historical AWOIAF encyclopedia has not been bulk copied or imported. Most newly indexed houses do not yet have authored articles or named current heads. The live Cloudflare website is not password-protected merely because development uses another GitHub branch. No browser-based acceptance review or final merge has occurred.


## Milestone: Meadows household person-level extraction (26 November 2026)

During the first automated build round, added the 208 AC household and local-official roster explicitly named in Householdbook v12, lines 353–387, including named officers, knights, squires, companions, local officials and recurring visitors. Kept nonresident relatives and recurring visitors distinct from domestic staff and did not infer residence.

- 20 additional named people with source-line anchors.
- Family members already in the dataset linked into the roster without duplicating their identities.
- Squire-to-knight service relations recorded only where explicitly documented.
- New data-generated roster component: src/components/KnowledgeRoster.astro.
- New branch-only preview: /prototype/meadows-household/ .
- The next batches should expand the current roster to other major households and add internal character-to-house relationships while checking conflicting residences and chronology.


## Milestone: Baratheon and Penrose dynasties (manual start, 26 November 2026)

Inspected Householdbook v12 primary household sections 894–926 (Baratheon) and 1147–1172 (Penrose), plus individual appearance and reputation descriptions, and the Grandison 55–89 cross-connections.

Completed:
- Added 22 source-identified people, including one deliberately unnamed Peasebury daughter, with precise Householdbook line references. The person already known as Joy Penrose and other existing characters were reused, never duplicated.
- Documented Edric Baratheon, his three sons and two grandsons; Ronnel Penrose, his Targaryen wife and children; and the separate lineage of his brother Roland Penrose and Lady Alysanne Hightower.
- Linked two current heads, two heirs and their hereditary lordships, plus Ronnel's royal office as master of coin.
- Recorded explicit marriages, parentage, engagements, birth families, resident kin, household knights, squires and visiting relations. No invented names for open places in the genealogy or unestablished staff.
- Generated new substantial wiki pages for Houses Baratheon and Penrose and four principal characters, using structured infoboxes and generated family diagrams.
- Source has speculative later history about Orryn's knighthood and Merewatch c. 224 AC; those events were **not imported** as facts.
- Extended validation for both dynasties, their heirs and several independent genealogical links.

Next: broaden additional house rosters from Householdbook, verify adopted names and cross-house family trees, and reconcile book-canon history with source-era snapshots before extending beyond the first two regions.
