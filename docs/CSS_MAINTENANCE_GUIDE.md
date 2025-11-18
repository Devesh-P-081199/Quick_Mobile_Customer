# CSS Maintenance Standards

## 🎯 Overview

This guide establishes standards and best practices for maintaining the CSS architecture of the Quick Mobile Customer application.

## 📋 Development Standards

### 1. Code Organization

#### File Structure Rules

- **Foundation files** (`tokens.css`, `reset.css`, `base.css`) - Core system files, modify with caution
- **Component files** - Reusable component styles, prefer Tailwind classes
- **Module files** - Component-specific styles, use strategic overrides only
- **Utility files** - Helper classes, extend Tailwind when needed

#### Naming Conventions

```css
/* ✅ Good - BEM methodology for custom components */
.component-name {
}
.component-name__element {
}
.component-name--modifier {
}

/* ✅ Good - Design token usage */
.custom-component {
  color: var(--color-primary-500);
  font-size: var(--font-size-base);
}

/* ❌ Avoid - Hardcoded values */
.custom-component {
  color: #1968b3;
  font-size: 16px;
}
```

### 2. CSS Writing Guidelines

#### Priority Order

1. **Tailwind classes** (highest priority)
2. **Design tokens** (for custom CSS)
3. **Component-specific overrides** (documented)
4. **Legacy classes** (phase out gradually)

#### CSS Structure

```css
/* Component structure */
.component {
  /* Layout properties */
  display: flex;
  position: relative;

  /* Box model */
  width: 100%;
  padding: var(--space-4);
  margin: var(--space-2);

  /* Visual properties */
  background-color: var(--color-white);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);

  /* Typography */
  font-family: var(--font-family-primary);
  font-size: var(--font-size-base);
  color: var(--color-neutral-900);

  /* Transitions */
  transition: all var(--transition-base);
}
```

### 3. Strategic Override Guidelines

#### When to Override

- Component needs specific styling not available in Tailwind
- Legacy compatibility requirements
- Complex interactions requiring custom CSS

#### How to Override

```css
/* ✅ Good - Documented override */
.login-module .btn {
  /* Override: Login module requires smaller buttons for mobile */
  font-size: var(--font-size-sm);
  padding: var(--space-2) var(--space-4);
}

/* ❌ Avoid - Undocumented override */
.login-module .btn {
  font-size: 14px;
  padding: 8px 16px;
}
```

#### Override Documentation Template

```css
/* 
 * Override: [Component/Module Name]
 * Reason: [Why this override is necessary]
 * Alternative: [What Tailwind classes were considered]
 * Review: [Date when this should be reviewed for removal]
 */
.specific-override {
  /* Override styles here */
}
```

## 🔧 Maintenance Procedures

### 1. Adding New Components

#### Step 1: Check Existing Solutions

1. Can this be built with Tailwind classes?
2. Does a similar component already exist?
3. Can existing design tokens be used?

#### Step 2: Create Component

```css
/* New component template */
.new-component {
  /* Use design tokens */
  background-color: var(--color-white);
  border: 1px solid var(--color-neutral-200);
  border-radius: var(--radius-lg);
  padding: var(--space-4);

  /* Add responsive behavior */
  @media (max-width: 768px) {
    padding: var(--space-2);
  }
}
```

#### Step 3: Document Component

- Add to design system documentation
- Include usage examples
- Note any special considerations

### 2. Updating Existing Components

#### Before Making Changes

1. **Identify impact** - Which components use this style?
2. **Test thoroughly** - Check all affected pages
3. **Document changes** - Update relevant documentation

#### Change Process

```css
/* Before */
.old-component {
  background: #ffffff;
  padding: 20px;
}

/* After - with design tokens */
.old-component {
  background-color: var(--color-white);
  padding: var(--space-5);
}
```

### 3. Performance Optimization

#### Regular Audits

- **Monthly**: Check for unused CSS
- **Quarterly**: Review bundle size
- **Annually**: Major architecture review

#### Optimization Checklist

- [ ] Remove unused CSS classes
- [ ] Consolidate similar components
- [ ] Update legacy code to use design tokens
- [ ] Optimize media queries
- [ ] Check Tailwind purge configuration

## 🎨 Design Token Management

### 1. Adding New Tokens

#### Color Tokens

```css
/* Add to tokens.css */
:root {
  --color-new-50: #f0f9ff;
  --color-new-500: #0ea5e9;
  --color-new-900: #0c4a6e;
}
```

