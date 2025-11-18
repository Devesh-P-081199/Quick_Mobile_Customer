# Recommended Project Structure - Complete Directory Map

## Project Overview

**Recommended Architecture:** Feature-Based Modular Structure  
**Framework:** React 18.3.1 with Vite 6.2.0  
**Styling:** Tailwind CSS + CSS Modules Hybrid  
**State Management:** Context API + Custom Hooks

## Complete Directory Structure Map

```
Quick_Mobile_Customer/
├── 📁 public/                              # Static public assets
│   ├── favicon.ico
│   ├── logo.png
│   ├── manifest.json
│   └── robots.txt
│
├── 📁 src/
│   ├── 📁 app/                             # App-level configuration
│   │   ├── App.jsx                         # Main app component
│   │   ├── main.jsx                        # App entry point
│   │   └── 📁 router/                      # Routing configuration
│   │       ├── AppRouter.jsx               # Main router component
│   │       ├── ProtectedRoute.jsx          # Auth-protected routes
│   │       ├── routes.js                   # Route definitions
│   │       └── routeConfig.js              # Route configuration
│   │
│   ├── 📁 assets/                          # Consolidated static assets
│   │   ├── 📁 icons/                       # All icon assets organized
│   │   │   ├── 📁 brands/                  # Brand logos and icons
│   │   │   │   ├── apple.svg
│   │   │   │   ├── samsung.svg
│   │   │   │   ├── google.svg
│   │   │   │   ├── oneplus.svg
│   │   │   │   └── [other brand icons]
│   │   │   ├── 📁 ui/                      # UI and interface icons
│   │   │   │   ├── search.svg
│   │   │   │   ├── cart.svg
│   │   │   │   ├── user.svg
│   │   │   │   ├── location.svg
│   │   │   │   ├── arrow-left.svg
│   │   │   │   ├── arrow-right.svg
│   │   │   │   └── [other UI icons]
│   │   │   ├── 📁 social/                  # Social media icons
│   │   │   │   ├── facebook.svg
│   │   │   │   ├── instagram.svg
│   │   │   │   ├── twitter.svg
│   │   │   │   └── youtube.svg
│   │   │   ├── 📁 devices/                 # Device category icons
│   │   │   │   ├── mobile.svg
│   │   │   │   ├── laptop.svg
│   │   │   │   ├── tablet.svg
│   │   │   │   ├── gaming-console.svg
│   │   │   │   └── headphones.svg
│   │   │   └── 📁 misc/                    # Miscellaneous icons
│   │   │       ├── star.svg
│   │   │       ├── check.svg
│   │   │       ├── info.svg
│   │   │       └── warning.svg
│   │   │
│   │   ├── 📁 images/                      # Image assets organized
│   │   │   ├── 📁 products/                # Product images
│   │   │   │   ├── 📁 phones/
│   │   │   │   │   ├── iphone-14.avif
│   │   │   │   │   ├── samsung-s21.avif
│   │   │   │   │   └── [other phone images]
│   │   │   │   ├── 📁 laptops/
│   │   │   │   ├── 📁 tablets/
│   │   │   │   ├── 📁 gaming/
│   │   │   │   └── 📁 accessories/
│   │   │   ├── 📁 banners/                 # Banner and hero images
│   │   │   │   ├── home-hero.png
│   │   │   │   ├── sell-banner.png
│   │   │   │   ├── buy-banner.png
│   │   │   │   └── thank-you-bg.png
│   │   │   ├── 📁 illustrations/           # Illustrations and graphics
│   │   │   │   ├── selling-process.png
│   │   │   │   ├── why-choose-us.png
│   │   │   │   └── testimonials-bg.png
│   │   │   └── 📁 static/                  # Static utility images
│   │   │       ├── placeholder.png
│   │   │       ├── no-image.svg
│   │   │       └── loading-spinner.gif
│   │   │
│   │   └── 📁 fonts/                       # Custom fonts (if any)
│   │       ├── IBMPlexSans-Regular.woff2
│   │       ├── IBMPlexSans-Bold.woff2
│   │       └── HedvigLettersSerif.woff2
│   │
│   ├── 📁 components/                      # Reusable UI components
│   │   ├── 📁 ui/                          # Basic UI building blocks
│   │   │   ├── 📁 Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Button.module.css
│   │   │   │   ├── Button.stories.js       # Storybook stories (optional)
│   │   │   │   └── index.js                # Barrel export
│   │   │   ├── 📁 Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Input.module.css
│   │   │   │   ├── TextInput.jsx
│   │   │   │   ├── NumberInput.jsx
│   │   │   │   ├── SearchInput.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Modal/
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Modal.module.css
│   │   │   │   ├── ModalHeader.jsx
│   │   │   │   ├── ModalBody.jsx
│   │   │   │   ├── ModalFooter.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Slider/
│   │   │   │   ├── Slider.jsx
│   │   │   │   ├── Slider.module.css
│   │   │   │   ├── RangeSlider.jsx
│   │   │   │   ├── ImageSlider.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Card/
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Card.module.css
│   │   │   │   ├── CardHeader.jsx
│   │   │   │   ├── CardBody.jsx
│   │   │   │   ├── CardFooter.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Loading/
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   ├── LoadingOverlay.jsx
│   │   │   │   ├── Loading.module.css
│   │   │   │   └── index.js
│   │   │   ├── 📁 Badge/
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Badge.module.css
│   │   │   │   └── index.js
│   │   │   ├── 📁 Tooltip/
│   │   │   │   ├── Tooltip.jsx
│   │   │   │   ├── Tooltip.module.css
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Main UI barrel export
│   │   │
│   │   ├── 📁 layout/                      # Layout-specific components
│   │   │   ├── 📁 Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Header.module.css
│   │   │   │   ├── DesktopHeader.jsx
│   │   │   │   ├── MobileHeader.jsx
│   │   │   │   ├── HeaderSearch.jsx
│   │   │   │   ├── HeaderNavigation.jsx
│   │   │   │   ├── LocationSelector.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Footer/
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Footer.module.css
│   │   │   │   ├── FooterLinks.jsx
│   │   │   │   ├── FooterSocial.jsx
│   │   │   │   ├── FooterNewsletter.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Sidebar.module.css
│   │   │   │   ├── SidebarMenu.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Navigation/
│   │   │   │   ├── MainNavigation.jsx
│   │   │   │   ├── BreadCrumb.jsx
│   │   │   │   ├── TabNavigation.jsx
│   │   │   │   ├── Navigation.module.css
│   │   │   │   └── index.js
│   │   │   ├── 📁 Container/
│   │   │   │   ├── PageContainer.jsx
│   │   │   │   ├── ContentContainer.jsx
│   │   │   │   ├── Container.module.css
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Layout barrel export
│   │   │
│   │   ├── 📁 forms/                       # Form-specific components
│   │   │   ├── 📁 FormControls/
│   │   │   │   ├── FormField.jsx
│   │   │   │   ├── FormGroup.jsx
│   │   │   │   ├── FormLabel.jsx
│   │   │   │   ├── FormError.jsx
│   │   │   │   ├── FormControls.module.css
│   │   │   │   └── index.js
│   │   │   ├── 📁 Validation/
│   │   │   │   ├── ValidationMessage.jsx
│   │   │   │   ├── ValidationIcon.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 Inputs/
│   │   │   │   ├── PhoneInput.jsx
│   │   │   │   ├── OTPInput.jsx
│   │   │   │   ├── AddressInput.jsx
│   │   │   │   ├── PriceInput.jsx
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Forms barrel export
│   │   │
│   │   ├── 📁 common/                      # Common business components
│   │   │   ├── 📁 ProductCard/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   ├── ProductCard.module.css
│   │   │   │   ├── ProductImage.jsx
│   │   │   │   ├── ProductInfo.jsx
│   │   │   │   ├── ProductPrice.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 BrandCard/
│   │   │   │   ├── BrandCard.jsx
│   │   │   │   ├── BrandCard.module.css
│   │   │   │   ├── BrandLogo.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 PriceSlider/
│   │   │   │   ├── PriceSlider.jsx
│   │   │   │   ├── PriceSlider.module.css
│   │   │   │   ├── PriceRange.jsx
│   │   │   │   ├── PriceDisplay.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 DeviceSelector/
│   │   │   │   ├── DeviceSelector.jsx
│   │   │   │   ├── DeviceSelector.module.css
│   │   │   │   ├── DeviceGrid.jsx
│   │   │   │   ├── DeviceFilter.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 TestimonialCard/
│   │   │   │   ├── TestimonialCard.jsx
│   │   │   │   ├── TestimonialCard.module.css
│   │   │   │   └── index.js
│   │   │   ├── 📁 FAQ/
│   │   │   │   ├── FAQItem.jsx
│   │   │   │   ├── FAQList.jsx
│   │   │   │   ├── FAQ.module.css
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Common barrel export
│   │   │
│   │   └── index.js                        # Main components barrel export
│   │
│   ├── 📁 features/                        # Feature-based modules
│   │   ├── 📁 auth/                        # Authentication feature
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 LoginForm/
│   │   │   │   │   ├── LoginForm.jsx
│   │   │   │   │   ├── LoginForm.module.css
│   │   │   │   │   ├── LoginFields.jsx
│   │   │   │   │   ├── LoginActions.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 SignupForm/
│   │   │   │   │   ├── SignupForm.jsx
│   │   │   │   │   ├── SignupForm.module.css
│   │   │   │   │   ├── SignupSteps.jsx
│   │   │   │   │   ├── SignupValidation.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 OTPVerification/
│   │   │   │   │   ├── OTPVerification.jsx
│   │   │   │   │   ├── OTPVerification.module.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 ForgotPassword/
│   │   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   │   ├── ForgotPassword.module.css
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useAuth.js
│   │   │   │   ├── useLogin.js
│   │   │   │   ├── useSignup.js
│   │   │   │   ├── useOTPVerification.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 services/
│   │   │   │   ├── authService.js
│   │   │   │   ├── tokenService.js
│   │   │   │   ├── validationService.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 pages/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── SignupPage.jsx
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 utils/
│   │   │   │   ├── authValidators.js
│   │   │   │   ├── authHelpers.js
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Auth feature barrel export
│   │   │
│   │   ├── 📁 sell/                        # Sell device feature
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 DeviceSelector/
│   │   │   │   │   ├── CategorySelector.jsx
│   │   │   │   │   ├── BrandSelector.jsx
│   │   │   │   │   ├── SeriesSelector.jsx
│   │   │   │   │   ├── ModelSelector.jsx
│   │   │   │   │   ├── VariantSelector.jsx
│   │   │   │   │   ├── DeviceSelector.module.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 PriceCalculator/
│   │   │   │   │   ├── PriceCalculator.jsx
│   │   │   │   │   ├── PriceCalculator.module.css
│   │   │   │   │   ├── PriceBreakdown.jsx
│   │   │   │   │   ├── PriceEstimator.jsx
│   │   │   │   │   ├── PriceSummary.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 ConditionForm/
│   │   │   │   │   ├── ConditionForm.jsx
│   │   │   │   │   ├── ConditionForm.module.css
│   │   │   │   │   ├── ConditionQuestions.jsx
│   │   │   │   │   ├── ConditionSlider.jsx
│   │   │   │   │   ├── ConditionSummary.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 SellBanner/
│   │   │   │   │   ├── SellBanner.jsx
│   │   │   │   │   ├── SellBanner.module.css
│   │   │   │   │   ├── SellHero.jsx
│   │   │   │   │   ├── SellFeatures.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 ProcessSteps/
│   │   │   │   │   ├── ProcessSteps.jsx
│   │   │   │   │   ├── ProcessSteps.module.css
│   │   │   │   │   ├── StepIndicator.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useDevicePrice.js
│   │   │   │   ├── useSellFlow.js
│   │   │   │   ├── useConditionForm.js
│   │   │   │   ├── usePriceCalculator.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 services/
│   │   │   │   ├── sellService.js
│   │   │   │   ├── priceService.js
│   │   │   │   ├── deviceService.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 pages/
│   │   │   │   ├── SellHomePage.jsx
│   │   │   │   ├── DeviceSelectionPage.jsx
│   │   │   │   ├── PriceCalculatorPage.jsx
│   │   │   │   ├── ConditionFormPage.jsx
│   │   │   │   ├── PriceSummaryPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 utils/
│   │   │   │   ├── priceCalculations.js
│   │   │   │   ├── deviceValidators.js
│   │   │   │   ├── sellHelpers.js
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Sell feature barrel export
│   │   │
│   │   ├── 📁 buy/                         # Buy device feature
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 ProductListing/
│   │   │   │   │   ├── ProductListing.jsx
│   │   │   │   │   ├── ProductListing.module.css
│   │   │   │   │   ├── ProductGrid.jsx
│   │   │   │   │   ├── ProductFilters.jsx
│   │   │   │   │   ├── ProductSort.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 ProductDetails/
│   │   │   │   │   ├── ProductDetails.jsx
│   │   │   │   │   ├── ProductDetails.module.css
│   │   │   │   │   ├── ProductGallery.jsx
│   │   │   │   │   ├── ProductSpecs.jsx
│   │   │   │   │   ├── ProductReviews.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 HomeSlider/
│   │   │   │   │   ├── HomeSlider.jsx
│   │   │   │   │   ├── HomeSlider.module.css
│   │   │   │   │   ├── SliderControls.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 FeaturedProducts/
│   │   │   │   │   ├── FeaturedProducts.jsx
│   │   │   │   │   ├── FeaturedProducts.module.css
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 Testimonials/
│   │   │   │   │   ├── Testimonials.jsx
│   │   │   │   │   ├── Testimonials.module.css
│   │   │   │   │   ├── TestimonialSlider.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useProducts.js
│   │   │   │   ├── useProductFilters.js
│   │   │   │   ├── useProductDetails.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 services/
│   │   │   │   ├── productService.js
│   │   │   │   ├── reviewService.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 pages/
│   │   │   │   ├── BuyHomePage.jsx
│   │   │   │   ├── ProductListingPage.jsx
│   │   │   │   ├── ProductDetailsPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 utils/
│   │   │   │   ├── productHelpers.js
│   │   │   │   ├── filterHelpers.js
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Buy feature barrel export
│   │   │
│   │   ├── 📁 profile/                     # User profile feature
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 ProfileCard/
│   │   │   │   │   ├── ProfileCard.jsx
│   │   │   │   │   ├── ProfileCard.module.css
│   │   │   │   │   ├── ProfileAvatar.jsx
│   │   │   │   │   ├── ProfileInfo.jsx
│   │   │   │   │   ├── ProfileActions.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 AddressForm/
│   │   │   │   │   ├── AddressForm.jsx
│   │   │   │   │   ├── AddressForm.module.css
│   │   │   │   │   ├── AddressList.jsx
│   │   │   │   │   ├── AddressCard.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 PaymentMethods/
│   │   │   │   │   ├── PaymentMethods.jsx
│   │   │   │   │   ├── PaymentMethods.module.css
│   │   │   │   │   ├── PaymentCard.jsx
│   │   │   │   │   ├── AddPaymentMethod.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 OrderHistory/
│   │   │   │   │   ├── OrderHistory.jsx
│   │   │   │   │   ├── OrderHistory.module.css
│   │   │   │   │   ├── OrderCard.jsx
│   │   │   │   │   ├── OrderDetails.jsx
│   │   │   │   │   ├── OrderStatus.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 ProfileSettings/
│   │   │   │   │   ├── ProfileSettings.jsx
│   │   │   │   │   ├── ProfileSettings.module.css
│   │   │   │   │   ├── PersonalInfo.jsx
│   │   │   │   │   ├── SecuritySettings.jsx
│   │   │   │   │   ├── NotificationSettings.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useProfile.js
│   │   │   │   ├── useAddresses.js
│   │   │   │   ├── usePaymentMethods.js
│   │   │   │   ├── useOrderHistory.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 services/
│   │   │   │   ├── profileService.js
│   │   │   │   ├── addressService.js
│   │   │   │   ├── paymentService.js
│   │   │   │   ├── orderService.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 pages/
│   │   │   │   ├── ProfilePage.jsx
│   │   │   │   ├── AddressPage.jsx
│   │   │   │   ├── PaymentMethodsPage.jsx
│   │   │   │   ├── OrdersPage.jsx
│   │   │   │   ├── SettingsPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 utils/
│   │   │   │   ├── profileValidators.js
│   │   │   │   ├── addressHelpers.js
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Profile feature barrel export
│   │   │
│   │   ├── 📁 checkout/                    # Checkout feature
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 Cart/
│   │   │   │   │   ├── Cart.jsx
│   │   │   │   │   ├── Cart.module.css
│   │   │   │   │   ├── CartItem.jsx
│   │   │   │   │   ├── CartSummary.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 CheckoutForm/
│   │   │   │   │   ├── CheckoutForm.jsx
│   │   │   │   │   ├── CheckoutForm.module.css
│   │   │   │   │   ├── ShippingInfo.jsx
│   │   │   │   │   ├── BillingInfo.jsx
│   │   │   │   │   ├── OrderSummary.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 PaymentForm/
│   │   │   │   │   ├── PaymentForm.jsx
│   │   │   │   │   ├── PaymentForm.module.css
│   │   │   │   │   ├── PaymentMethods.jsx
│   │   │   │   │   ├── PaymentDetails.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 OrderConfirmation/
│   │   │   │   │   ├── OrderConfirmation.jsx
│   │   │   │   │   ├── OrderConfirmation.module.css
│   │   │   │   │   ├── OrderDetails.jsx
│   │   │   │   │   ├── ThankYouMessage.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useCart.js
│   │   │   │   ├── useCheckout.js
│   │   │   │   ├── usePayment.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 services/
│   │   │   │   ├── cartService.js
│   │   │   │   ├── checkoutService.js
│   │   │   │   ├── paymentService.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 pages/
│   │   │   │   ├── CartPage.jsx
│   │   │   │   ├── CheckoutPage.jsx
│   │   │   │   ├── PaymentPage.jsx
│   │   │   │   ├── ThankYouPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 utils/
│   │   │   │   ├── cartHelpers.js
│   │   │   │   ├── checkoutValidators.js
│   │   │   │   ├── paymentHelpers.js
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Checkout feature barrel export
│   │   │
│   │   ├── 📁 search/                      # Search feature
│   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 SearchBar/
│   │   │   │   │   ├── SearchBar.jsx
│   │   │   │   │   ├── SearchBar.module.css
│   │   │   │   │   ├── SearchInput.jsx
│   │   │   │   │   ├── SearchSuggestions.jsx
│   │   │   │   │   ├── SearchFilters.jsx
│   │   │   │   │   └── index.js
│   │   │   │   ├── 📁 SearchResults/
│   │   │   │   │   ├── SearchResults.jsx
│   │   │   │   │   ├── SearchResults.module.css
│   │   │   │   │   ├── ResultsList.jsx
│   │   │   │   │   ├── NoResults.jsx
│   │   │   │   │   └── index.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 hooks/
│   │   │   │   ├── useSearch.js
│   │   │   │   ├── useSearchSuggestions.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 services/
│   │   │   │   ├── searchService.js
│   │   │   │   └── index.js
│   │   │   ├── 📁 pages/
│   │   │   │   ├── SearchPage.jsx
│   │   │   │   └── index.js
│   │   │   ├── 📁 utils/
│   │   │   │   ├── searchHelpers.js
│   │   │   │   └── index.js
│   │   │   └── index.js                    # Search feature barrel export
│   │   │
│   │   └── index.js                        # Main features barrel export
│   │
│   ├── 📁 hooks/                           # Global custom hooks
│   │   ├── useApi.js                       # Generic API hook
│   │   ├── useLocalStorage.js              # Local storage hook
│   │   ├── useSessionStorage.js            # Session storage hook
│   │   ├── useDebounce.js                  # Debounce hook
│   │   ├── useThrottle.js                  # Throttle hook
│   │   ├── useWindowSize.js                # Window size hook
│   │   ├── useClickOutside.js              # Click outside hook
│   │   ├── useIntersectionObserver.js      # Intersection observer hook
│   │   ├── usePagination.js                # Pagination hook
│   │   ├── useForm.js                      # Form management hook
│   │   ├── useAsync.js                     # Async operations hook
│   │   └── index.js                        # Hooks barrel export
│   │
│   ├── 📁 services/                        # API and external services
│   │   ├── 📁 api/                         # API configuration
│   │   │   ├── client.js                   # Axios client configuration
│   │   │   ├── endpoints.js                # API endpoints
│   │   │   ├── interceptors.js             # Request/response interceptors
│   │   │   ├── errorHandler.js             # Global error handling
│   │   │   └── index.js
│   │   ├── 📁 storage/                     # Storage services
│   │   │   ├── localStorage.js             # Local storage service
│   │   │   ├── sessionStorage.js           # Session storage service
│   │   │   ├── cookieStorage.js            # Cookie storage service
│   │   │   └── index.js
│   │   ├── 📁 external/                    # External service integrations
│   │   │   ├── analyticsService.js         # Analytics integration
│   │   │   ├── paymentGateway.js           # Payment gateway integration
│   │   │   ├── notificationService.js      # Push notifications
│   │   │   └── index.js
│   │   ├── 📁 utils/                       # Service utilities
│   │   │   ├── formatters.js               # Data formatters
│   │   │   ├── validators.js               # Data validators
│   │   │   ├── transformers.js             # Data transformers
│   │   │   └── index.js
│   │   └── index.js                        # Services barrel export
│   │
│   ├── 📁 store/                           # State management
│   │   ├── 📁 context/                     # React Context providers
│   │   │   ├── AuthContext.jsx             # Authentication context
│   │   │   ├── CartContext.jsx             # Shopping cart context
│   │   │   ├── ThemeContext.jsx            # Theme context
│   │   │   ├── NotificationContext.jsx     # Notification context
│   │   │   ├── SearchContext.jsx           # Search context
│   │   │   └── index.js
│   │   ├── 📁 reducers/                    # State reducers
│   │   │   ├── authReducer.js              # Auth state reducer
│   │   │   ├── cartReducer.js              # Cart state reducer
│   │   │   ├── uiReducer.js                # UI state reducer
│   │   │   └── index.js
│   │   ├── 📁 actions/                     # Action creators
│   │   │   ├── authActions.js              # Auth actions
│   │   │   ├── cartActions.js              # Cart actions
│   │   │   ├── uiActions.js                # UI actions
│   │   │   └── index.js
│   │   ├── 📁 selectors/                   # State selectors
│   │   │   ├── authSelectors.js            # Auth selectors
│   │   │   ├── cartSelectors.js            # Cart selectors
│   │   │   └── index.js
│   │   └── index.js                        # Store barrel export
│   │
│   ├── 📁 styles/                          # Global styles and design system
│   │   ├── globals.css                     # Global styles entry point
│   │   ├── variables.css                   # CSS custom properties
│   │   ├── 📁 foundation/                  # Foundation styles
│   │   │   ├── reset.css                   # CSS reset
│   │   │   ├── base.css                    # Base element styles
│   │   │   ├── typography.css              # Typography system
│   │   │   ├── colors.css                  # Color system
│   │   │   └── index.css
│   │   ├── 📁 layout/                      # Layout utilities
│   │   │   ├── containers.css              # Container styles
│   │   │   ├── grid.css                    # Grid system
│   │   │   ├── flexbox.css                 # Flexbox utilities
│   │   │   ├── spacing.css                 # Spacing utilities
│   │   │   └── index.css
│   │   ├── 📁 components/                  # Component styles
│   │   │   ├── buttons.css                 # Button component styles
│   │   │   ├── forms.css                   # Form component styles
│   │   │   ├── cards.css                   # Card component styles
│   │   │   ├── modals.css                  # Modal component styles
│   │   │   ├── navigation.css              # Navigation component styles
│   │   │   ├── tables.css                  # Table component styles
│   │   │   └── index.css
│   │   ├── 📁 utilities/                   # Utility classes
│   │   │   ├── display.css                 # Display utilities
│   │   │   ├── positioning.css             # Position utilities
│   │   │   ├── sizing.css                  # Size utilities
│   │   │   ├── text.css                    # Text utilities
│   │   │   ├── borders.css                 # Border utilities
│   │   │   ├── shadows.css                 # Shadow utilities
│   │   │   ├── animations.css              # Animation utilities
│   │   │   ├── responsive.css              # Responsive utilities
│   │   │   └── index.css
│   │   ├── 📁 themes/                      # Theme variations
│   │   │   ├── light.css                   # Light theme
│   │   │   ├── dark.css                    # Dark theme
│   │   │   └── index.css
│   │   └── index.css                       # Main styles barrel export
│   │
│   ├── 📁 utils/                           # Utility functions
│   │   ├── constants.js                    # Application constants
│   │   ├── config.js                       # Configuration settings
│   │   ├── helpers.js                      # General helper functions
│   │   ├── formatters.js                   # Data formatting utilities
│   │   ├── validators.js                   # Validation utilities
│   │   ├── dateUtils.js                    # Date manipulation utilities
│   │   ├── stringUtils.js                  # String manipulation utilities
│   │   ├── numberUtils.js                  # Number manipulation utilities
│   │   ├── urlUtils.js                     # URL manipulation utilities
│   │   ├── deviceUtils.js                  # Device detection utilities
│   │   ├── performanceUtils.js             # Performance utilities
│   │   ├── debugUtils.js                   # Debug utilities
│   │   └── index.js                        # Utils barrel export
│   │
│   ├── 📁 types/                           # TypeScript types (if using TS)
│   │   ├── api.ts                          # API response types
│   │   ├── components.ts                   # Component prop types
│   │   ├── auth.ts                         # Authentication types
│   │   ├── product.ts                      # Product types
│   │   ├── user.ts                         # User types
│   │   ├── common.ts                       # Common types
│   │   └── index.ts                        # Types barrel export
│   │
│   └── 📁 __tests__/                       # Test files (optional)
│       ├── 📁 components/                  # Component tests
│       ├── 📁 features/                    # Feature tests
│       ├── 📁 hooks/                       # Hook tests
│       ├── 📁 services/                    # Service tests
│       ├── 📁 utils/                       # Utility tests
│       ├── setupTests.js                   # Test setup
│       └── testUtils.js                    # Test utilities
│
├── 📄 package.json                         # Dependencies and scripts
├── 📄 vite.config.js                       # Vite configuration
├── 📄 tailwind.config.js                   # Tailwind CSS configuration
├── 📄 postcss.config.js                    # PostCSS configuration
├── 📄 eslint.config.js                     # ESLint configuration
├── 📄 prettier.config.js                   # Prettier configuration
├── 📄 .gitignore                           # Git ignore rules
├── 📄 README.md                            # Project documentation
├── 📄 CHANGELOG.md                         # Change log
├── 📄 .env.example                         # Environment variables example
└── 📄 .env.local                           # Local environment variables
```

