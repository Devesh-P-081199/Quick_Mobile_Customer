# CSS Design System Documentation

## 🎨 Overview

This document outlines the modernized CSS architecture for the Quick Mobile Customer application, featuring a hybrid Tailwind CSS + Custom Components system.

## 🏗️ Architecture

### Directory Structure

```
src/styles/
├── foundation/
│   ├── tokens.css          # Design tokens (colors, spacing, typography)
│   ├── reset.css           # Modern CSS reset
│   └── base.css            # Base element styles
├── layout/
│   ├── containers.css      # Container utilities
│   ├── grid.css           # Grid system
│   └── spacing.css        # Spacing utilities
├── components/
│   ├── buttons.css        # Button component styles
│   ├── forms.css          # Form component styles
│   ├── cards.css          # Card component styles
│   └── navigation.css     # Navigation component styles
├── utilities/
│   ├── typography.css     # Typography utilities
│   ├── colors.css         # Color utilities
│   └── responsive.css     # Responsive utilities
└── main.css              # Main entry point
```

## 🎯 Design Tokens

### Colors

```css
/* Primary Colors */
--color-primary-500: #1968b3; /* Main brand color */
--color-primary-600: #1557a0; /* Hover states */
--color-primary-700: #11468d; /* Active states */

/* Neutral Colors */
--color-neutral-50: #f9fafb; /* Light backgrounds */
--color-neutral-200: #e5e7eb; /* Borders */
--color-neutral-500: #6b7280; /* Text secondary */
--color-neutral-900: #111827; /* Text primary */
```

### Typography

```css
--font-family-primary: "IBM Plex Sans", sans-serif;
--font-family-heading: "Hedvig Letters Serif", serif;
--font-family-mono: "IBM Plex Mono", monospace;

--font-size-xs: 0.75rem; /* 12px */
--font-size-sm: 0.875rem; /* 14px */
--font-size-base: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
```

### Spacing

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-4: 1rem; /* 16px */
--space-8: 2rem; /* 32px */
```

## 🧩 Component Usage

### Buttons

#### Tailwind Classes (Recommended)

```html
<!-- Primary Button -->
<button
  class="bg-primary-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600 transition-colors duration-200"
>
  Primary Button
</button>

<!-- Secondary Button -->
<button
  class="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-200"
>
  Secondary Button
</button>
```

#### Legacy Classes (Backward Compatible)

```html
<button class="primaryBtn">Primary Button</button>
<button class="secondaryBtn">Secondary Button</button>
<button class="submitBtn">Submit Button</button>
```

### Forms

#### Tailwind Classes

```html
<div class="mb-4">
  <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
  <input
    type="email"
    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-100 focus:outline-none"
  />
</div>
```

#### Legacy Classes

```html
<div class="form-group">
  <label class="form-label">Email</label>
  <input type="email" class="form-input" />
</div>
```

### Cards

#### Tailwind Classes

```html
<div class="bg-white rounded-xl p-6 shadow-md border border-gray-200">
  <h3 class="text-xl font-semibold mb-4">Card Title</h3>
  <p class="text-gray-600">Card content goes here.</p>
</div>
```

#### Legacy Classes

```html
<div class="card">
  <h3 class="card__title">Card Title</h3>
  <div class="card__body">
    <p>Card content goes here.</p>
  </div>
</div>
```

## 📱 Responsive Design

### Breakpoints

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Usage

```html
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- Grid items -->
</div>

<!-- Responsive Text -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">Responsive Heading</h1>
```

## 🎨 Color System

### Primary Colors

- `bg-primary-500` / `text-primary-500` - Main brand color
- `bg-primary-600` / `text-primary-600` - Hover states
- `bg-primary-700` / `text-primary-700` - Active states

### Neutral Colors

- `bg-gray-50` - Light backgrounds
- `bg-gray-100` - Card backgrounds
- `text-gray-600` - Secondary text
- `text-gray-900` - Primary text

## 🔧 Utility Classes

### Spacing

```html
<!-- Margin -->
<div class="m-4">Margin all sides</div>
<div class="mx-4">Margin horizontal</div>
<div class="mt-4">Margin top</div>

<!-- Padding -->
<div class="p-4">Padding all sides</div>
<div class="px-4">Padding horizontal</div>
<div class="py-4">Padding vertical</div>
```

### Typography

```html
<h1 class="text-3xl font-bold text-gray-900">Large Heading</h1>
<p class="text-base text-gray-600">Body text</p>
<span class="text-sm text-gray-500">Small text</span>
```

## 🚀 Best Practices

### 1. Use Tailwind First

```html
<!-- ✅ Good -->
<button class="bg-primary-500 text-white px-4 py-2 rounded-lg">Button</button>

<!-- ❌ Avoid -->
<button style="background: #1968b3; color: white;">Button</button>
```

### 2. Leverage Design Tokens

```css
/* ✅ Good */
.custom-component {
  color: var(--color-primary-500);
  font-family: var(--font-family-primary);
}

/* ❌ Avoid */
.custom-component {
  color: #1968b3;
  font-family: "IBM Plex Sans";
}
```

### 3. Responsive Design

```html
<!-- ✅ Good -->
<div class="w-full md:w-1/2 lg:w-1/3">Responsive width</div>

<!-- ❌ Avoid -->
<div style="width: 33.33%">Fixed width</div>
```

## 🐛 Troubleshooting

### Common Issues

1. **Tailwind classes not working**

   - Ensure `tailwind.config.js` is properly configured
   - Check that `@import "tailwindcss";` is in `index.css`

2. **Design tokens not available**

   - Verify `tokens.css` is imported in `main.css`
   - Check CSS custom property syntax: `var(--token-name)`

3. **Responsive breakpoints not working**
   - Use correct Tailwind prefixes: `sm:`, `md:`, `lg:`, `xl:`
   - Test on actual devices or browser dev tools

## 📊 Performance

### Bundle Size Optimization

- Tailwind CSS automatically purges unused styles
- Custom components use design tokens for consistency
- Modern CSS features reduce code duplication

### Loading Strategy

1. Critical CSS (tokens, reset, base) loads first
2. Component styles load as needed
3. Utility classes are optimized by Tailwind

## 🔄 Migration Guide

### From Legacy to Modern

#### Old Way

```css
.my-button {
  background: #1968b3;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

#### New Way

```html
<button class="bg-primary-500 text-white px-6 py-3 rounded-lg">
  My Button
</button>
```

## 📝 Maintenance

### Adding New Components

1. Use Tailwind classes first
2. Create custom CSS only when necessary
3. Use design tokens for consistency
4. Document new patterns

### Updating Colors

1. Update `tailwind.config.js` theme
2. Update CSS custom properties in `tokens.css`
3. Test across all components

### Performance Monitoring

- Monitor CSS bundle size
- Check for unused styles
- Validate responsive behavior

## 🎯 Quick Reference

### Most Used Classes

```html
<!-- Layout -->
<div class="container mx-auto px-4">
  <div class="flex items-center justify-between">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Spacing -->
      <div class="p-4 m-4 space-y-4">
        <!-- Typography -->
        <h1 class="text-3xl font-bold text-gray-900">
          <p class="text-base text-gray-600">
            <!-- Colors -->
          </p>

          <div class="bg-white text-gray-900 border border-gray-200">
            <button
              class="bg-primary-500 text-white hover:bg-primary-600"
            ></button>
          </div>
        </h1>
      </div>
    </div>
  </div>
</div>
```

---

**Need help?** Check the component examples in the codebase or refer to [Tailwind CSS Documentation](https://tailwindcss.com/docs) for additional utility classes.
