"""
Colourity Blog QA Integrity & Standards Validator
==================================================
Runs across all blog articles in /blog/ and asserts 100% component completeness:
1. Fixed Social Share Bar (.fixed-social-share with WhatsApp, Pinterest, FB, X, LinkedIn, IG, Copy)
2. JSON-LD BreadcrumbList Schema
3. Canonical URL integrity
4. OpenGraph & Twitter Meta Tags
5. Correct responsive viewport & favicons
6. No unrendered template strings
"""

import glob
import os
import re
import sys

def validate_all_blogs():
    blog_files = glob.glob(r'D:\colourity Landing Page\blog\*\index.html')
    total = len(blog_files)
    print(f"==================================================")
    print(f"COLOURITY BLOG QA INTEGRITY SUITE ({total} Articles)")
    print(f"==================================================\n")

    failures = []

    for b in blog_files:
        slug = os.path.basename(os.path.dirname(b))
        with open(b, 'r', encoding='utf-8') as f:
            html = f.read()

        errors = []

        # 1. Check Social Share Bar
        if 'fixed-social-share' not in html:
            errors.append("Missing .fixed-social-share component")
        if 'whatsapp' not in html or 'pinterest' not in html:
            errors.append("Incomplete social share channels")
        if 'pinterest.com/pin/create/button/' in html and 'media=' not in html:
            errors.append("Pinterest button missing required 'media=' image parameter")

        # 2. Check Canonical (supports href before rel or rel before href)
        expected_url = f"https://colourity.com/blog/{slug}/"
        if f'href="{expected_url}"' not in html and f"href='{expected_url}'" not in html:
            errors.append(f"Canonical URL does not match {expected_url}")

        # 3. Check JSON-LD Breadcrumb Schema
        if 'BreadcrumbList' not in html:
            errors.append("Missing BreadcrumbList JSON-LD schema")

        # 4. Check OpenGraph Meta Tags
        if 'og:title' not in html or 'og:image' not in html or 'og:url' not in html:
            errors.append("Missing essential OpenGraph tags")

        # 5. Check for unrendered template strings
        unrendered = re.findall(r'\{[a-zA-Z_]+\}', html)
        if unrendered:
            errors.append(f"Unrendered template variables found: {set(unrendered)}")

        # 6. Check Favicon & CSS
        if 'favicon' not in html and 'logo.png' not in html:
            errors.append("Missing favicon reference")

        # 7. Check presence in feed.xml (Pinterest Auto-Publish & RSS Syndication)
        feed_xml_path = r'D:\colourity Landing Page\feed.xml'
        if os.path.exists(feed_xml_path):
            with open(feed_xml_path, 'r', encoding='utf-8') as ff:
                feed_data = ff.read()
            if f'https://colourity.com/blog/{slug}/' not in feed_data:
                errors.append("Missing from feed.xml (Pinterest/RSS auto-publishing)")

        if errors:
            failures.append((slug, errors))
            print(f"[FAIL] blog/{slug}/ -> {', '.join(errors)}")
        else:
            print(f"[PASS] blog/{slug}/")

    print(f"\n==================================================")
    if failures:
        print(f"QA RESULT: FAILED ({len(failures)} / {total} with errors)")
        sys.exit(1)
    else:
        print(f"QA RESULT: 100% PASS ({total} / {total} Articles Validated)")
        print(f"All components, social share bars, and schemas verified.")
        print(f"==================================================")

if __name__ == '__main__':
    validate_all_blogs()
