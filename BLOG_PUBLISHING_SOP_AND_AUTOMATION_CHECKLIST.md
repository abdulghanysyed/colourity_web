# Colourity Blog Publishing SOP & Automation Checklist

This document establishes the **mandatory Standard Operating Procedure (SOP)** and automated verification pipeline for all future blog posts on Colourity.

---

## 🔒 The 7 Mandatory Checks for Every New Blog Article

Whenever a new blog article is created under `/blog/[slug]/`, it must satisfy all 7 requirements before deployment:

| # | Checkpoint | Requirement | Automated Verification Tool |
| :---: | :--- | :--- | :--- |
| **1** | **Floating Social Share Bar** | Must contain `<div class="fixed-social-share">` with all 7 channels (WhatsApp, Instagram, Pinterest, Facebook, X, LinkedIn, Native Share). | `scripts/qa_blog_integrity.py` |
| **2** | **Pinterest Pin Asset (2:3)** | Must include high-res $1000 \times 1500$ px `pinterest_pin.png` in article folder for Pinterest rich pin extraction. | `scripts/qa_blog_integrity.py` |
| **3** | **OpenGraph Card (1.91:1)** | Must include $1200 \times 628$ px `fb_share.png` in article folder for WhatsApp, Twitter, and LinkedIn previews. | `scripts/qa_blog_integrity.py` |
| **4** | **Pinterest RSS Feed Entry** | Must be indexed in [`feed.xml`](file:///D:/colourity%20Landing%20Page/feed.xml) with `<enclosure url=".../pinterest_pin.png" type="image/png"/>` for auto-publishing. | `scripts/publish_blog.py` |
| **5** | **Sitemap.xml Inclusion** | Canonical URL must be added to [`sitemap.xml`](file:///D:/colourity%20Landing%20Page/sitemap.xml). | `scripts/publish_blog.py` |
| **6** | **JSON-LD Breadcrumbs** | Must include standard 3-tier `BreadcrumbList` schema (`Home` → `Blog` → `Article Title`). | `scripts/qa_blog_integrity.py` |
| **7** | **Search Engine Push** | Automatically submit batch to IndexNow gateways (Bing, Yandex, Seznam, Naver). | `scripts/submit_to_search_engines.py` |

---

## ⚙️ Automated 1-Command Workflow for New Articles

To prevent human error and ensure that no blog post is ever published with missing Pinterest pins or social share buttons, run:

```bash
python scripts/publish_blog.py
```

### What `scripts/publish_blog.py` executes automatically:
1. Scans all blog folders in `/blog/`.
2. Syncs every article into [`feed.xml`](file:///D:/colourity%20Landing%20Page/feed.xml) with correct Pinterest image enclosures.
3. Syncs all URLs into [`sitemap.xml`](file:///D:/colourity%20Landing%20Page/sitemap.xml).
4. Runs [`scripts/qa_blog_integrity.py`](file:///D:/colourity%20Landing%20Page/scripts/qa_blog_integrity.py) to validate 100% component completeness.

---

## 🔍 Pre-Deployment QA Checklist

Before committing changes to Git, run the integrity suite:

```bash
python scripts/qa_blog_integrity.py
```

Expected Output:
```text
==================================================
COLOURITY BLOG QA INTEGRITY SUITE (44 Articles)
==================================================
[PASS] blog/...
...
QA RESULT: 100% PASS (44 / 44 Articles Validated)
All components, social share bars, and schemas verified.
==================================================
```
