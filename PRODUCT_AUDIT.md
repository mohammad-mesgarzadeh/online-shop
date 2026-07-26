# VESTA E-Commerce - Product/Shop UX Audit

## Executive Summary
The current Products/shop experience has significant gaps compared to modern e-commerce standards. This audit covers all issues found across product listing, filtering, sorting, mobile experience, and visual presentation.

---

## 1. PRODUCT PAGE / SHOP LAYOUT

### Issues Found
- **Incomplete page structure**: No breadcrumb navigation on shop page
- **Missing page header**: No hero section or visual context for the shop
- **Duplicate heading**: Both `Products.tsx` (line 93) and `ProductToolbar.tsx` (line 23) render a heading, creating redundant "فروشگاه" text
- **No product count context**: Counter shows "X محصول" but no context for total vs filtered
- **No view toggle**: Users cannot switch between grid/list views

### Severity: Medium

---

## 2. FILTERING SYSTEM

### Issues Found
- **Only 2 filter types exist**: Search text + Category checkboxes
- **Missing filters**: Price range, Brand, Size, Color, Availability, Rating, Sale items, New arrivals
- **No price filtering**: Users cannot narrow products by price range
- **No multi-faceted filtering**: Cannot combine category + price + brand etc.
- **No filter state persistence**: Filters reset on page navigation
- **No URL sync**: Filter state is not reflected in URL (only search and single category)

### Severity: Critical

---

## 3. MOBILE FILTER EXPERIENCE

### Issues Found
- **Broken drawer**: Filter sidebar slides up from bottom (`transform: translateY(100%)`) but has no sticky footer
- **No Apply button**: Users cannot confirm filter selections on mobile
- **No Reset button**: No way to clear all filters at once
- **Close button placement**: Header close button appears conditionally (`filterOpen &&`) but is inside the sidebar column, not fixed at top
- **No filter count badge**: Badge only shows category count, not total active filters
- **Body scroll not locked**: Page scrolls behind the filter drawer
- **Touch targets too small**: Filter items may be difficult to tap on small screens

### Severity: Critical

---

## 4. DESKTOP FILTER EXPERIENCE

### Issues Found
- **Not sticky**: Filter sidebar scrolls away when user scrolls down
- **Not expandable/collapsible**: Filter groups cannot be collapsed
- **Limited filter options**: Only category checkboxes with no grouping
- **No active state indicators**: Active filters not visually distinct in sidebar
- **No filter count per category**: Users don't know how many products per category
- **Search input in filters is redundant**: Same search exists in toolbar/navbar

### Severity: High

---

## 5. SORTING SYSTEM

### Issues Found
- **Only 4 sort options**: newest, best-selling, cheapest, most-expensive
- **Missing sorts**: Featured, Highest Rated, Most Popular
- **Sort dropdown not styled**: Basic `form-select` appearance
- **URL sort param ignored**: Homepage links pass `?sort=best-selling` but Products.tsx never reads it (line 16 hardcodes "newest")

### Severity: Medium

---

## 6. PRODUCT CARDS

### Issues Found
- **Inconsistent max-width**: Hard-coded `max-width: 280px` prevents cards from filling grid columns
- **Image ratio locked to 1:1**: All images forced to square, some products look distorted
- **Rating is synthetic**: Stars calculated from `sold / 50 + 3`, not real ratings
- **No "New" badge**: New arrivals not visually indicated
- **Wishlist button hidden on desktop**: Only appears on hover, easy to miss
- **No quick-add visual feedback delay**: `setTimeout` without cleanup on unmount
- **Star rating count misleading**: Shows `(sold)` count next to stars, confusing UX
- **Category label above title**: Small uppercase text not meaningful enough

### Severity: High

---

## 7. PRODUCT IMAGES

### Issues Found
- **Square aspect ratio forced**: `.pc-img-wrap { aspect-ratio: 1/1 }` distorts non-square images
- **Duplicate images**: Products prod-003 and prod-006 share the same Unsplash URL
- **No lazy loading fallback**: No placeholder/skeleton while images load
- **No error handling**: Broken images show alt text only
- **Image sizing inconsistent across breakpoints**: Grid changes columns but card max-width stays 280px