## Key Architectural Improvements

### 🏗️ **Feature-Based Organization**

Each major feature (auth, sell, buy, profile, checkout) is self-contained with:

- **Components** - Feature-specific UI components
- **Hooks** - Feature-specific custom hooks
- **Services** - Feature-specific API calls and business logic
- **Pages** - Feature-specific page components
- **Utils** - Feature-specific utility functions

### 🧩 **Component Hierarchy**

```
components/
├── ui/           # Basic, reusable UI building blocks
├── layout/       # Layout and structural components
├── forms/        # Form-specific components
└── common/       # Business logic components
```

### 🎨 **Styling Architecture**

```
styles/
├── globals.css       # Single entry point
├── foundation/       # Base styles and design tokens
├── layout/          # Layout utilities
├── components/      # Component-specific styles
├── utilities/       # Utility classes
└── themes/          # Theme variations
```

### 📦 **Asset Organization**

```
assets/
├── icons/
│   ├── brands/      # Brand-specific icons
│   ├── ui/          # Interface icons
│   ├── social/      # Social media icons
│   ├── devices/     # Device category icons
│   └── misc/        # Miscellaneous icons
├── images/
│   ├── products/    # Product images by category
│   ├── banners/     # Marketing banners
│   ├── illustrations/ # Graphics and illustrations
│   └── static/      # Utility images
└── fonts/           # Custom fonts
```

