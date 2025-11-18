import React, { useRef, useEffect, useState } from "react";
import saleLogo from "../../assets/icons/Frame 27.svg";

import headPhone from "../../assets/icons/Headphone-2-673x1024 1 (1).svg";
import gameController from "../../assets/icons/gameController.svg";
import mouse from "../../assets/icons/mouse.svg";
import ratings from "../../assets/icons/Frame 30.svg";
import leftCircleIcon from "../../assets/icons/frame 32.svg";
import rightCircleIcon from "../../assets/icons/Frame 42.svg";
import SellingProductCard from "../TopSellingProducts/SellingProductCard";

const cardData = [
  {
    title: "Card 1",
    tag: "On Sale",
    logo: saleLogo,
    image: headPhone,
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
    image: gameController,
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
    image: mouse,
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
    image: headPhone,
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
    image: headPhone,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 6",
    tag: "On Sale",
    logo: saleLogo,
    image: headPhone,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 7",
    tag: "On Sale",
    logo: saleLogo,
    image: headPhone,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
  {
    title: "Card 8",
    tag: "On Sale",
    logo: saleLogo,
    image: headPhone,
    description: "iPhone 16 - Unlocked",
    specification: "64GB -Black",
    number: "4.2(2,456)",
    rating: ratings,
    startingText: "Starting at",
    endTextOne: "$39,999",
    endTextTwo: "$39,999",
  },
];

const SellingAccessories = () => {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth + 24); // Adding margin/padding if needed
    }
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section className="homepage-section w-full flex flex-col items-center gap-8">
      <div className="w-full text-[24px] mb-1 font-medium font-['IBM Plex Sans'] font-[500] mb-6">
        Top Selling Accessories
      </div>

      <div
        ref={scrollRef}
        className="w-full flex gap-4 overflow-x-auto padding-margin-balance whitespace-nowrap scrollbar-hidden"
      >
        {cardData.map((card, index) => (
          <div key={index} ref={index === 0 ? cardRef : null}>
            <SellingProductCard {...card} />
          </div>
        ))}
      </div>

      <div className="w-full flex mt-5 gap-1 max-w-6xl">
        <img
          src={leftCircleIcon}
          className="cursor-pointer"
          onClick={scrollLeft}
          alt="Left Arrow"
        />
        <img
          src={rightCircleIcon}
          className="cursor-pointer"
          onClick={scrollRight}
          alt="Right Arrow"
        />
      </div>
    </section>
  );
};

export default SellingAccessories;
