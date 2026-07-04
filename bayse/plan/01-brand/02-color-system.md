# 02 — Color System

> Status: 🟢 Defined — core palette decisions locked

## Design Rationale

**Primary: Electric Cyan** — Techy, data-driven, trustworthy. Perfect for a platform built on data and predictions.
**Secondary: Warm Amber/Gold** — Creates premium contrast with cyan. Adds a high-end feel for displaying top traders and premium features.
**Base: Dark Navy** — Blue-tinted dark that harmonizes with cyan primary, creating depth without the harshness of pure black.

---

## Core Palette

### Primary — Electric Cyan

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#00D4FF` | Main CTAs, key actions, active states, links |
| `--color-primary-hover` | `#33DDFF` | Hover state for primary elements |
| `--color-primary-active` | `#00B8E0` | Pressed/active state |
| `--color-primary-muted` | `rgba(0, 212, 255, 0.15)` | Subtle backgrounds, badges, chips |
| `--color-primary-glow` | `rgba(0, 212, 255, 0.25)` | Glow effects, focus rings |

### Secondary — Warm Amber / Gold

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-secondary` | `#F5A623` | Secondary actions, highlights, achievements |
| `--color-secondary-hover` | `#FFB840` | Hover state |
| `--color-secondary-active` | `#D4901E` | Pressed/active state |
| `--color-secondary-muted` | `rgba(245, 166, 35, 0.15)` | Subtle backgrounds, premium badges |

---

## Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#00E5A0` | Winning bets, profit, positive P&L, confirmations |
| `--color-success-muted` | `rgba(0, 229, 160, 0.15)` | Success backgrounds |
| `--color-error` | `#FF6B6B` | Losing bets, losses, negative P&L, errors |
| `--color-error-muted` | `rgba(255, 107, 107, 0.15)` | Error backgrounds |
| `--color-warning` | `#FFCC02` | Pending states, caution, expiring markets |
| `--color-warning-muted` | `rgba(255, 204, 2, 0.15)` | Warning backgrounds |
| `--color-info` | `#5B9BF5` | Informational tooltips, neutral updates |
| `--color-info-muted` | `rgba(91, 155, 245, 0.15)` | Info backgrounds |

---

## Surface Colors — Dark Mode (Default)

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-bg` | `#0A0E1A` | Page background |
| `--surface-card` | `#111827` | Cards, panels, sidebar |
| `--surface-elevated` | `#1A2035` | Modals, dropdowns, popovers |
| `--surface-overlay` | `rgba(10, 14, 26, 0.80)` | Backdrop overlays |
| `--border-default` | `rgba(255, 255, 255, 0.08)` | Subtle dividers, card borders |
| `--border-strong` | `rgba(255, 255, 255, 0.16)` | Input borders, active dividers |

## Surface Colors — Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-bg` | `#F8F9FC` | Page background |
| `--surface-card` | `#FFFFFF` | Cards, panels, sidebar |
| `--surface-elevated` | `#FFFFFF` | Modals, dropdowns, popovers |
| `--surface-overlay` | `rgba(0, 0, 0, 0.50)` | Backdrop overlays |
| `--border-default` | `rgba(0, 0, 0, 0.08)` | Subtle dividers, card borders |
| `--border-strong` | `rgba(0, 0, 0, 0.16)` | Input borders, active dividers |

---

## Text Colors

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| `--text-primary` | `#F1F5F9` | `#0F172A` | Headings, primary content |
| `--text-secondary` | `#94A3B8` | `#475569` | Descriptions, labels |
| `--text-muted` | `#64748B` | `#94A3B8` | Timestamps, captions, meta |
| `--text-inverse` | `#0F172A` | `#F1F5F9` | Text on colored backgrounds |
| `--text-on-primary` | `#000000` | `#000000` | Text on cyan buttons |

---

## Gradients

| Name | Value | Usage |
|------|-------|-------|
| Brand Gradient | `linear-gradient(135deg, #00D4FF 0%, #5B9BF5 100%)` | Hero sections, featured cards, premium elements |
| Gold Gradient | `linear-gradient(135deg, #F5A623 0%, #FFD700 100%)` | Achievements, leaderboard, premium badges |
| Dark Gradient | `linear-gradient(180deg, #0A0E1A 0%, #111827 100%)` | Subtle depth on surfaces |
| Glow Gradient | `radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)` | Behind hero elements, ambient glow |

---

## Color Usage Examples

### Trading UI
- **Market card background:** `--surface-card` (#111827)
- **YES price going up:** `--color-success` (#00E5A0)
- **NO price going down:** `--color-error` (#FF6B6B)
- **Buy button:** `--color-primary` (#00D4FF)
- **Odds/numbers:** `--text-primary` in monospace font

### Social / Marketing
- **Twitter banner:** Dark navy bg (#0A0E1A) + cyan accents
- **CTA buttons:** Cyan (#00D4FF) with black text
- **Gold highlights:** For premium features, top traders

---

## Color Do's and Don'ts

- ✅ Use `--color-primary` (cyan) for CTAs and key interactive elements
- ✅ Use semantic colors consistently (`success` = profit, `error` = loss)
- ✅ Maintain WCAG AA contrast ratios (4.5:1 for text)
- ✅ Use muted color variants for backgrounds, not full opacity
- ✅ Let the dark navy breathe — don't over-accent
- ❌ Don't use raw hex colors in code — always reference design tokens
- ❌ Don't mix semantic meanings (e.g., red for a positive action)
- ❌ Don't use cyan on white — contrast is too low. Use darker shades on light mode
- ❌ Don't combine success green + primary cyan in adjacent elements — too similar in hue
