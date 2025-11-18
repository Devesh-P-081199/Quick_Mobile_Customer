# Global Section Padding System

## Overview

This document outlines the consistent padding system used across all sections to match the header container width and ensure responsive design consistency.

## Base Padding System

### Header Reference

The header uses: `padding: var(--spacing-2) 12.5%`

### Section Container Classes

#### `.section-container`

Base container class that matches header padding:

```css
.section-container {
  padding-left: 12.5%;
  padding-right: 12.5%;
  width: 100%;
  margin: 0 auto;
}
```

#### Vertical Padding Variants

- `.section-padding-sm` - 2rem top/bottom
- `.section-padding-md` - 4rem top/bottom
- `.section-padding-lg` - 6rem top/bottom

## Responsive Breakpoints

| Screen Size | Horizontal Padding |
| ----------- | ------------------ |
| > 1440px    | 12.5%              |
| ≤ 1440px    | 10%                |
| ≤ 1200px    | 8%                 |
| ≤ 992px     | 6%                 |
| ≤ 768px     | 5%                 |
| ≤ 576px     | 4%                 |
| ≤ 480px     | 3%                 |
| ≤ 320px     | 2%                 |

## Usage Examples

### Basic Section

```jsx
<section className="section-container section-padding-md">
  <div className="content-container">
    <h2 className="section-title">Section Title</h2>
    <p className="section-text">Section content...</p>
  </div>
</section>
```

### Grid Layout Section

```jsx
<section className="section-container section-padding-lg">
  <div className="content-container">
    <h2 className="section-title">Products</h2>
    <div className="section-grid section-grid-3">
      <div>Product 1</div>
      <div>Product 2</div>
      <div>Product 3</div>
    </div>
  </div>
</section>
```

### Flex Layout Section

```jsx
<section className="section-container section-padding-md">
  <div className="content-container">
    <div className="section-flex section-flex-between">
      <div>Left content</div>
      <div>Right content</div>
    </div>
  </div>
</section>
```

## Content Container Variants

### `.content-container` (Default)

- Max-width: 1200px
- Centered with auto margins

### `.content-container-wide`

- Max-width: 1400px
- For wider content layouts

### `.content-container-narrow`

- Max-width: 800px
- For text-heavy content

## Grid System

### `.section-grid-2`

- 2 columns on desktop
- 1 column on mobile
- Min column width: 300px

### `.section-grid-3`

- 3 columns on desktop
- 1 column on mobile
- Min column width: 250px

### `.section-grid-4`

- 4 columns on desktop
- 1 column on mobile
- Min column width: 200px

## Typography Classes

### `.section-title`

- Font-size: 2.5rem (desktop), 2rem (tablet), 1.75rem (mobile)
- Font-weight: 700
- Margin-bottom: 1rem

### `.section-subtitle`

- Font-size: 1.25rem (desktop), 1.125rem (tablet), 1rem (mobile)
- Font-weight: 500
- Color: #666

### `.section-text`

- Font-size: 1rem
- Line-height: 1.6
- Color: #555

## Implementation Guidelines

1. **Always use `.section-container`** for horizontal padding consistency
2. **Choose appropriate vertical padding** based on content importance
3. **Use content containers** to constrain width for readability
4. **Apply grid/flex utilities** for layout structure
5. **Use typography classes** for consistent text styling

## Migration Strategy

1. Identify existing sections with custom padding
2. Replace custom padding with `.section-container`
3. Add appropriate vertical padding class
4. Wrap content in appropriate content container
5. Test responsive behavior across all breakpoints

## Benefits

- ✅ Consistent visual alignment with header
- ✅ Responsive design out of the box
- ✅ Maintainable and scalable system
- ✅ Improved development velocity
- ✅ Better user experience across devices
