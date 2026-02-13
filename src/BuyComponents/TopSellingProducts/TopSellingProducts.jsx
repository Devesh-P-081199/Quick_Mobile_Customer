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
    <section className="w-full mt-12 mb-14 flex flex-col items-center mx-auto px-4 gap-8">
      {/* Top Selling Products - Aligned to Start */}
      <div className="w-full max-w-6xl  text-[24px] mb-1  font-medium font-['IBM Plex Sans']  font-[500] mb-6 ">
        Top Selling Products
      </div>

      {/* Card Container - Centered */}
      {/* Card Container - Scrollable Row */}
      <div
        ref={scrollRef}
        className="w-full max-w-6xl flex gap-4 overflow-x-auto whitespace-nowrap scrollbar-hidden "
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
