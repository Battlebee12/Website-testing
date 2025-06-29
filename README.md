# 🧪 Orchestry Website Accessibility & Performance Testing

## ✅ Overview
This project showcases a set of automated tests I created for [orchestry.com](https://www.orchestry.com) to assess **accessibility**, **SEO health**, and **performance bottlenecks** using [Playwright](https://playwright.dev).

The suite targets real issues that could impact usability, compliance, and user experience — based on actual Lighthouse audit results.

---

## 🔍 Tools Used
- [Playwright](https://playwright.dev) — Browser automation framework
- TypeScript — Strongly typed scripting
- `chalk` — For styled, readable terminal logs

---

## 📋 Tests Implemented

| Test | What It Checks | Result |
|------|----------------|--------|
| **Accessible Names** | `<button>`, `<a>`, and `[role=button]` must have a visible or ARIA label | ❌ Found unnamed links
| **Alt Text** | All `<img>` elements must have non-empty `alt` attributes | ❌ One logo missing alt
| **Focusable Elements** | Verifies keyboard focusability for interactive elements | ✅ Passed
| **Empty Headings** | No `<h1>`–`<h6>` should be empty | ❌ Found empty `<h1>`
| **Skip Link** | Ensures there's a way to skip to main content | ✅ Present
| **Broken Links** | All internal links should return status < 400 | ❌ 1 link returned 404
| **Image Size Tags** | `<img>` elements must include `width` and `height` | ❌ Hero image missing dimensions
| **DOM Size** | Warns if DOM has >1200 elements | ⚠️ 1150 elements found
| **CSS Rule Count** | Warns if CSS rule count > 5000 | ⚠️ 6088 rules found
| **Large Assets** | Any assets > 300KB are flagged | ✅ All assets within limit
| **JS Errors** | Captures runtime JS console errors | ✅ No JS errors

---

## 🚨Detailed analysis of Issues 

Running 13 tests using 1 worker

  ✘  1 tests\assesibility.spec.ts:13:5 › Buttons and links should have accessible names (6.5s)     

🔎 Running Accessibility Tests...


🔍 Checking accessible names on buttons and links...

❌ [Accessibility] Element missing accessible name:
<a class="featured-link" href="https://www.orchestry.com/resources/orchestry-features-sheet/?hsLang  ✘  2 tests\assesibility.spec.ts:33:5 › All images should have non-empty alt text (2.8s)
     2 tests\assesibility.spec.ts:33:5 › All images should have non-empty alt text

🔎 Running Accessibility Tests...


🔍 Checking <img> alt text...

🖼️ [Accessibility] Image missing alt text:
<img src="https://www.orchestry.com/hubfs/Logo%20-%20Teck-min.png" alt="" class="logo">
  ✓  3 tests\assesibility.spec.ts:53:5 › All interactive elements should be focusable (4.5s)       

🔎 Running Accessibility Tests...


🔍 Checking focusability of interactive elements...

  ✘  4 tests\assesibility.spec.ts:75:5 › No empty headings (h1-h6) (2.0s)

🔍 Checking for empty heading tags...

⚠️ [Accessibility] Empty heading tag found:
<h1></h1>
  ✓  5 tests\assesibility.spec.ts:95:5 › Page should have a skip link for accessibility (2.7s)     

🔎 Running Accessibility Tests...


🔍 Checking for skip link...

  ✓  6 tests\dom-health.spec.ts:11:5 › Page should not have excessive DOM size (1.8s)              

🔎 Running Dom-health Tests...

🌐 DOM Element Count: 1150
  ✘  7 tests\dom-health.spec.ts:19:5 › Page should not have excessive CSS rules (1.8s)
📏 CSS Rules Count: 6088
  ✓  8 tests\dom-health.spec.ts:36:5 › Page should not have excessive inline styles (2.6s)         

🔎 Running Dom-health Tests...

📐 Inline Styles Count: 98
  ✘  9 tests\links.spec.ts:10:5 › All internal links return 200 (7.8s)

🔎 Running Link Tests...

  ✘  10 …edia-size.spec.ts:10:5 › All <img> elements should have width and height attributes (2.8s)

🔎 Running Media-size Tests...

🖼️ Missing width/height on:
 <img class="hero-image" src="https://www.orchestry.com/hubfs/Orchestry%20-%20Hero%20Platform%20001.svg" width="600" alt="Orchestry - Hero Platform 001">
  ✓  11 tests\media-size.spec.ts:28:5 › No individual asset should be too large (3.3s)

🔎 Running Media-size Tests...

  ✓  12 tests\orchestry-home.spec.ts:11:5 › Orchestry homepage should load and have title (1.9s)   

🔎 Running home Tests...

  ✓  13 tests\orchestry-home.spec.ts:24:5 › Page should not have excessive JavaScript errors (6.8s)
📉 JavaScript Errors: 0

---

## 🧠 Value to Orchestry
- Helps **prevent regressions** by catching accessibility and performance issues in CI
- Improves **user experience**, especially for keyboard and screen reader users
- Addresses **SEO blockers** such as crawl errors and broken links
- Enhances compliance with **WCAG** and **Lighthouse** metrics

---

## ▶️ How to Run the Tests

```bash
# Install dependencies
npm install

# Run all tests
npx playwright test

# View report in browser
npx playwright show-report
```

---

## 📂 Test Organization

```
tests/
├── assesibility.spec.ts       # Accessible names, alt text, headings, skip link
├── media-size.spec.ts         # Image dimensions, large asset detection
├── dom-health.spec.ts         # DOM size, inline styles, CSS rule count
├── links.spec.ts              # Internal link status
├── orchestry-home.spec.ts     # Sanity checks, JS errors, page load
```


---

> Created as part of a project pitch for Orchestry's SDET Co-op opportunity.
