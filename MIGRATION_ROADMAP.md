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


## Milestone: Highgarden and the Arbor (immediate next round, 26 November 2026)

Read the Worldbook v10 Highgarden and Reach settlement sections (especially lines 1635–1659 and 1694–1697) and Householdbook v12 Tyrell dynasty sections (2507–2651, 2764–2840), Redwyne lineage (2843–2847 and 3299–3310), and confirmed Oakheart situation (3552–3562).

This round delivered:
- 28 additional named person records and 9 title or office records from documented family and court structures, not invented individuals or events.
- 93 new genealogical, tenure, residence, office, successor, household, and ward relationships before review; after normalization of hereditary vs appointed titles, the final count of records reflects removal of erroneous title-to-house equivalences.
- Two new substantial house pages, **Tyrell** and **Redwyne**, and seven character biographies: Leo, Arlanna, Garth, Moryn, Ceryse, Olyvar and Theomar.
- The lineage of Leo and Arlanna; the Garth–Alys–Harlen succession; the marriage ties to Ashford, Hewett, Oakheart and Caswell; the Redwyne tie through Theomar, Arron and Hugh; and Ceryse's regency for Harys.
- A Highgarden court roster distinguishing household officers, knights, squires and the young resident nobles Hugh Redwyne and Gyles Peake, a political hostage. Did not treat transient courtiers or patronage associates as sworn factions.
- Source-provenance corrections for the Warden of the South and High Marshal of the Reach fields: these are documented in **Worldbook** v10, not at the same line in the Householdbook.
- Better title semantics: royal and Reach appointments and personal dignities are kept distinct from hereditary lordships.
- Expanded automated assertions for parents, successive heirs, Ceryse's regency, the status of Gyles Peake, and the absence of an unaccepted Harys–Elyce betrothal.

Unfinished: detailed family profiles for additional houses, full source-by-source AWOIAF historical import, art license review and browser acceptance. This is another *development milestone*, not a completion of all phases. Do not merge to main without the user's permission.

Next recommended batch: the Ashford–Merryweather–Caswell marriages and overlapping households, followed by Hightower, Rowan collateral kin, and the Reach's published pre-208 lordships, with source-era checking at each step.


## Milestone: Uniform encyclopedia article model (26 November 2026)

The first branch preview revealed inconsistent handwritten and generated infoboxes, character-family diagrams and section schemes between the older published prose and newly authored articles.

- Migrated all existing character, noble-house, place, realm and event articles to category-specific **MDX templates**, preserving their original written narrative and valid links.
- Every article uses the same database-backed `ArticleIdentity` component; character and house pages share one generated `KnowledgeFamilyTree` system. The handwritten markup was retired from the published presentation and retained in Git history for data-parity checks.
- Standardized category section order without inventing text for undocumented subjects.
- Improved the infobox data model to display known birth houses, recorded birth dates, parents, children, spouses, heirs, titles and residences with working links when available.
- Introduced a chronological Cress Hill event identity linked to the approved Worldbook.
- Added `scripts/validate-articles.mjs` to prevent future pages diverging in template, heading order or entity ID.
- Build and manual visual review are separate acceptance criteria; missing genealogical detail in earlier custom diagrams must be reconciled before final release.

This is a presentation and schema-consistency milestone, not completion of the historic AWOIAF database. Next: audit the visible generated family trees and compare legacy diagrams with structured family records before expanding the world further.

## Milestone: Extended genealogy and Penrose biographies (26 November 2026)

- Replaced the overly narrow three-row genealogy diagram with a shared, responsive family-branch view. It displays all recorded parents, spouses, betrothals, siblings and children, and opens related branches for parents, spouses, siblings, children and documented aunts/uncles. Relationships are displayed individually, not as invented common parentage or an assumed marriage between parents. Houses without an established current head degrade gracefully.
- Added nine source-grounded character articles: Joy, Robin, Jocelyn, Roland, Alysanne, Aelinor, Jon, Addam and Elaena, connected to their existing entity IDs. These make the two Penrose royal connections navigable from the genealogy.
- Coverage is now 57 encyclopedia articles (43 people, 7 houses, 4 places, 2 regions, 1 event) against 403 entities and 813 facts at the current snapshot. Entity registration is not equivalent to a finished article. The new biographies are baseline profiles, not exhaustive historical biographies.
- The family-branch layout is an intentional interim alternative to a single large SVG; a visual browser review remains necessary. Legacy diagrams also contain names not yet in the knowledge graph, including Bryce and Myranda Webber. Recover their actual parentage from Chapter 66 before adding new facts rather than promoting a diagram alone to primary evidence.

Next: recover the Rowan/Webber and Meadows/Grandison collateral data from primary texts; add Ashford–Merryweather–Caswell, then Hightower profiles and documented offices. Continue published pre-207 AC historical research and expand regional articles; no speculative later events or unreviewed secrets. No merge to main.

## Milestone: Five connected dynasties and coverage audit (26 November 2026)

