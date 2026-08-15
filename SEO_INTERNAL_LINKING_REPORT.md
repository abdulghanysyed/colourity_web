# Colourity SEO Phase 2 — Internal Linking Report

Date: 2026-08-14
Scope: Internal linking only. No URLs, titles, meta descriptions, canonicals, schema, headings, images, or existing article copy were changed.

---

## 1. Pages audited

Audited directly from the live codebase (not assumed from the brief):

- Homepage (`/`)
- 4 pillar pages: `/color-analysis/`, `/digital-wardrobe/`, `/outfit-planner/`, `/scan-before-you-buy/`
- 44 blog posts under `/blog/*/`
- 1 standalone article outside `/blog/`: `/how-to-choose-right-color-outfit-for-your-face/`

**Total content pages in the linking graph: 49** (4 pillars + homepage + 44 blog posts + 1 standalone article).

### Important finding #1 — the brief's assumed blog list didn't exist at audit start, then appeared mid-task

The brief named six specific blog URLs to verify:

- `/blog/i-have-clothes-but-nothing-to-wear/`
- `/blog/why-do-my-outfits-look-bad-together/`
- `/blog/how-to-create-outfits-from-clothes-you-already-own/`
- `/blog/how-to-choose-clothes-for-my-skin-tone/`
- `/blog/how-do-i-know-what-colors-suit-me/`
- `/blog/what-colors-go-together-in-clothing/`

At the start of this audit, **none of these existed** — the live blog had 38 posts, none matching those slugs. Mid-implementation, a repo sync revealed that these exact 6 posts (plus a substantial rewrite of all 4 pillar pages and the stylesheet) had been published separately and pushed to the repository while this audit was in progress. The initial link plan — built against the 38-post snapshot — was discarded, the affected pillar and blog files were restored to their correct, current committed state, and the full classification, link generation, and QA passes were re-run against the accurate 44-post inventory. The numbers in this report reflect that corrected, final state.

---

## 2. Topic clusters (based on real content)

| Cluster | Primary pillar | Real post count |
|---|---|---|
| Personal Colour Analysis | `/color-analysis/` | 30 |
| AI Outfit Planning | `/outfit-planner/` | 11 |
| Digital Wardrobe | `/digital-wardrobe/` | 4 |
| Scan Before You Buy | `/scan-before-you-buy/` | 1 |

The 6 newly-found posts shifted this distribution meaningfully — they are near-exact matches for the Outfit Planner and Digital Wardrobe clusters (e.g. "I Have Clothes but Nothing to Wear" → Digital Wardrobe primary; "Why Do My Outfits Look Bad Together" and "How to Create Outfits From Clothes You Already Own" → Outfit Planner primary), which is why those two clusters grew relative to the first pass. Colour Analysis is still the largest cluster by a wide margin, and Scan Before You Buy remains thin — see Section 9.

