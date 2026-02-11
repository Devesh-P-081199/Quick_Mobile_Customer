import Style from "./FooterContent.module.css";

function FooterContent({ page = "home" }) {
  const isHomePage = page === "home";

  if (isHomePage) {
    return (
      <div className={`page-content-wrapper ${Style.footerSection}`}>
        <div className={Style.footerContentContainer}>
          <div className={Style.sectionBlock}>
            <h2 className={Style.mainHeading}>
              Buy or Sell Your Old Phone Online with Quick Mobile
            </h2>
            <p className={Style.description}>
              Quick Mobile is India’s trusted online platform to sell old mobile
              phones, buy refurbished mobiles, and get mobile phone repairs all
              in one place. We provide a fast, secure, and 100% transparent
              process so you can upgrade your device or earn instant cash
              without stepping out of your home. In today’s digital world,
              everyone wants the latest smartphone at the best price. Quick
              Mobile helps you check your phone’s value online, sell it at the
              best market price, or buy a high-quality refurbished smartphone at
              an affordable cost.
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Why Quick Mobile is the Best Platform to Sell Old Phones
            </h3>
            <p className={Style.description}>
              Selling a second-hand phone can be time-consuming and risky. With
              Quick Mobile, you get a hassle-free phone selling experience.
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Where Can I Sell My Phone Online?
            </h3>
            <p className={Style.description}>
              With Quick Mobile, you can sell your used phone instantly. No more
              waiting for buyers or bargaining.
            </p>
            <p className={Style.description}>
              Benefits:
              <br />
              * Best price guarantee
              <br />
              * Free doorstep pickup across India
              <br />
              * Instant payment via UPI, bank transfer, or cash
              <br />* 100% safe and transparent process
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Buy Refurbished and Second-Hand Mobiles Online
            </h3>
            <p className={Style.description}>
              Worried about fraud while buying used phones? At Quick Mobile, all
              refurbished mobiles are verified, tested, and quality certified by
              professionals. Get premium smartphones at up to 60% lower prices
              than new devices.
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Professional Mobile & iPhone Repair Services
            </h3>
            <p className={Style.description}>
              Quick Mobile offers expert mobile phone repair services, including
              genuine iPhone repairs. All parts are replaced with certified
              components to ensure top performance.
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>Our Core Advantages</h3>
            <p className={Style.description}>
              * Best Price for Old Phones
              <br />
              * Certified Refurbished Mobiles
              <br />
              * Fast and Reliable Repair Services
              <br />
              * Safe & Secure Transactions
              <br />* Quick Doorstep Service
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>
              Your One-Stop Mobile Marketplace
            </h3>
            <p className={Style.description}>
              Quick Mobile offers a complete online solution to:
              <br />
              * Sell old phones online
              <br />
              * Buy refurbished mobiles
              <br />* Repair smartphones easily
            </p>
            <p className={Style.description}>
              Visit Quick Mobile, enter your phone details, get an instant
              price, and complete your order in minutes.
            </p>
            <p className={Style.description}>
              Quick Mobile - The smarter way to buy, sell, and repair
              smartphones online.
            </p>
          </div>

          <div className={Style.sectionBlock}>
            <h3 className={Style.subHeading}>Quick Links</h3>
            <p className={Style.description}>
              Sell Old Apple Mobile | Sell Old Samsung Mobile | Sell Old OnePlus
              Mobile | Sell Old Oppo Mobile | Sell Old Vivo Mobile | Sell Old
              Huawei Mobile | Sell Old Xiaomi Mobile | Sell Old Motorola Mobile
              | Sell Old Google Mobile | Sell Old Lenovo Mobile | Sell Old Asus
              Mobile | Sell Old Nokia Mobile
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