### Severity: Medium

---

## 8. SEARCH EXPERIENCE

### Issues Found
- **Case-sensitive search**: `p.title.includes(search)` is case-sensitive
- **Title-only search**: Does not search descriptions or categories
- **No empty state for search**: When search returns nothing, shows generic "محصولی یافت نشد"
- **No search suggestions**: No autocomplete or popular searches
- **No search highlighting**: Results don't highlight matching text
- **No search history**: No recent searches saved

### Severity: High

---

## 9. PRODUCT DISCOVERY

### Issues Found
- **No breadcrumbs on shop page**: Missing navigation context
- **No category navigation within shop**: Must use sidebar only
- **No "related products" in listing**: No recommendations
- **No product comparison**: Cannot compare products
- **No recently viewed**: Not shown on shop page
- **Pagination basic**: No "load more" or infinite scroll option
- **No product count per page control**: Fixed at 9 per page

### Severity: Medium

---

## 10. EMPTY STATES

### Issues Found
- **Generic empty state**: Single empty state for all scenarios
- **No distinction**: Same message for "no products in category" vs "no search results" vs "no filter results"
- **No visual appeal**: Basic icon + text, no illustration
- **Limited actions**: Only "clear filters" button, no "browse all" or "try different search"

### Severity: Medium

---

## 11. RESPONSIVE DESIGN

### Issues Found
- **320px**: Filter button text may overflow, cards stack but layout breaks
- **375px-414px**: Product grid 2-col works but cards feel cramped
- **768px**: Transition from mobile to desktop awkward - sidebar hidden but 2-col grid
- **1024px**: 3-col grid works but cards limited by 280px max-width
- **1280px**: Grid columns underutilized due to card max-width constraint
- **Horizontal scroll**: `overflow-x: hidden` on body masks potential issues
- **Mobile filter drawer**: Does not prevent body scroll

### Severity: High

---

## 12. ACTIVE FILTERS DISPLAY

### Issues Found
- **No filter chips**: Active filters not shown as removable chips
- **No clear all**: Cannot remove all filters at once (only clear button in empty state)
- **No visual feedback**: User must look at sidebar to see what's active
- **Category badge count**: Only counts categories, not all active filters

### Severity: High

---

## BUG SUMMARY

| # | Bug | Severity | Location |
|---|-----|----------|----------|
| 1 | Case-sensitive search | High | Products.tsx:30 |
| 2 | Search only checks title | Medium | Products.tsx:29-31 |
| 3 | URL sort param ignored | Medium | Products.tsx:16 |
| 4 | Mobile filter has no Apply/Reset | Critical | Products.tsx:122-149 |
| 5 | Mobile body scroll not locked | High | Products.tsx |
| 6 | Coupon discount never applied | Medium | Cart.tsx:32-39 |
| 7 | Countdown is static | Low | Countdown.tsx |
| 8 | Duplicate product images | Low | products.ts:49,85 |
| 9 | ProductCard max-width limits grid | High | ProductCard.css:6 |
| 10 | Star rating is synthetic | Medium | ProductCard.tsx:107 |
| 11 | setTimeout without cleanup | Low | ProductCard.tsx:27 |
| 12 | Filter badge only counts categories | Medium | Products.tsx:116-118 |

---

## RECOMMENDATIONS PRIORITY

### Phase 1 (Critical - This Session)
1. Complete filter system redesign (price, brand, size, color, availability, rating, sale, new)
2. Mobile filter drawer with Apply/Reset sticky footer
3. Active filter chips with Clear All
4. Enhanced sorting (7 options)
5. Product data enrichment (brand, size, color, rating, isNew)
6. Product card improvements (badges, wishlist, image handling)

### Phase 2 (High Priority)
7. Search improvements (case-insensitive, multi-field, highlighting)
8. Desktop sticky sidebar with expandable groups
9. Empty state variants
10. Responsive fixes across all breakpoints

### Phase 3 (Nice to Have)
11. Product comparison
12. Infinite scroll / load more
13. Search suggestions & history
14. Recently viewed on shop page
