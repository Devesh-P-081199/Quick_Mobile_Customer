import { useRef } from "react";
import SellingProductCard from "./SellingProductCard";
import saleLogo from "../../assets/icons/Frame 27.svg";
import mobileLogo from "../../assets/icons/Frame 28.svg";
import ratings from "../../assets/icons/Frame 30.svg";
import leftCircleIcon from "../../assets/icons/frame 32.svg";
import rightCircleIcon from "../../assets/icons/Frame 42.svg";
const cardData = [
  {
    title: "Card 1",
    tag: "On Sale",
    logo: saleLogo,
    image: mobileLogo,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 2",
    tag: "On Sale",
    logo: saleLogo,
    image: mobileLogo,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 3",
    tag: "On Sale",
    logo: saleLogo,
    image: mobileLogo,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 4",
    tag: "On Sale",
    logo: saleLogo,
    image: mobileLogo,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 4",
    tag: "On Sale",
    logo: saleLogo,
    image: mobileLogo,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 5",
    tag: "On Sale",
    logo: saleLogo,
    image: mobileLogo,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
];

const TopSellingProducts = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="homepage-section flex flex-col items-center gap-8">
      {/* Top Selling Products - Aligned to Start */}
      <div className="section-title text-left w-full">Top Selling Products</div>

      {/* Card Container - Centered */}
      {/* Card Container - Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hidden w-full"
      >
        {cardData.map((card, index) => (
          <div key={index} className="">
            <SellingProductCard {...card} />
          </div>
        ))}
      </div>

      <div className=" w-full  mt-5 flex  gap-1 max-w-6xl ">
        <img
          src={leftCircleIcon}
          className="cursor-pointer"
          onClick={scrollLeft}
        />
        <img
          src={rightCircleIcon}
          className="cursor-pointer"
          onClick={scrollRight}
        />
      </div>
    </section>
  );
};

export default TopSellingProducts;
