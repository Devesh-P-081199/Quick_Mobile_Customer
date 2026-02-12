import Style from "./FooterContent.module.css";

function FooterContent({ page = "home" }) {
  const isHomePage = page === "home";

  if (isHomePage) {
    return (
      <div className={`page-content-wrapper ${Style.footerSection}`}>
        <div className={Style.footerContentContainer}>
          <div className={Style.sectionBlock}>
            <h1 className={Style.mainHeading}>
              Sell/Buy Your Old Mobile Phone Online with Quick Mobile
            </h1>
            <p className={Style.description}>
              Quick Mobile is one of the most trusted online platform in India for the sale of old mobile phones, the buying of refurbished mobiles, and offering of mobile phone repairs. All of these services are accessible in one place. We offer a process that is 100% transparent, secure, and fast, providing you to upgrade your device or earn instant cash without moving your home. In the current digital era, everyone seeks the most recent smartphone at the most competitive price.
            </p>
            <p className={Style.description}>
              Quick Mobile enables you to determine the value of your phone online, sell it at the most competitive market price, or purchase a high-quality refurbished smartphone at a reasonable price.
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Why Quick Mobile is the Most Effective Platform for Selling Old Phones
            </h3>
            <p className={Style.description}>
              Selling a second-hand phone can be both time-consuming and hazardous. Quick Mobile provides a hassle-free phone purchasing experience.

            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Where can I sell my Mobile phone online?
            </h3>
            <p className={Style.description}>
              You can immediately sell your used phone with Quick Mobile. There will be no more waiting for clients or bargaining.

            </p>
            <p className={Style.description}>
              Benefits:
              <br />
              * Best price Assured
              <br />
              *  Doorstep pickup throughout India

              <br />
              *  Bank transfer, or UPI for immediate payment

              <br />*  The process is completely transparent and secure.

            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Buy used or refurbished phones online

            </h3>
            <p className={Style.description}>
              Is there a concern about fraud when purchasing used phones? At Quick Mobile Technician tested and verified, and quality-certify all refurbished/resell mobile devices. Purchase device at prices that are up to 50-65% of new devices.
            </p>
          </div>

          {/* <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Professional Mobile & iPhone Repair Services
            </h3>
            <p className={Style.description}>
              Quick Mobile offers expert mobile phone repair services, including
              genuine iPhone repairs. All parts are replaced with certified
              components to ensure top performance.
            </p>
          </div> */}

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>Our Primary Advantages</h3>
            <p className={Style.description}>
              * The best price for used phones
              <br />
              * Certified Refurbished Phones 
              <br />
              * Safe and secure payments
              <br />
              * Service at your doorstep

            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
             Your Complete Mobile Marketplace 
            </h3>
            <p className={Style.description}>
              Quick Mobile provides a complete online solution for:
              <br />
              * Online sell of used devices 
              <br />
              *  Purchase refurbished mobile devices 

              <br />* Smartphones can be effortlessly repaired 
            </p>
            <p className={Style.description}>
              Visit Quick Mobile, Enter your Device details, give answer for device condition, and get an instant quote, and complete your process of in minutes
            </p>
            <p className={Style.description}>
              Quick Mobile - The smarter way to buy, sell, and repair Device (mobile, laptop, tablet, etc.) online.

            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>Quick Links</h3>
            <p className={Style.description}>
             Sell Old Apple Mobile | Sell Old Samsung Mobile | Sell Old OnePlus Mobile | Sell Old Oppo Mobile | Sell Old Vivo Mobile | Sell Old Huawei Mobile | Sell Old Xiaomi Mobile | Sell Old Motorola Mobile | Sell Old Google Mobile | Sell Old Lenovo Mobile | Sell Old Asus Mobile | Sell Old Nokia Mobile

            </p>
          </div>
        </div>
      </div>
    );
  }

  // Sell Page Content
  return (
    <div className={`page-content-wrapper ${Style.footerSection}`}>
      <div className={Style.footerContentContainer}>
        <div className={Style.sectionBlock}>
          <h2 className={Style.mainHeading}>
            Sell Your Mobile Phone Online with Quick Mobile
          </h2>
          <p className={Style.description}>
            Selling your old phone can be difficult when you have to find the
            right buyer and negotiate for a fair price. With Quick Mobile, you
            can now sell your old or broken phone online in just a few simple
            steps without leaving your home. We offer free doorstep pickup,
            instant payment, and the best resale value for your smartphone.
            <br />
            <br />
            Whether your phone is old, used, or damaged, Quick Mobile helps you
            turn it into instant cash while saving your time and effort.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>
            Why Sell Your Phone on Quick Mobile?
          </h3>
          <p className={Style.description}>
            Quick Mobile provides the most efficient and secure way to sell your
            smartphone online. Our easy process lets you sell, buy, or repair
            mobile phones on one trusted platform.
            <br />
            <br />
            * Sell in minutes
            <br />
            * Free doorstep pickup
            <br />
            * Instant cash or online payment
            <br />* 100% safe & transparent process
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>Where Can I Sell My Phone?</h3>
          <p className={Style.description}>
            Quick Mobile is the easiest answer.
            <br />
            We help you sell your old mobile phone in just a few steps.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>1. Check Your Phone Price</h3>
          <p className={Style.description}>
            Search your mobile model and get the best resale price instantly.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>2. Quote Your Device</h3>
          <p className={Style.description}>
            Answer a few questions about your phone’s condition and receive an
            instant quote.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>3. Schedule Free Pickup</h3>
          <p className={Style.description}>
            Choose a pickup time that suits you. Our executive will come to your
            doorstep and confirm before arriving.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>4. Get Instant Payment</h3>
          <p className={Style.description}>
            Once your phone is collected, you receive instant payment via UPI,
            bank transfer, or cash.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>100% Safe & Secure Process</h3>
          <p className={Style.description}>
            Your phone is in safe hands. After pickup:
            <br />
            <br />
            * Your data is fully erased (factory reset)
            <br />
            * Your privacy is protected
            <br />* Your device is refurbished or recycled responsibly
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>Common Questions</h3>
          <h3 className={Style.subHeading}>
            Where Can I Sell Broken Smartphones?
          </h3>
          <p className={Style.description}>
            With Quick Mobile, you can sell broken, used, or old phones safely.
            No more searching for buyers or worrying about fraud.
          </p>
          <br />
          <h3 className={Style.subHeading}>Will I Get a Good Price?</h3>
          <p className={Style.description}>
            Yes! We offer the best market value after carefully evaluating your
            device.
          </p>
          <br />
          <h3 className={Style.subHeading}>Is My Phone Safe?</h3>
          <p className={Style.description}>
            Absolutely. We follow strict privacy standards and provide 100% data
            wipe assurance.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>Trusted by Thousands</h3>
          <p className={Style.description}>
            Quick Mobile has safely sold 1,00,000+ phones with excellent
            customer reviews. Our technicians ensure complete data erasure so
            your personal photos, videos, and files are never compromised.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>Sell Your Old Phone Today</h3>
          <p className={Style.description}>
            If you’re wondering “How can I sell my mobile phone with best
            price?” Quick Mobile is your trusted solution.
            <br />
            <br />
            Quick Mobile - Sell your phone online safely, quickly, and at the
            best price.
          </p>
        </div>

        <div className={Style.sectionBlock}>
          <h3 className={Style.subHeading}>Quick Links</h3>
          <p className={Style.description}>
            Sell Old Apple Mobile | Sell Old Samsung Mobile | Sell Old OnePlus
            Mobile | Sell Old Oppo Mobile | Sell Old Vivo Mobile | Sell Old
            Huawei Mobile | Sell Old Xiaomi Mobile | Sell Old Motorola Mobile |
            Sell Old Google Mobile | Sell Old Lenovo Mobile | Sell Old Asus
            Mobile | Sell Old Nokia Mobile
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterContent;
