# Encyclopedia article model

**All public articles use a single system.** There is one shared identity panel and a stable category-specific editorial outline. Source material determines which optional sections appear. Missing details remain absent rather than becoming invented facts.

The rendered identity panel is `<ArticleIdentity entityId="..."/>`, and all facts come from `src/data/knowledge`. This replaces the older handwritten infobox HTML. Character and noble-house articles additionally use `<KnowledgeFamilyTree personId="..."/>` or `<KnowledgeFamilyTree houseId="..."/>`. The original extended SVG diagrams are preserved in Git history as a source for later genealogical reconciliation, not displayed beside the shared component.

## Character

At top: summary, then the shared identity panel.

Canonical sections, in order when source material exists:
- Appearance and character
- Family (with a generated family tree)
- History

The biography should not fill gaps with generic characterization. The article's history may include specific subheadings if it is long.

## Noble house

At top: house summary and shared identity panel.

Canonical sections:
- History
- Family (generated family tree)
- Lordship and household (vassals, officers, court, sworn houses)
- Events in 208 AC

## Place

At top: description and shared identity panel.

Canonical sections:
- Description (castle, surroundings, trade, physical setting)
- History
- Lordship
- Events in 208 AC

## Region

Canonical sections:
- Geography
- History and government
- Houses and places

## Historical event

Canonical sections:
- Background
- Account
- Consequences

Use only verified facts from played chapters and approved records. The event's chronological identity is maintained independently of its participants and outcomes.

## Implementation and quality gate

All encyclopedia articles under `characters`, `houses`, `places`, `realm`, and `events` are MDX. Use the same stable `entityId` that appears in `entities.json`, and never add standalone handcrafted infoboxes or genealogical SVGs. A new person or house must have a structured record and source provenance before publication.

Run `npm run validate:articles`, `npm run validate:knowledge`, `npm run audit:atlas`, and `npm run build` before merging. CI enforces these conditions on the development branch.

If a known relationship is depicted only in a legacy diagram, migrate it into a source-backed fact before claiming complete data parity. An identical layout does not guarantee that every historical relationship has been recovered.
