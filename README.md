#  Orchestry Website Accessibility & Performance Testing

##  Overview
This project showcases a set of automated tests I created for [orchestry.com](https://www.orchestry.com) to assess **accessibility**, **SEO health**, and **performance bottlenecks** using [Playwright](https://playwright.dev).

The suite targets real issues that could impact usability, compliance, and user experience — based on actual Lighthouse audit results.

---

##  Tools Used
- [Playwright](https://playwright.dev) — Browser automation framework
- TypeScript — Strongly typed scripting
- `chalk` — For styled, readable terminal logs

---

##  Tests Implemented

| Test | What It Checks | Result |
|------|----------------|--------|
| **Accessible Names** | `<button>`, `<a>`, and `[role=button]` must have a visible or ARIA label |  Found unnamed links
| **Alt Text** | All `<img>` elements must have non-empty `alt` attributes |  One logo missing alt
| **Focusable Elements** | Verifies keyboard focusability for interactive elements | ✅ Passed
| **Empty Headings** | No `<h1>`–`<h6>` should be empty |  Found empty `<h1>`
| **Skip Link** | Ensures there's a way to skip to main content | ✅ Present
| **Broken Links** | All internal links should return status < 400 |  1 link returned 404
| **Image Size Tags** | `<img>` elements must include `width` and `height` |  Hero image missing dimensions
| **DOM Size** | Warns if DOM has >1200 elements | ⚠️ 1150 elements found
| **CSS Rule Count** | Warns if CSS rule count > 5000 | ⚠️ 6088 rules found
| **Large Assets** | Any assets > 300KB are flagged | ✅ All assets within limit
| **JS Errors** | Captures runtime JS console errors | ✅ No JS errors

---

###  Sample Test Output

```bash
Running 13 tests using 1 worker
```

####  Accessibility Tests
```bash
✘ Buttons and links should have accessible names (3.7s)
❌ [Accessibility] Element missing accessible name:
<a class="featured-link" href="https://www.orchestry.com/resources/orchestry-features-sheet/?hsLang=en"></a>

✘ All images should have non-empty alt text (3.1s)
🖼 [Accessibility] Image missing alt text:
<img src="https://www.orchestry.com/hubfs/Logo%20-%20Teck-min.png" alt="" class="logo">

✓ All interactive elements should be focusable (5.0s)

✘ No empty headings (h1-h6) (3.1s)
⚠️ [Accessibility] Empty heading tag found:
<h1></h1>

✓ Page should have a skip link for accessibility (3.0s)
```

####  DOM Health Tests
```bash
✓ Page should not have excessive DOM size (3.0s)
 DOM Element Count: 1150

✘ Page should not have excessive CSS rules (3.0s)
 CSS Rules Count: 6088

✓ Page should not have excessive inline styles (3.0s)
 Inline Styles Count: 98
```

####  Link Tests
```bash
✘ All internal links return 200
❌ [Link Error] https://www.orchestry.com/guide/microsoft-365-copilot-guide-for-executives?hsLang=en returned status 404
 Test crashed: ExpectError: expect(received).toBeLessThan(expected)
```

####  Media-size Tests
```bash
✘ All <img> elements should have width and height attributes (3.3s)
🖼 Missing width/height on:
<img class="hero-image" src="https://www.orchestry.com/hubfs/Orchestry%20-%20Hero%20Platform%20001.svg" width="600" alt="Orchestry - Hero Platform 001">

✓ No individual asset should be too large (3.9s)
```

####  Home Page Sanity Tests
```bash
✓ Orchestry homepage should load and have title (2.9s)
✓ Page should not have excessive JavaScript errors (7.9s)
 JavaScript Errors: 0
```

---


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
