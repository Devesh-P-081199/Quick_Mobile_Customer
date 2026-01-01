# Quick Mobile Customer - Project Structure

This project follows a **Module-Based Architecture**. Key business logic and UI are consolidated under `src/modules`.

## Directory Structure

### `src/modules/`
The core directory containing all feature logic and shared resources.

#### 1. Business Modules
Independent business domains. Each contains its own `pages` and `components`.
- **`src/modules/buy/`**: buying flow.
- **`src/modules/sell/`**: selling flow.
- **`src/modules/profile/`**: user profile and account management.
- **`src/modules/checkout/`**: checkout and payment processing.

**Internal Structure of a Module:**
- `pages/`: Full-page views (e.g., `HomePage.jsx`).
- `components/`: Module-specific components (e.g., `HomeSlider.jsx`).

#### 2. Shared Common Module
- **`src/modules/common/`**: Resources shared across the application.
    - **`components/`**: Reusable UI (Header, Footer, Sliders, Buttons).
    - **`pages/`**: Global pages (404, Privacy Policy, Terms, Blog Templates).

## Key Architectural Decisions
- **Consolidation**: Legacy `src/features`, `src/components`, and `src/pages` are now unified under `src/modules`.
- **Isolation**: Domain-specific code stays strictly within its module (`buy`, `sell`, etc.).
- **Sharing**: truly global code lives in `common`.

## Navigation
- **App Entry**: `src/App.jsx` defines the routes, lazily importing pages from `src/modules/*/pages/`.
- **Global Styles**: `src/index.css` and `src/styles/`.
