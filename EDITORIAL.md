# Orryn editorial working notes

These are repository maintenance rules, **not part of the published encyclopedia**. Keep source notes and project status out of the website.

## Public writing voice

Write about Westeros and its inhabitants as encyclopedia subjects. Do not refer to the "Orryn game", campaign documents, source versions, drafts, migration, approval, internal process, missing records, or the calculation of a birth date within a public article. For incomplete data, present only the supported fact, with "c." for approximate dates when warranted; omit genuinely unknown details rather than discussing their absence. Do not turn proposed or future events into accomplished ones. Maintain source references internally.

## Source tracking

The published wiki can omit public bibliographies, but its claims must still be supported by dated primary campaign documents, approved chapters and historical ASOIAF material. The source links below are available to editors for fact checks; avoid accidentally publishing private planning notes or spoilers.

## Publication language

All public-facing content of The Orryn Chronicles is written in **English only**, including navigation labels, article headings, infoboxes, captions, timelines, reference notes, and future chapter imports. Source material in other languages should be translated into English rather than displayed bilingually.

## Source hierarchy

1. **Approved Orryn chapters** establish what happens in the played story.
2. **Current Orryn worldbook and household records** establish the starting situation and internal reference details, subject to reconciliation against the chapters.
3. **Published ASOIAF source material** supplies historical background up to the game's divergence point, where compatible with the game's established continuity.
4. **A Wiki of Ice and Fire** is a useful secondary reference and finding aid. Its summaries are checked where possible rather than being automatically adopted.

## Encyclopedia article standards

- **Character pages:** show `Born` prominently, followed by `Age` when helpful. Use a source-documented day, month and year only if established. Otherwise give an appropriately qualified approximate birth year (for example, *c. 154–155 AC*) or *Birth date unknown*, never invent a precise date. If an age is reported, identify the year or source state to which it applies.
- **House pages:** include a family tree for the established branch, clearly distinguishing spouses, children, siblings and proposed betrothals. Unknown relations remain unfilled.
- **Sworn houses:** use a simple, directly scannable list of houses and seats, classified by their source-defined rank when helpful. Do not infer vassalage from friendship, marriage, residence or military cooperation.
- **Writing:** favor coherent historical prose and a small number of substantive headings. Avoid repeating the infobox in separate sections or making headings merely to accommodate a sentence.
- **Time:** distinguish the historical starting situation from later approved developments. A proposed match should not appear as a marriage until it has occurred in the accepted chronology.

## Status of claims

Articles distinguish **confirmed events**, **character beliefs and rumours**, **proposals and ambitions**, and **unresolved questions**. Later book-canon events are not presumed inevitable in this alternative timeline.

## Copyright and attribution

Historical facts may be researched and summarized independently. A Wiki of Ice and Fire is a fan-maintained reference; text reused from it must meet its applicable Creative Commons attribution/share-alike conditions, and images require separate rights checks.

Source: [A Wiki of Ice and Fire](https://awoiaf.westeros.org/). No wholesale import of wiki text or illustrations has been performed in this prototype.

## Migration safeguards

- Preserve unmodified backups of supplied originals.
- Record source document and chapter for each pivotal game fact.
- Flag contradictions instead of silently selecting an interpretation.
- Never convert a proposed future event into established history.
- Do not publish private game-master notes or secret future plans inadvertently.

The starting year and the complete source-document inventory remain to be verified.

## House and place presentation

Every published **noble house page** must display its sigil prominently in a consistent right-hand infobox, alongside its blazon (arms), seat, region, head, overlord and **Words**. Use the correct published or established campaign words; when no words have been established, show `Unknown` rather than inventing a motto. For heraldic images, use a local original vector based on the confirmed blazon or a properly licensed source; never misrepresent a generic sigil as the house's arms. The sigil represents a coat of arms, not the house words. Keep extended historical narratives in prose, and use a clear family tree and a simple list of vassal houses.

Every **place page** should have a consistent infobox specifying its type, region, location, ruling house and other independently established facts. Illustrations of castles should not invent architecture; using the known ruling house's sigil as a family emblem is fine. Link a house's Seat field to its location page and the location's ruling-house field back to the house page.

House Rowan and Goldengrove use the same unchanged SVG artwork by Abjiklam from [A Wiki of Ice and Fire](https://awoiaf.westeros.org/index.php/File:House_Rowan.svg), licensed under [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/). The artist and license are credited next to the artwork. The source image is linked directly at `https://awoiaf.westeros.org/images/9/9e/House_Rowan.svg`; this external link should eventually be replaced with a local unmodified copy to avoid hotlink dependencies. Do not substitute another drawing without indicating it is an alternative rendition.

## Heraldry credits for initial house cluster

- **Rowan:** [House Rowan.svg](https://awoiaf.westeros.org/index.php/File:House_Rowan.svg) by Abjiklam, CC BY-SA 3.0; displayed unchanged.
- **Grandison:** [House Grandison.svg](https://awoiaf.westeros.org/index.php/File:House_Grandison.svg) by Lord Evermore, CC BY-SA 3.0; displayed unchanged.
- **Meadows:** [House Meadows.svg](https://awoiaf.westeros.org/index.php/File:House_Meadows.svg) by Abjiklam, CC BY-SA 3.0; displayed unchanged.

The raw artwork is linked from AWOIAF's MediaWiki image store; credits are placed beneath each use. Future migration to locally hosted, unmodified copies is desirable for reliability. The canonical file paths use MediaWiki's image hashes: 9/9e Rowan, 2/2a Grandison, f/f6 Meadows.

Households refer to the **208 AC** continuity. Public character information must not reveal a private plot fact merely because it exists in the Householdbook; in particular, omit unplayed personal secrets and proposed distant future outcomes. Chapter text takes precedence over older family-state notes (e.g., Elenei's actual marriage and Mina's established identity).

## Character article presentation

All character articles use the same in-world structure:

1. A concise introductory identification and a right-side biographical infobox with the available **Born**, **Age**, house, position or title, residence, parents, spouse, children and betrothal where pertinent. Use the correct distinction between hereditary seat and current residence.
2. **Appearance**, only if the chapters or household sources establish a physical description; do not invent one to complete a template.
3. **Character**, with substantive prose explaining traits and contrasting conduct rather than merely listing virtues and faults.
4. **Family**, with established relatives and a **Family tree** subsection. Trees should use names alone, with meaningful connectors for siblings, marriages and descent; dashed lines distinguish betrothals from marriages. The current subject is visually highlighted and known character names are clickable. Do not add unnamed ancestors merely to close an incomplete tree.
5. **History**, grounded in the chronology of actual events. Main protagonists and substantial political figures generally support longer histories than minor relatives. Never pad entries with stock character detail or project notes.

The pilot house diagrams are repeated in the published character articles with individual highlighting. Before adding many more families, factor these into a reusable renderer or a maintained generation step so all instances remain synchronized.
