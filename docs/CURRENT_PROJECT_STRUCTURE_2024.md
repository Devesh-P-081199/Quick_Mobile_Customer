# Current Project Structure - Updated 2024

## 📁 Project Overview

**Project**: Quick Mobile Customer  
**Type**: React + Vite Application  
**Architecture**: Feature-based with Tailwind CSS + Custom Components  
**Last Updated**: October 2024

## 🏗️ Root Structure

```
Quick_Mobile_Customer/
├── 📁 .git/                    # Git repository
├── 📁 .vite/                   # Vite cache
├── 📁 dist/                    # Production build output
├── 📁 docs/                    # 📚 Project documentation (27 files)
├── 📁 node_modules/            # Dependencies
├── 📁 public/                  # Static assets
├── 📁 src/                     # 💻 Source code
├── 📄 .gitignore              # Git ignore rules
├── 📄 eslint.config.js        # ESLint configuration
├── 📄 index.html              # Entry HTML
├── 📄 manifest.json           # PWA manifest
├── 📄 package.json            # Project dependencies
├── 📄 package-lock.json       # Dependency lock
├── 📄 postcss.config.js       # PostCSS configuration
├── 📄 README.md               # Project readme
├── 📄 tailwind.config.js      # Tailwind CSS configuration
└── 📄 vite.config.js          # Vite configuration
```

## 🎯 Source Code Structure (`src/`)

### 📱 Core Application Files

```
src/
├── 📄 App.jsx                 # Main application component
├── 📄 main.jsx                # Application entry point
├── 📄 index.css               # Tailwind CSS imports
└── 📄 kstyle.css              # Legacy + modern CSS integration
```

### 🎨 Assets Organization

```
src/assets/                     # Primary assets
├── 📁 css/                    # Legacy CSS files
├── 📁 flaticons/              # Flat design icons
├── 📁 icons/                  # UI icons and symbols
├── 📁 images/                 # Image assets
│   ├── 📁 icons/              # Additional icon set
│   ├── 📁 Products/           # Product category images
│   └── 📁 static/             # Static content images
├── 📁 QuickSellNewIcons/      # New icon set
├── 📁 TopSellingBrands/       # Brand logos
└── 📄 *.png                   # Root level images

src/assets1/                    # Secondary assets (legacy)
├── 📁 css/                    # Alternative CSS files
├── 📁 flaticons/              # Alternative flat icons
├── 📁 icons/                  # Alternative icon set
├── 📁 images/                 # Alternative images
│   ├── 📁 Products/           # Alternative product images
│   └── 📁 static/             # Alternative static content
├── 📁 kicons/                 # K-branded icons
├── 📁 kimages/                # K-branded images
├── 📁 newicons/               # New icon variations
└── 📄 *.png                   # Root level alternative images
```

### 🎨 Modern CSS Architecture

```
src/styles/                     # Modern CSS system
├── 📁 foundation/             # Design system foundation
│   ├── 📄 base.css           # Base styles
│   ├── 📄 reset.css          # CSS reset
│   └── 📄 tokens.css         # Design tokens (CSS variables)
├── 📁 layout/                 # Layout utilities
│   ├── 📄 containers.css     # Container styles
│   ├── 📄 grid.css           # Grid system
│   └── 📄 spacing.css        # Spacing utilities
├── 📁 components/             # Component styles
│   ├── 📄 buttons.css        # Button components
│   ├── 📄 cards.css          # Card components
│   ├── 📄 forms.css          # Form components
│   ├── 📄 navigation.css     # Navigation components
│   └── 📄 range-slider*.css  # Slider components
├── 📁 utilities/              # Utility classes
│   ├── 📄 colors.css         # Color utilities
│   ├── 📄 responsive.css     # Responsive utilities
│   ├── 📄 typography.css     # Typography utilities
│   └── 📄 slider-overflow-fix.css # Specific fixes
└── 📄 main.css               # Main CSS entry point
```

### 🏗️ Feature-Based Architecture

```
src/features/                   # Feature modules
├── 📁 auth/                   # Authentication features
├── 📁 buy/                    # Buy-related features
├── 📁 checkout/               # Checkout process
│   └── 📁 components/         # Checkout components
├── 📁 profile/                # User profile features
│   └── 📁 components/         # Profile components
└── 📁 sell/                   # Sell-related features
    └── 📁 components/         # Sell components
```

### 🧩 Shared Components

