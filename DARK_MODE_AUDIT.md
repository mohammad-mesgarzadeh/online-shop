# Dark Mode Audit Report

## Theme System Overview
- **Single source of truth**: CSS custom properties in `src/styles/design-tokens.css`
- **Mechanism**: `[data-theme="dark"]` attribute on `<html>` element
- **Persistence**: `localStorage` under key `vesta_theme`
- **Toggle**: Available in navbar (sun/moon icon) and Account Settings page
- **Context**: `ThemeContext.tsx` provides `theme`, `toggleTheme`, `setTheme`

## Issues Found & Fixed

### 1. CSS Files — Missing Dark Mode Overrides

#### `src/pages/Auth.css` (Login & Register pages)
**Problem**: Entire auth page written with hardcoded light colors — white card background, light gray page background, hardcoded borders, alert colors, text colors. No dark mode support.
**Fix**: Added comprehensive `[data-theme="dark"]` overrides in `design-tokens.css`:
- `.auth-page` — background now uses `var(--c-bg)` with subtle gradient accents
- `.auth-card` — background `var(--c-surface)`, border `var(--c-border)`, darker shadow
- `.auth-title` — color `var(--c-gray-100)`
- `.auth-subtitle`, `.auth-label`, `.auth-checkbox` — mapped to appropriate gray variables
- `.auth-input` — background `var(--c-gray-50)`, color `var(--c-gray-200)`, focus uses `var(--c-primary-light)`
- `.auth-input-icon`, `.auth-toggle-password` — mapped to `var(--c-gray-500)`
- `.auth-alert-error` / `.auth-alert-success` — use semantic bg/color variables
- `.auth-divider::before/::after` — uses `var(--c-border)` instead of `#e2e8f0`
- `.auth-back-home` — mapped to gray tones with primary hover

#### `src/components/home/BestSellingProducts.css`
**Problem**: Swiper navigation buttons hardcoded `background: #fff`, `color: #000`, `box-shadow: 0 10px 25px rgba(0,0,0,0.12)`.
**Fix**: Added `[data-theme="dark"]` overrides in `design-tokens.css`:
- Background → `var(--c-surface)`, color → `var(--c-gray-400)`, darker shadow

#### `src/components/home/CategoriesSection.css`
**Problem**: Swiper navigation buttons hardcoded `background: white`.
**Fix**: Added `[data-theme="dark"]` override using `var(--c-surface)`.

#### `src/components/ProductCard.css`
**Problem**: Wishlist button uses `background: rgba(255, 255, 255, 0.92)` (white overlay), secondary quick action button uses `background: var(--c-white)`, title uses `var(--c-gray-800)`.
**Fix**: Added `[data-theme="dark"]` overrides:
- `.pc-wishlist` → `var(--c-surface-elevated)`
- `.pc-quick-btn--secondary` → `var(--c-surface)`, hover → `var(--c-primary-light)`
- `.pc-title` → `var(--c-gray-200)`
- `.pc-rating-text` → `var(--c-gray-400)`
- `.pc-color-dot` → `var(--c-border)`

### 2. Inline Style Fixes

#### `src/components/home/NewsletterSection.tsx`
**Problem**: Entire section used a light-purple/white color palette that was invisible in dark mode: `#f8f7ff` background, `#ede9fe` blobs, `#1a0f3c` heading text, `#7c6fa0` description text, `#f5f3ff` input/button backgrounds.
**Fix**: Added CSS class hooks to all elements (`newsletter-section`, `newsletter-blob-*`, `newsletter-icon-wrap`, `newsletter-badge`, `newsletter-title`, `newsletter-desc`, `newsletter-input`, `newsletter-submit`, `newsletter-perk`) with `[data-theme="dark"]` overrides in `design-tokens.css`:
- Section background → `var(--c-surface)` / `var(--c-bg)` gradient
- Blobs → `var(--c-primary-bg)` / `rgba(108,99,255,0.1)`
- Icon/badge → `var(--c-primary-bg)` / `var(--c-primary-light)`
- Title → `var(--c-gray-100)`
- Description → `var(--c-gray-400)`
- Input → `var(--c-gray-50)` / `var(--c-gray-200)`
- Perk tags → `var(--c-primary-bg)` / `var(--c-primary-light)` with transparent border

#### `src/pages/ProductDetail.tsx` (line 313)
**Problem**: Wishlist button active state used hardcoded `#fee2e2` background, `#fca5a5` border, `#dc2626` color — appeared as a light patch on dark UI.
**Fix**: Replaced with `var(--c-danger-bg)`, `transparent`, `var(--c-danger)`.

### 3. Additional Dark Mode CSS Overrides Added to `design-tokens.css`

| Selector | Purpose |
|---|---|
| `[data-theme="dark"] .cart-badge` | Border color matches dark background |
| `[data-theme="dark"] .empty-state-title` | Light gray text for dark bg |
| `[data-theme="dark"] .empty-state-desc` | Medium gray text for dark bg |
| `[data-theme="dark"] .section-header h2` | Light text for headings |
| `[data-theme="dark"] .section-header-row h2` | Light text for headings |

### 4. Verified Already Working (No Changes Needed)

The following components/pages already use CSS variables and have existing dark mode support:

| Component | Status |
|---|---|
| **Navbar** | Full dark mode via lines 428-461 in `design-tokens.css` |
| **Footer** | Permanently dark (`var(--c-gray-900)`) — intentional design |
| **Home HeroSection** | Permanently dark gradient background — intentional |
| **Home BrandStorySection** | All colors use `var(--c-*)` variables |
| **Home WhyChooseUsSection** | Uses `var(--c-*)` variables for icons |
| **Home CollectionsSection** | Uses dark overlays on images — intentional |
| **Home PromotionalBanners** | Dark gradients — intentional |
| **Home TestimonialsSection** | On `var(--c-gray-900)` — intentional dark section |
| **Cart** | All colors use `var(--c-*)` variables |
| **Products** | Uses CSS classes — dark overrides exist |
| **ProductFilters** | Color swatches are product attributes, not UI |
| **ProductToolbar** | No color styles |
| **ProductPagination** | Uses `var(--c-*)` variables |
| **Blog** | Hero on dark gradient, rest uses variables |
| **BlogDetail** | All colors use `var(--c-*)` variables |
| **Offers** | Permanently dark gradient backgrounds |
| **OffersAll** | Permanently dark gradient backgrounds |
| **Categories** | Cards use CSS variables and cat-overlay class |
| **CategoryProducts** | Uses `var(--c-*)` variables |
| **WomensClothing** | Hero overlays are on dark gradients |
| **MensClothing** | Hero overlays are on dark gradients |
| **Accessories** | Hero overlays are on dark gradients |
| **Account pages** | Use `bg-light`, `text-dark` classes — already overridden in CSS |

## Build Verification
- `npm run build` — **Passed with zero errors**
- No TypeScript errors
- No CSS warnings

## Files Modified

| File | Changes |
|---|---|
| `src/styles/design-tokens.css` | Added ~80 lines of `[data-theme="dark"]` overrides for auth page, newsletter, swiper buttons, product cards, section headers, empty states, and cart badge |
| `src/components/home/NewsletterSection.tsx` | Added CSS class hooks to all themed elements for dark mode targeting |
| `src/pages/ProductDetail.tsx` | Replaced hardcoded wishlist colors with CSS variables |

## Remaining Issues
- **None identified**. All hardcoded UI background/text colors in TSX files have been replaced or are on intentionally dark backgrounds. All CSS files with hardcoded light colors now have corresponding `[data-theme="dark"]` overrides in the centralized `design-tokens.css`.
