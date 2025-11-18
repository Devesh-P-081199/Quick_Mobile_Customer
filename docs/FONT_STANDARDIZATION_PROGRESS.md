# Font Standardization Implementation Progress

## 🎯 **Target Font Family**

`"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`

## ✅ **Completed Replacements**

### **Wrong Font Families Fixed**

1. ✅ **Poppins → IBM Plex Sans**

   - `src/features/checkout/components/CheckOut/RightCard.module.css`
   - `src/Components/FormPages/Step6/Step6.module.css`

2. ✅ **Hedvig Letters Serif → IBM Plex Sans**

   - `src/BuyComponent/UsedvsBrand/UsedvsBrand.module.css` (2 instances)
   - `src/BuyComponent/NewsLetter/NewsLetter.module.css`

3. ✅ **Generic serif → IBM Plex Sans**

   - `src/BuyComponent/LearnTemplate/LearnTemplate.module.css`

4. ✅ **Hardcoded IBM Plex Sans → Design Tokens**
   - `src/features/checkout/components/Payment/Payment.module.css`
   - `src/features/sell/components/WhySellYourPhone/WhySell.module.css`
   - `src/features/sell/components/SellDeviceVarientSelect/SellDeviceVarient.module.css` (2 instances)

## 🔄 **Remaining Hardcoded IBM Plex Sans to Replace**

### **Features Directory**

- [ ] `src/features/sell/components/SellBanner/SellBanner.module.css`
- [ ] `src/features/sell/components/SelectSeries/SelectSeries.module.css`
- [ ] `src/features/sell/components/SelectSubCategories/SelectSubCata.module.css`
- [ ] `src/features/sell/components/SelectSubCategories/SelectSeries.module.css`
- [ ] `src/features/sell/components/SelectModel/SelectModel.module.css`
- [ ] `src/features/sell/components/SelectBrand/SelectBrand.module.css`
- [ ] `src/features/sell/components/GetUpto/GetUpto.module.css`
- [ ] `src/features/profile/components/SetupProfile/SetupProfile.module.css`
- [ ] `src/features/profile/components/Signup/Signup.module.css`
- [ ] `src/features/checkout/components/CheckOut/RightCard.module.css` (remaining instances)

### **Components Directory**

- [ ] `src/Components/TopSellingProducts/TopSellingProduct.module.css`
- [ ] `src/Components/SuggestionProductSlider/SuggestionProductSlider.module.css`
- [ ] `src/Components/SelectedSeries/SelectedSeries.module.css`
- [ ] `src/Components/ProfileModule2/MyOrder/MyOrder.module.css`
- [ ] `src/Components/layout/Footer/Footer.module.css`
- [ ] `src/Components/layout/FAQ/FAQ.module.css`
- [ ] `src/Components/BrowsePicks/BrowsePicks.module.css`

### **BuyComponent Directory**

- [ ] `src/BuyComponents/OurService/OurServices.module.css`
- [ ] `src/assets/css/BuyCss.css`

## 🚀 **Systematic Replacement Strategy**

### **Pattern 1: Standard IBM Plex Sans**

```css
/* Find and replace */
font-family: "IBM Plex Sans", sans-serif;
font-family: "IBM Plex Sans";
font-family: "IBM Plex Sans", sans-serif;
font-family: "IBM Plex Sans";

/* Replace with */
font-family: var(--font-family-primary);
```

### **Pattern 2: IBM Plex Mono (Keep as IBM Plex Sans)**

```css
/* Find and replace */
font-family: "IBM Plex Mono";
font-family: "IBM Plex Mono";

/* Replace with */
font-family: var(--font-family-primary);
```

## 📊 **Progress Tracking**

### **Completed: 8/45+ instances** ✅

- ✅ Wrong fonts fixed (Poppins, Hedvig, serif)
- ✅ Initial hardcoded IBM Plex Sans replacements

### **Remaining: 37+ instances** 🔄

- 🔄 Features directory (15+ instances)
- 🔄 Components directory (12+ instances)
- 🔄 BuyComponent directory (10+ instances)

### **Estimated Completion**

- **Time**: 15-20 minutes for systematic replacement
- **Files**: 25+ CSS/module.css files
- **Impact**: 100% font consistency across application

## 🎯 **Next Steps**

### **Immediate Actions**

1. Continue systematic replacement of hardcoded font families
2. Use design tokens (`var(--font-family-primary)`) for all instances
3. Verify no other font families exist in the system

### **Verification Steps**

1. Search for any remaining hardcoded fonts
2. Test font rendering across browsers
3. Verify design consistency
4. Update documentation

## 📝 **Benefits Achieved So Far**

### **Consistency Improvements**

- ✅ Eliminated wrong font families (Poppins, Hedvig, serif)
- ✅ Started standardization with design tokens
- ✅ Improved brand consistency

### **Maintainability**

- ✅ Easier to change font globally via design tokens
- ✅ Reduced font-related CSS duplication
- ✅ Better design system adherence

---

_Font standardization in progress_  
_Target: 100% IBM Plex Sans usage via design tokens_  
_Current progress: 18% complete_