Each post also carries an optional **secondary cluster** where genuinely relevant (e.g. a festive-outfit colour guide is Colour Analysis-primary but Outfit Planner-secondary, since it's also about assembling a look).

---

## 3. Before vs after internal-link count

| Link type | Before | After |
|---|---|---|
| Blog → Pillar (contextual) | 0 | 76 |
| Blog → Blog (related reading) | 0 | 135 (45 posts × 3 siblings) |
| Pillar → Blog ("Related Masterclass Guides") | 13 links (1 duplicate post across pillars) | 26 links (curated, not exhaustive) |
| Orphaned blog posts (zero inbound links from any pillar or related-reading list) | 44 (every post) | 0 |

Before this pass, every blog post was a linking dead end: pillars linked out to a handful of posts, but no post linked back, and no post linked to any other post.

---

## 4. Links added

Two link types were added, both as genuinely contextual sentences/lists — never bare keyword insertions.

**A. Blog → Pillar contextual sentences.** Every one of the 45 content pages (44 blog posts + the standalone article) got 1–2 natural-language sentences linking to its primary pillar, and its secondary pillar where one was assigned, using varied anchor text (see Section 6). Examples:

> Source: `/blog/i-have-clothes-but-nothing-to-wear/`
> Destination: `/digital-wardrobe/`
> Anchor: "a digital wardrobe"
> Reason: this post is a direct match for the product's core value prop — not being able to see what you own.
>
> Source: `/blog/why-do-my-outfits-look-bad-together/`
> Destination: `/outfit-planner/`
> Anchor: "Colourity's AI outfit planner"
> Reason: the article diagnoses combination problems; the Outfit Planner is the direct product answer.
>
> Source: `/blog/mix-and-match-indian-outfits-already-own/`
> Destination: `/digital-wardrobe/` (secondary)
> Anchor: "a visual wardrobe inventory"
> Reason: secondary relevance — the article assumes you can see everything you own.

**B. Blog → Blog "Related reading."** Each of the 45 pages got a related-reading line linking to its 3 most topically adjacent posts. The 6 new foundational posts (why outfits look bad, nothing-to-wear, create-outfits-from-what-you-own, how-do-I-know-my-colours, choose-clothes-for-skin-tone, what-colours-go-together) were deliberately woven into 10 of the most relevant existing posts' related-reading lists (e.g. `kurta-colours-by-skin-tone` now links to `how-do-i-know-what-colors-suit-me`), since they're now the strongest head-term matches for those specific garment guides to point to.

**C. Pillar → Blog expansions.** Each pillar's existing "Related Masterclass Guides" section was extended with newly-relevant posts, prioritising the 6 new posts where they were direct primary-cluster matches:

| Pillar | Added |
|---|---|
| `/color-analysis/` | How Do I Know What Colors Suit Me?, How Do I Choose Clothes for My Skin Tone?, Is Colour Analysis Actually Legit?, Professional vs AI Colour Analysis, Does Pantone's 2026 Colour of the Year Suit You?, Palazzo & Indo-Western Suit Colour Combinations |
| `/digital-wardrobe/` | I Have Clothes But Nothing to Wear?, Monsoon-Ready Wardrobe: Fabrics & Colours That Stay Fresh |
| `/outfit-planner/` | Why Do My Outfits Look Bad Together?, How to Create Outfits From Clothes You Already Own, How to Colour Block Your Outfits |
| `/scan-before-you-buy/` | Buying Unstitched Fabric? Check the Colour First, I Have Clothes But Nothing to Wear? |

---

## 5. Pillar → Blog relationships

- `/color-analysis/` → 11 posts
- `/digital-wardrobe/` → 6 posts
- `/outfit-planner/` → 9 posts
- `/scan-before-you-buy/` → 6 posts

## 6. Blog → Pillar relationships

All 45 content pages link to their primary pillar (and secondary pillar where relevant) using rotating anchor-text pools per pillar — e.g. for Colour Analysis: "Colourity's personal colour analysis," "a quick colour analysis," "Colourity's colour analysis tool," "a personal colour palette check," "Colourity's AI colour analysis." No single exact-match anchor repeats across every instance.

## 7. Blog → Blog relationships

135 related-reading links across 45 posts (3 each). The 6 new foundational posts now sit at the center of the cluster — they're referenced from garment-specific posts (kurta, saree, office-wear, monochrome, colour-blocking, mix-and-match, capsule wardrobe, wardrobe organisation, undertone, colour season) as the natural "start here" reads, and they reference each other and the specific guides in turn.

## 8. Orphan pages found

**Found: 2** — `cloud-dancer-2026-colour-of-the-year-skin-tone` and `palazzo-suit-colour-combination-by-skin-tone` weren't selected as anyone's related-reading link and weren't yet in a pillar's list. **Fixed**: both added to `/color-analysis/`'s "Related Masterclass Guides" section. Final orphan count, verified programmatically: **0**.

## 9. Cannibalisation risks found

- **Colour Analysis cluster is still overloaded (30 of 45 posts).** Posts like `saree-colours-by-skin-tone`, `kurta-colours-by-skin-tone`, `sherwani-colours-by-skin-tone`, and `anarkali-colours-by-skin-tone` target near-identical intent ("what colour for X garment given my skin tone"). Not a new problem, and not something this phase can fix without merging or rewriting content (out of scope) — the linking now at least makes the relationship between them explicit by clustering them around the foundational posts (`whats-my-colour-season`, `warm-vs-cool-vs-neutral-undertone`, `how-do-i-know-what-colors-suit-me`).
- **Scan Before You Buy is still thin (1 true primary post: `unstitched-suit-fabric-buying-guide-skin-tone`).** The 6 new posts didn't add anything to this cluster. Recommend a follow-up content phase targeting "should I buy this" / duplicate-purchase / wardrobe-compatibility queries specifically.

## 10. Broken links found

**None.** All 237 internal links touching `/blog/`, `/color-analysis/`, `/digital-wardrobe/`, `/outfit-planner/`, or `/scan-before-you-buy/` across all 49 files resolve to a real `index.html`. No trailing-slash inconsistencies, no dev/local paths, no external-site substitutions.

## 11. SEO elements confirmed unchanged

Diffed every touched file's removed lines against `<title>`, `<meta name="description">`, `rel="canonical"`, `<h1>`, `application/ld+json` schema blocks, and Open Graph tags — **zero matches** across all 49 changed files. Navigation, footer, sitemap.xml, robots.txt, images/alt text, and existing article body copy are all untouched. The only additions are one `<section class="post-continue-exploring">` block per content page (inserted immediately before `</main>`) and additional `<li>` items in the 4 pillars' pre-existing "Related Masterclass Guides" lists.

Rendered and visually inspected a sample blog post and pillar page at 1440px — no layout breakage, no horizontal overflow; new sections match the existing design system.

## 12. Final verdict

**PASS WITH RECOMMENDATIONS**

The internal-linking structure is now genuinely two-way with zero orphan pages and zero broken links, and correctly incorporates the 6 newly-published posts that were discovered mid-audit. The two open items are content gaps, not linking defects: Colour Analysis has more near-duplicate-intent posts than is ideal, and Scan Before You Buy still has only one strong topical match. Recommend a follow-up content phase for Scan Before You Buy before any further linking pass, and consider consolidating or more sharply differentiating the most overlapping Colour Analysis garment guides.
