# Font Family Standardization Project

## 🎯 **Objective**

Ensure that `"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif` is the ONLY font-family used throughout the entire system.

## 📊 **Current Font Usage Analysis**

### ✅ **Correctly Using Design Tokens**

- All files in `src/styles/` directory
- Most page components in `src/Pages/general/`
- Base CSS files (reset.css, base.css, main.css)

### ❌ **Issues Found**

#### **1. Hardcoded IBM Plex Sans (Should use design tokens)**

- `src/features/` components (22+ instances)
- `src/Components/` components (15+ instances)
- `src/BuyComponent/` components (8+ instances)

#### **2. Wrong Font Families (Should be IBM Plex Sans)**

- **Poppins**: 2 instances in checkout components
- **Hedvig Letters Serif**: 3 instances in buy components
- **Generic serif**: 1 instance in learn template

#### **3. Inconsistent Mono Font**

- Currently set to IBM Plex Sans (should remain consistent)

## 🔧 **Standardization Plan**

### **Phase 1: Update Design Tokens** ✅

Ensure our design tokens are correctly set:

```css
--font-family-primary: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, sans-serif;
--font-family-heading: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, sans-serif;
--font-family-mono: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
  Roboto, sans-serif;
```

### **Phase 2: Replace Hardcoded IBM Plex Sans**

Replace all hardcoded `"IBM Plex Sans"` declarations with `var(--font-family-primary)`

### **Phase 3: Replace Wrong Font Families**

- Replace `"Poppins"` with `var(--font-family-primary)`
- Replace `"Hedvig Letters Serif"` with `var(--font-family-primary)`
- Replace generic `serif` with `var(--font-family-primary)`

### **Phase 4: Verification**

Search and verify no other font families exist in the system

## 📋 **Files to Update**

### **Features Directory (22+ instances)**

- `src/features/checkout/components/Payment/Payment.module.css`
- `src/features/checkout/components/CheckOut/RightCard.module.css`
- `src/features/sell/components/WhySellYourPhone/WhySell.module.css`
- `src/features/sell/components/SellDeviceVarientSelect/SellDeviceVarient.module.css`
- `src/features/sell/components/SellBanner/SellBanner.module.css`
- `src/features/sell/components/SelectSeries/SelectSeries.module.css`
- `src/features/sell/components/SelectSubCategories/SelectSubCata.module.css`
- `src/features/sell/components/SelectSubCategories/SelectSeries.module.css`
- `src/features/sell/components/SelectModel/SelectModel.module.css`
- `src/features/sell/components/SelectBrand/SelectBrand.module.css`
- `src/features/sell/components/GetUpto/GetUpto.module.css`
- `src/features/profile/components/SetupProfile/SetupProfile.module.css`
- `src/features/profile/components/Signup/Signup.module.css`

### **Components Directory (15+ instances)**

- `src/Components/TopSellingProducts/TopSellingProduct.module.css`
- `src/Components/SuggestionProductSlider/SuggestionProductSlider.module.css`
- `src/Components/SelectedSeries/SelectedSeries.module.css`
- `src/Components/ProfileModule2/MyOrder/MyOrder.module.css`
- `src/Components/layout/Footer/Footer.module.css`
- `src/Components/layout/FAQ/FAQ.module.css`
- `src/Components/BrowsePicks/BrowsePicks.module.css`
- `src/Components/FormPages/Step6/Step6.module.css`

### **BuyComponent Directory (8+ instances)**

- `src/BuyComponents/OurService/OurServices.module.css`
- `src/BuyComponent/UsedvsBrand/UsedvsBrand.module.css`
- `src/BuyComponent/NewsLetter/NewsLetter.module.css`
- `src/BuyComponent/LearnTemplate/LearnTemplate.module.css`
- `src/assets/css/BuyCss.css`

### **Wrong Font Families**

- **Poppins** → IBM Plex Sans:
  - `src/features/checkout/components/CheckOut/RightCard.module.css`
  - `src/Components/FormPages/Step6/Step6.module.css`
- **Hedvig Letters Serif** → IBM Plex Sans:
  - `src/BuyComponent/UsedvsBrand/UsedvsBrand.module.css`
  - `src/BuyComponent/NewsLetter/NewsLetter.module.css`
- **Generic serif** → IBM Plex Sans:
  - `src/BuyComponent/LearnTemplate/LearnTemplate.module.css`

## 🎯 **Expected Benefits**

### **Consistency**

- ✅ Unified typography across entire application
- ✅ Consistent brand experience
- ✅ Better design system adherence

### **Maintainability**

- ✅ Single source of truth for font family
- ✅ Easy to change font globally via design tokens
- ✅ Reduced CSS duplication

### **Performance**

- ✅ Fewer font files to load
- ✅ Better font caching
- ✅ Reduced bundle size

### **Accessibility**

- ✅ Consistent reading experience
- ✅ Better font rendering across devices
- ✅ Improved legibility with system font fallbacks

## 📊 **Implementation Progress**

### **Phase 1: Design Tokens** ✅

- [x] Verify design tokens are correctly set
- [x] Ensure consistent font stack with system fallbacks

### **Phase 2: Replace Hardcoded Fonts** 🔄

- [ ] Features directory (22+ files)
- [ ] Components directory (15+ files)
- [ ] BuyComponent directory (8+ files)

### **Phase 3: Fix Wrong Fonts** 🔄

- [ ] Replace Poppins (2 instances)
- [ ] Replace Hedvig Letters Serif (3 instances)
- [ ] Replace generic serif (1 instance)

### **Phase 4: Verification** ⏳

- [ ] Search for any remaining hardcoded fonts
- [ ] Test font rendering across browsers
- [ ] Verify design consistency

## 🚀 **Implementation Strategy**

### **Automated Replacement**

Use find-and-replace operations to systematically update all font declarations:

1. **Replace hardcoded IBM Plex Sans**:

   ```css
   /* From */
   font-family: "IBM Plex Sans", sans-serif;
   font-family: "IBM Plex Sans";
   font-family: "IBM Plex Sans", sans-serif;
   font-family: "IBM Plex Sans";

   /* To */
   font-family: var(--font-family-primary);
   ```

2. **Replace wrong fonts**:

   ```css
   /* From */
   font-family: "Poppins";
   font-family: "Hedvig Letters Serif";
   font-family: serif;

   /* To */
   font-family: var(--font-family-primary);
   ```

### **Verification Commands**

```bash
# Search for any remaining hardcoded fonts
grep -r "font-family.*[\"']" src/ --include="*.css" --include="*.module.css"

# Search for specific problematic fonts
grep -r "Poppins\|Hedvig\|serif\|Arial\|Helvetica" src/ --include="*.css"
```

---

_Font standardization project_  
_Target: 100% IBM Plex Sans usage via design tokens_  
_Status: Ready for implementation_
