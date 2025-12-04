# Blogs Page Header Update

## Changes Made

### Updated BlogsPage Component

Added custom header matching the BlogDetail page design pattern.

#### Before:

```jsx
const BlogsPage = () => {
  return (
    <div className={styles.blogsPageContainer}>
      <div className={styles.blogsPageWrapper}>
        <div className={styles.headerSection}>
          <h1 className={styles.pageTitle}>Our Blogs</h1>
          ...
```

#### After:

```jsx
import MobileCommonHeaderthree from "../components/layout/MobileCommonHeader/MobileCommonHeaderthree";

const BlogsPage = () => {
  return (
    <>
      {/* Mobile Header with Back Button */}
      <MobileCommonHeaderthree title="Blogs" />

      <div className={styles.blogsPageContainer}>
        <div className={styles.blogsPageWrapper}>
          <div className={styles.headerSection}>
            <h1 className={styles.pageTitle}>Our Blogs</h1>
            ...
```

### Updated CSS

Added mobile padding to account for fixed header:

```css
/* Mobile: Add padding for fixed header */
@media (max-width: 479px) {
  .blogsPageContainer {
    padding-top: 75px; /* Account for fixed header (55px) + extra spacing */
  }

  .headerSection {
    padding-top: 1rem;
  }
}
```

## Header Behavior

### Mobile (<550px)

- Shows **MobileCommonHeaderthree** component
- Fixed position at top
- Displays "Blogs" title
- Back button navigates to previous page
- Universal header is hidden

### Desktop (≥550px)

- **MobileCommonHeaderthree** is hidden (CSS: `display: none !important`)
- Universal header shows normally
- Standard navigation experience

## Design Consistency

Now matches the same header pattern used in:

- BlogDetail page (`/blog/:blogId`)
- Other detail/content pages in the project

## User Experience

- Mobile users see a clean, focused header with easy back navigation
- Desktop users maintain the full navigation experience
- Consistent design language across all blog-related pages