```
src/Components/                 # Shared/legacy components
├── 📁 AllCategory/            # Category components
├── 📁 BrowsePicks/            # Browse components
├── 📁 common/                 # Common utilities
├── 📁 CoupenCode/             # Coupon components
├── 📁 FAQ/                    # FAQ components
├── 📁 FormPages/              # Form components
├── 📁 forms/                  # Form utilities
├── 📁 layout/                 # Layout components
│   ├── 📁 FAQ/                # FAQ layout
│   ├── 📁 Footer/             # Footer component
│   ├── 📁 Header/             # Header component
│   ├── 📁 Loader/             # Loading component
│   └── 📁 MobileCommonHeader/ # Mobile header
├── 📁 ProfileModule2/         # Profile components
├── 📁 ui/                     # UI components
│   ├── 📁 BrandCard/          # Brand card component
│   └── 📁 Slider/             # Slider component
└── 📄 ConstrainedRangeSlider.jsx # Range slider component
```

### 📄 Pages & Routing

```
src/Pages/                      # Page components
├── 📁 general/                # General pages
├── 📁 MainPage/               # Main page components
├── 📁 SellModule/             # Sell module pages
├── 📄 DynamicRouteHandler.jsx # Route handler
├── 📄 ErrorPage.jsx           # Error page
├── 📄 NotFoundPage.jsx        # 404 page
├── 📄 ThankYouPage.jsx        # Thank you page
└── 📄 *.module.css            # Page-specific styles
```

### 🔧 Utilities & Services

```
src/Context/                    # React Context
└── 📄 contextAPI.jsx          # Global state management

src/Utils/                      # Utility functions
├── 📄 api.js                  # API service
├── 📄 SEO.jsx                 # SEO utilities
└── 📄 *SliderFix.js           # Slider utilities
```

### 🛒 Legacy Buy Components

```
src/BuyComponent/               # Legacy buy components
├── 📁 Cards/                  # Card components
├── 📁 Download/               # Download components
├── 📁 HomeSlider/             # Home slider
├── 📁 LearnTemplate/          # Learning templates
├── 📁 NewsLetter/             # Newsletter components
├── 📁 PressRelease/           # Press release
├── 📁 Services/               # Service components
└── 📁 UsedvsBrand/            # Comparison components

src/BuyComponents/              # Alternative buy components
├── 📁 Blogs/                  # Blog components
├── 📁 HomeSlider/             # Alternative home slider
├── 📁 OurService/             # Service components
├── 📁 Testimonial/            # Testimonial components
└── 📁 TopSellingProducts/     # Product components
```

## 🎨 CSS Architecture Summary

### Design System Foundation

- **Design Tokens**: CSS custom properties in `tokens.css`
- **Color System**: Primary, neutral, semantic colors
- **Typography**: IBM Plex Sans (primary), Hedvig Letters Serif (headings)
- **Spacing**: 4px base grid system
- **Breakpoints**: Mobile-first responsive design

### CSS Integration Strategy

- **Tailwind CSS v3**: Primary utility framework
- **Custom Components**: Enhanced components that work with Tailwind
- **Legacy Compatibility**: Gradual migration from legacy CSS
- **Design Tokens**: Consistent values across all styles

### Responsive Breakpoints

```css
--breakpoint-sm: 640px   /* Small tablets */
--breakpoint-md: 768px   /* Tablets */
--breakpoint-lg: 1024px  /* Small desktops */
--breakpoint-xl: 1280px  /* Large desktops */
--breakpoint-2xl: 1536px /* Extra large */
```

## 📊 Project Statistics

### File Organization

- **Total Documentation**: 27 files in `/docs`
- **CSS Files**: Modern architecture with design tokens
- **Component Files**: Feature-based + shared components
- **Asset Files**: Organized by type and usage

### Architecture Benefits

- **Scalability**: Feature-based organization
- **Maintainability**: Clear separation of concerns
- **Performance**: Optimized asset loading
- **Developer Experience**: Modern tooling with Vite + Tailwind

## 🚀 Technology Stack

### Core Technologies

- **React 18**: Component framework
- **Vite**: Build tool and development server
- **Tailwind CSS v3**: Utility-first CSS framework
- **PostCSS**: CSS processing

### Development Tools

- **ESLint**: Code linting
- **Git**: Version control
- **npm**: Package management

### CSS Strategy

- **Hybrid Approach**: Tailwind + Custom Components
- **Design System**: Token-based design system
- **Responsive**: Mobile-first responsive design
- **Legacy Support**: Gradual migration strategy

---

_This structure represents the current state after successful migration to feature-based architecture with modern CSS system integration._
