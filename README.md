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

## 🚨 Sample Issues Detected

```html
<!-- ❌ Missing accessible name -->
<a class="featured-link" href="https://www.orchestry.com/resources/orchestry-features-sheet/?hsLang=en"></a>

<!-- ❌ Missing alt text -->
<img src="https://www.orchestry.com/hubfs/Logo%20-%20Teck-min.png" alt="" class="logo">

<!-- ❌ Empty heading -->
<h1></h1>

<!-- ❌ Broken link (404) -->
https://www.orchestry.com/guide/microsoft-365-copilot-guide-for-executives?hsLang=en
```

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

## 💬 Next Steps (Optional)
- Integrate this suite into a GitHub Action or CI pipeline
- Add visual regression or Lighthouse score monitoring
- Add axe-core for WCAG 2.1 audit depth

---

> Created as part of a project pitch for Orchestry's SDET Co-op opportunity.