Re-read Householdbook v12 paragraphs 2097–2326, 2939–2947, 3073–3085, 3537, 3644–3660 and Chapter 66. Added five linked house/seat profiles and their named kin, including Coldmoat, Bitterbridge, Ashford, Longtable and Oldtown. The six work batches were Rowan–Webber, Caswell, Ashford, Merryweather, Hightower, and an integrity/coverage audit. New articles: 29; new entities: 28; new facts: 55. Total 431 entities and 868 facts. Coverage (registered entities / with article): {"region":[2,2],"house":[138,12],"place":[140,9],"title":[15,0],"person":[132,62],"event":[4,1]}.

The proposed father of Lord Jon remains unconfirmed; unnamed Hightower daughters are not invented. Myranda's father is established in Chapter 66; her mother is not promoted from resemblance alone. Cleyton's relationship is nephew, not cousin, in the corrected household register. No later Coldmoat inheritance or marriages are imported. Baseline profiles are not complete biographies; published history still requires external verification. In-memory checks: unique entity and fact IDs, referential integrity, max two parents, shared component presence in newly authored pages passed. CI build and browser acceptance not yet independently confirmed.

Next: further household extraction, title article model, pre-207 published history and chapter chronology. Main remains unchanged.

## Milestone: Titles and offices (sixth implementation batch)

Added 21 title articles including six new source-attested titles/dignities from the five-house import. Added title category to sidebar and uniform article validator, and title nature/associated house to shared infobox. Distinguishes hereditary lordships, royal and Reach appointments and dignities. Current holders are not represented as full historical successions. Corrected the former Caswell marriage to an explicitly historical relation without fabricating the year it ended. Totals: 437 entities, 884 facts, 107 article links. Coverage: {"region":[2,2],"house":[138,12],"place":[140,9],"title":[21,21],"person":[132,62],"event":[4,1]}. Structural in-memory checks passed; local Astro build blocked by network resolution and CI result not yet available. No main merge.

## Milestone: Full current-register navigation and eleven household lineages

Migrated all registered graph entities to navigable baseline articles, without replacing existing authored pages. Added source-checked Dondarrion, Caron, Swann, Wagstaff, Gower, Hertson, Cafferen, Peasebury, Peake, Blackbar and Florent genealogy from Householdbook v12 references 1256, 1353–1354, 1493, 1532, 1605, 1697, 1770, 1863, 2423, 2877 and 3030. No invented given names or speculative marriage outcomes. Added 375 baseline articles, 45 entities and 99 relationships. Current counts: {"region":[2,2],"house":[138,138],"place":[140,140],"title":[21,21],"person":[177,177],"event":[4,4]}. Baseline articles are explicitly marked for editorial enrichment; this is not a claim of full historical or household source extraction. No merge to main. In-memory reference and parent-count checks passed; CI/visual review outstanding.

## Milestone: Complete chapter source index

Indexed 67 numbered chapters across 72 source documents. Selected explicit version 2 revisions for 32–35; retained both conflicting Chapter 67 texts without deciding their canonical order. All 67 chapter routes are navigable, with source links; archive prose and event extraction are not yet migrated. Do not treat indexed chapters as completed historical articles.

## Milestone: All nine regions and historical canon seed

Added the seven missing region pages and dated-baseline ruling dynasties and principal seats, using the pre-Conquest/Conquest discussion in AWOIAF Great houses, not its present-day house status table. Added five historical event profiles from the AWOIAF timeline and enriched the First Blackfyre Rebellion. Regional ruling houses and seats are now explicit relationships, so the Crownlands and Summerhall are not conflated. This is a historical seed; complete pre-207 house/person/location research remains open. No later events imported. Current graph: 506 entities and 1022 facts, {"region":9,"house":143,"place":147,"title":21,"person":177,"event":9}. All have baseline article routes; chapter source index is separate.

## Milestone: Additional household offices and archive text migration

Imported 30 additional source-identified people from Householdbook v12, including Elmridge, Bushy, Graves, Dunmere, Roxton, Risley, Beesbury, Leygood, Osgrey, Cockshaw, Vyrwel, Costayne, Bulwer and other named roles. Reconciled the superseded Garlan Fossoway entry (Householdbook v12 reference 855) with Garlan Footly; retained an old-route redirect, not a duplicate character. Updated affected house articles to reflect new heads and heirs. The narrative archive now contains chapters 1–66 as text plus both alternate Chapter 67 texts; 67 remains unresolved for factual chronology. Total 535 graph entities with article routes, 1061 facts; category counts {"region":9,"house":143,"place":147,"title":21,"person":206,"event":9}. In-memory checks passed for unique IDs, references, parent counts, one current head and date bounds. Full local build cannot be run because GitHub DNS is unavailable in the execution container. CI and browser review not confirmed. Further history, chapter event extraction, evidence reconciliation and comprehensive AWOIAF research remain open. No main merge.

## Milestone: Reader-facing chapter archive

Added a dedicated /chapters/ contents page with all 67 numbered chapters, direct homepage actions and a sidebar entry with a collapsible, chronologically ordered archive. Both Chapter 67 alternatives remain accessible. All chapter texts remain unchanged. The chapter index is derived from the imported chapter inventory; update it when new chapters are added. Preview deployment and browser rendering still require verification.

