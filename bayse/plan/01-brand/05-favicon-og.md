# 05 — Favicon & OG Images

> Status: 🔴 Pending — depends on logo finalization

## Favicon

| Size | Format | Usage |
|------|--------|-------|
| 16x16 | .ico / .png | Browser tab |
| 32x32 | .png | Browser tab (retina) |
| 180x180 | .png | Apple touch icon |
| 192x192 | .png | Android home screen |
| 512x512 | .png | PWA splash screen |
| SVG | .svg | Modern browsers |

---

## OG (Open Graph) Images

### Default OG Image
<!-- The image shown when someone shares notradar.com with no specific page -->

**Dimensions:** 1200 x 630 px
**Format:** PNG or JPG
**Preview:**
_TBD_

### Market-Specific OG Template
<!-- Dynamic template for individual market pages -->

**Elements:**
- Notradar logo (top-left corner)
- Market question text
- Current odds / price
- Brand gradient background

**Preview:**
_TBD_

### Twitter Card

**Card type:** `summary_large_image`
**Dimensions:** 1200 x 628 px
**Preview:**
_TBD_

---

## OG Meta Tags Template

```html
<!-- Default -->
<meta property="og:title" content="Notradar — [Tagline]" />
<meta property="og:description" content="[Brand description]" />
<meta property="og:image" content="https://notradar.com/og-default.png" />
<meta property="og:type" content="website" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Notradar — [Tagline]" />
<meta name="twitter:description" content="[Brand description]" />
<meta name="twitter:image" content="https://notradar.com/og-default.png" />
```