## Barrel Export System

### 📤 **Export Strategy**

Every folder contains an `index.js` file that exports all components/functions:

```javascript
// components/ui/index.js
export { default as Button } from "./Button";
export { default as Input } from "./Input";
export { default as Modal } from "./Modal";
export { default as Slider } from "./Slider";

// features/sell/index.js
export { default as SellHomePage } from "./pages/SellHomePage";
export { default as DeviceSelector } from "./components/DeviceSelector";
export { default as PriceCalculator } from "./components/PriceCalculator";
```

### 🔗 **Import Benefits**

```javascript
// Before (current structure)
import Header from "../../Common/Header/Header";
import Footer from "../../Common/Footer/Footer";
import BrandCard from "../../../Shared/BrandCard/BrandCard";

// After (recommended structure)
import { Header, Footer } from "@/components/layout";
import { BrandCard } from "@/components/common";
import { SellHomePage, DeviceSelector } from "@/features/sell";
```

## Path Alias Configuration

### ⚙️ **Vite Configuration**

```javascript
// vite.config.js
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/hooks": path.resolve(__dirname, "./src/hooks"),
      "@/services": path.resolve(__dirname, "./src/services"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
```

## Component Co-location Strategy

### 📁 **Component Structure Pattern**

```
ComponentName/
├── ComponentName.jsx           # Main component
├── ComponentName.module.css    # Scoped styles
├── ComponentName.stories.js    # Storybook stories (optional)
├── ComponentName.test.js       # Unit tests (optional)
├── SubComponent.jsx            # Sub-components
├── hooks/                      # Component-specific hooks
│   └── useComponentName.js
├── utils/                      # Component-specific utilities
│   └── componentHelpers.js
└── index.js                    # Barrel export
```

## State Management Architecture

### 🔄 **Context + Hooks Pattern**

```
store/
├── context/          # React Context providers
├── reducers/         # State reducers
├── actions/          # Action creators
└── selectors/        # State selectors
```

## Service Layer Architecture

### 🌐 **API Service Pattern**

```
services/
├── api/              # API configuration
├── storage/          # Storage services
├── external/         # External integrations
└── utils/            # Service utilities
```

## Benefits of This Structure

### ✅ **Scalability**

- Easy to add new features without affecting existing code
- Clear boundaries between different parts of the application
- Modular architecture supports team collaboration

### ✅ **Maintainability**

- Consistent patterns across all features
- Easy to locate and modify specific functionality
- Clear separation of concerns

### ✅ **Performance**

- Better code splitting opportunities
- Lazy loading at feature level
- Optimized bundle sizes

### ✅ **Developer Experience**

- Intuitive folder structure
- Consistent import patterns
- Easy navigation and discovery

### ✅ **Testing**

- Co-located test files
- Feature-specific test utilities
- Clear testing boundaries

This recommended structure transforms the current chaotic organization into a clean, scalable, and maintainable architecture that will support long-term growth and team collaboration.