## Historical migration: Targaryen monarchy, royal court and Blackfyre crisis

Reconstructed the twelve official reigns from Aegon I through Daeron II with bounded tenure records; Daeron's reign remains open at the current snapshot. Added connected royal genealogy, distinguishing duplicate royal names, and the Maekar/Summerhall branch. Linked the campaign's confirmed council appointments from Worldbook v10 paragraphs 1944–1958, retaining unconfirmed grand maester and formal intelligence title. Added Blackfyre genealogy and pre-207 historical events from consulted AWOIAF pages (source IDs attached). No future rulers or post-baseline deaths imported. Reused Elaena, Rhaena, Baelor and Aerys records. Added 85 entities and 160 facts, wrote 89 article files. Core in-memory checks passed; full build remains outstanding. Regional dynasty and vassal research remains incomplete. No main merge.

## Historical migration: Regional dynasties and Blackfyre allegiances

Extended historical profiles for Stark, Arryn, Tully, Lannister, Greyjoy and Martell from inspected AWOIAF house histories. Recorded source-backed historical kinships, historical regional and seat associations for selected houses; deliberately separated these from confirmed 207/208 holdings. Added the 134 AC Arryn succession dispute and the published 196 AC allegiance inventory, including divided or changing allegiances. Do not infer the allegiance of an entire house from a single rebel knight. Exact accession dates and holders are not extrapolated from later events. Added 84 entities, 160 facts; current graph 704 entities/1381 facts. Structural checks passed. Exhaustive pre-207 research and visual/build confirmation remain open. No main merge.

## Historical migration: History index and dated landmarks

Added five conflicts and two royal landmarks, with a /history/ landing page containing 12 reigns and 16 pre-207 event articles. Corrected 12 invalid source IDs in Crownlands records; reference and source integrity checks passed. Total 711 entities and 1395 facts. Remaining: comprehensive historical and regional source audit, additional dynasties and pre-207 people/places/events, complete office successions, technical build and visual review. No main merge.

## Historical migration: Royal office successions

Added source-checked historical Hands, Kingsguard commanders and a separate Queensguard command for Rhaenyra. The first Ser Corlys Velaryon is distinguished from the Sea Snake; Lord Jon Hightower's historical identity is left unresolved. Exact-year ranges use the existing year-granularity tenure model; single-year and incomplete terms are retained as former office references rather than invented exact intervals. Retained Baelor and Willem Wylde as the sole current holders. Added 30 historical character routes and one office route, enriched two office articles and linked them from the history index. Graph: 742 entities / 1439 facts. In-memory ID, provenance, date-bound, link and current-holder checks passed; full build not verified. No main merge.

## Historical migration: Gardener, Durrandon and southern dynasties

Added two former royal houses, historical Tyrell, Baratheon and Hightower lineages, and four pre-207 event profiles. Kept campaign relationships distinct and did not infer Davos as Rogar's father or Lord Jon's descent from Ormund. Preserved existing household prose; added references and regional history. Graph 775 entities and 1491 facts (+33 / +52). In-memory ID, source, relationship and date checks passed. Full build remains unverified. No main merge.

## Historical migration: ten regional and royal research packages

Incremental expansion from retrieved AWOIAF historical passages. Current-day canon and post-207 developments excluded; no complete pedigree or exact ancient date invented. Existing campaign prose preserved.

- Reach: +6 entities, +6 facts.
- Stormlands: +4 entities, +3 facts.
- North: +6 entities, +2 facts.
- Vale: +8 entities, +6 facts.
- Riverlands: +18 entities, +15 facts.
- Westerlands: +8 entities, +7 facts.
- Dorne: +11 entities, +19 facts.
- Iron Islands: +5 entities, +6 facts.
- Crownlands: +5 entities, +11 facts.
- Royal origins and Stepstones: +4 entities, +5 facts.

Total 850 entities, 1571 facts, 112 sources. Nine regional pages and the history index updated. In-memory ID, reference, provenance, parent-count, interval and newly authored article checks passed. This is not exhaustive AWOIAF coverage. Build and browser review remain unverified. No main merge.

## Worldbook v10 migration: geography, offices and corrected successions

Read Worldbook v10's 1,995-paragraph document and extracted established facts from the standing domain, office and Ashford-era sections. Corrected Florent succession, added Footly, Tarly, Tarth and Estermont details, six Reach offices, river and mill geography and settlement profiles. Preserved speculative and private material outside the import. Remaining: Cider Hall register discrepancy, systematic register and chapter audit, further kinship reconciliation. Structural in-memory checks passed, full build not verified. Total 887 entities, 1622 facts. No main merge.

### Worldbook register cross-check

Compared all 139 imported register rows (60 Stormlands, 79 Reach) with the graph using the atlas script's assertions: source lines, rank, region, seat and unassigned holdings pass. Added the late addendum's Cider Hall/Fossoway and Steffon/Raymun separately without inventing grid position or changing the original 139-row register. Reconciled Raynard's biography with Aladore's succession. Total 891 entities and 1628 facts. Atlas assertions reproduced in memory; actual npm/Astro execution remains unverified. No main merge.