#### Update Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        new: {
          50: "#f0f9ff",
          500: "#0ea5e9",
          900: "#0c4a6e",
        },
      },
    },
  },
};
```

### 2. Updating Existing Tokens

#### Process

1. **Update tokens.css** - Change the CSS custom property
2. **Update tailwind.config.js** - Update corresponding Tailwind values
3. **Test thoroughly** - Check all components using the token
4. **Document changes** - Note what changed and why

## 🧪 Testing Standards

### 1. Visual Testing

#### Before Deployment

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Check dark mode compatibility (if applicable)
- [ ] Validate accessibility (contrast ratios, focus states)

#### Testing Checklist

```html
<!-- Test these scenarios -->
<button class="primaryBtn">Legacy Button</button>
<button class="bg-primary-500 text-white px-4 py-2 rounded">
  Tailwind Button
</button>

<!-- Responsive test -->
<div class="w-full md:w-1/2 lg:w-1/3">Responsive Element</div>

<!-- Form test -->
<input class="form-input" type="text" placeholder="Legacy Input" />
<input
  class="w-full px-3 py-2 border rounded"
  type="text"
  placeholder="Tailwind Input"
/>
```

### 2. Performance Testing

#### Metrics to Monitor

- CSS bundle size
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

#### Tools

- Chrome DevTools
- Lighthouse
- WebPageTest
- Bundle analyzer

## 🚨 Troubleshooting Guide

### Common Issues

#### 1. Tailwind Classes Not Working

**Symptoms**: Classes applied but no styling
**Solutions**:

- Check `tailwind.config.js` configuration
- Verify `@import "tailwindcss";` in `index.css`
- Clear browser cache
- Check for CSS specificity conflicts

#### 2. Design Tokens Not Available

**Symptoms**: `var(--token-name)` not working
**Solutions**:

- Verify `tokens.css` is imported in `main.css`
- Check CSS custom property syntax
- Ensure proper cascade order

#### 3. Responsive Breakpoints Not Working

**Symptoms**: Mobile/desktop styles not applying
**Solutions**:

- Use correct Tailwind prefixes (`sm:`, `md:`, `lg:`)
- Check media query syntax
- Test on actual devices

#### 4. Performance Issues

**Symptoms**: Slow loading, large bundle size
**Solutions**:

- Enable Tailwind CSS purging
- Remove unused CSS
- Optimize image assets
- Check for CSS duplication

## 📊 Code Review Checklist

### For Reviewers

#### CSS Quality

- [ ] Uses design tokens instead of hardcoded values
- [ ] Follows naming conventions
- [ ] Includes responsive behavior
- [ ] Has proper documentation for overrides
- [ ] No duplicate or conflicting styles

#### Performance

- [ ] No unnecessary CSS added
- [ ] Tailwind classes used where possible
- [ ] Media queries are optimized
- [ ] No inline styles

#### Accessibility

- [ ] Proper contrast ratios
- [ ] Focus states defined
- [ ] Screen reader friendly
- [ ] Keyboard navigation support

## 🔄 Migration Strategy

### Phase Out Legacy Code

#### Gradual Migration

1. **Identify legacy components** - Create inventory
2. **Prioritize by usage** - High-traffic components first
3. **Update incrementally** - One component at a time
4. **Test thoroughly** - Ensure no regressions
5. **Document changes** - Update style guide

#### Migration Template

```css
/* BEFORE - Legacy */
.old-component {
  background: #ffffff;
  padding: 20px;
  border: 1px solid #cccccc;
  border-radius: 5px;
}

/* AFTER - Modern */
.old-component {
  @apply bg-white p-5 border border-gray-300 rounded-lg;
}

/* OR with design tokens */
.old-component {
  background-color: var(--color-white);
  padding: var(--space-5);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-lg);
}
```

## 📝 Documentation Requirements

### For New Components

- Component purpose and usage
- Available variants and modifiers
- Responsive behavior
- Accessibility considerations
- Code examples

### For Overrides

- Reason for override
- Alternative solutions considered
- Review date for potential removal
- Impact assessment

## 🎯 Quality Gates

### Before Merging CSS Changes

1. **Code review** - At least one reviewer
2. **Visual testing** - Cross-browser compatibility
3. **Performance check** - Bundle size impact
4. **Documentation** - Updated style guide
5. **Accessibility audit** - WCAG compliance

### Monthly Reviews

- Unused CSS cleanup
- Performance metrics review
- Design token usage audit
- Legacy code migration progress

---

**Remember**: The goal is maintainable, performant, and consistent CSS that enhances the user experience while being developer-friendly.
