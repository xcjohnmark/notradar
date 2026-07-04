# 03 — Typography

> Status: 🟢 Defined — font selections locked

## Font Stack

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| **Headings & Body** | [Satoshi](https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap) | 300, 400, 500, 700, 900 | Page titles, section headers, body text, UI labels, buttons |
| **Monospace / Data** | [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) | 400, 500, 700 | Prices, odds, percentages, wallet addresses, data tables, code |

### Fallback Stacks

```css
/* Primary */
--font-primary: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;

/* Monospace */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
```

---

## Type Scale

| Token | Size | Line Height | Weight | Font | Usage |
|-------|------|-------------|--------|------|-------|
| `--text-display` | 48px / 3rem | 1.1 | 900 (Black) | Satoshi | Hero headlines, landing page |
| `--text-h1` | 36px / 2.25rem | 1.2 | 700 (Bold) | Satoshi | Page titles |
| `--text-h2` | 28px / 1.75rem | 1.25 | 700 (Bold) | Satoshi | Section headers |
| `--text-h3` | 22px / 1.375rem | 1.3 | 500 (Medium) | Satoshi | Card titles, sub-sections |
| `--text-h4` | 18px / 1.125rem | 1.35 | 500 (Medium) | Satoshi | Small headers, labels |
| `--text-body-lg` | 18px / 1.125rem | 1.6 | 400 (Regular) | Satoshi | Featured descriptions |
| `--text-body` | 16px / 1rem | 1.6 | 400 (Regular) | Satoshi | Default body text |
| `--text-body-sm` | 14px / 0.875rem | 1.5 | 400 (Regular) | Satoshi | Captions, meta, secondary text |
| `--text-caption` | 12px / 0.75rem | 1.4 | 400 (Regular) | Satoshi | Timestamps, fine print |
| `--text-data-lg` | 24px / 1.5rem | 1.2 | 700 (Bold) | JetBrains Mono | Large prices, hero stats |
| `--text-data` | 16px / 1rem | 1.4 | 500 (Medium) | JetBrains Mono | Prices, odds, percentages |
| `--text-data-sm` | 14px / 0.875rem | 1.4 | 400 (Regular) | JetBrains Mono | Table data, small numbers |
| `--text-data-xs` | 12px / 0.75rem | 1.3 | 400 (Regular) | JetBrains Mono | Dense data, tickers |

---

## Weight Usage Guide

| Weight | Name | When to use |
|--------|------|-------------|
| 300 | Light | Subtle text, decorative, large display sizes only |
| 400 | Regular | Body text, descriptions, default weight |
| 500 | Medium | UI labels, buttons, card titles, emphasis |
| 700 | Bold | Headings, CTAs, important values, prices |
| 900 | Black | Display/hero text only — use sparingly |

---

## Font Loading

- **Satoshi source:** [Fontshare](https://www.fontshare.com/fonts/satoshi) (free for commercial use)
- **JetBrains Mono source:** [Google Fonts](https://fonts.google.com/specimen/JetBrains+Mono) (open source)
- **Loading strategy:** `font-display: swap` for both
- **Preload:** Primary weights (400, 500, 700) for Satoshi; 400, 500 for JetBrains Mono

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/Satoshi-Variable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/JetBrainsMono-Variable.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Typography Do's and Don'ts

- ✅ Use Satoshi for ALL text except numerical data and code
- ✅ Use JetBrains Mono for prices, odds, percentages, addresses, and data tables
- ✅ Use tabular numerals (`font-feature-settings: "tnum"`) in data columns for alignment
- ✅ Keep body text at 16px minimum for readability
- ✅ Use Medium (500) weight for UI labels and buttons, not Bold
- ❌ Don't use Light (300) weight below 24px — too thin to read
- ❌ Don't use Black (900) weight for anything smaller than display text
- ❌ Don't mix more than 3 weights on a single screen
- ❌ Don't use Satoshi for data tables — numbers won't align properly
