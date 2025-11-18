import React from "react";
import TestimonialCards from "./TestimonialCards";

import leftCircleIcon from "../../assets/icons/frame 32.svg";
import rightCircleIcon from "../../assets/icons/Frame 42.svg";

import iPhoneFirstImage from "../../assets/icons/Frame 148.svg";
import iPhoneSecondImage from "../../assets/icons/Frame 148 (1).svg";
import iPhoneThirdImage from "../../assets/icons/Frame 148 (2).svg";
import iPhoneFourImage from "../../assets/icons/Frame 148 (3).svg";
import photoLogo from "../../assets/icons/Ellipse 3.svg";
import ratings from "../../assets/icons/Frame 30.svg";
import CommonSlider from "../../Shared/Slider/CommonSlider";

const cardData = [
  {
    title: "Card 1",
    image: iPhoneFirstImage,
    photoLogo,
    rating: ratings,
    imageTitle: "Willian Vangence",
    imageDescription: "Purchased on October 14, 2024",
    ratingNumbers: 4.2,
  },
   {
    title: "Card 2",
    image: iPhoneFirstImage,
    photoLogo,
    rating: ratings,
    imageTitle: "Willian Vangence",
    imageDescription: "Purchased on October 14, 2024",
    ratingNumbers: 4.2,
  },
   {
    title: "Card 3",
    image: iPhoneFirstImage,
    photoLogo,
    rating: ratings,
    imageTitle: "Willian Vangence",
    imageDescription: "Purchased on October 14, 2024",
    ratingNumbers: 4.2,
  },

  // {
  //   title: "Card 2",
  //   image: iPhoneSecondImage,
  //   photoLogo,
  //   rating: ratings,
  //   imageTitle: "Willian Vangence",
  //   imageDescription: "Purchased on October 14, 2024",
  //   ratingNumbers: 4.2,
  // },
  // {
  //   title: "Card 3",
  //   image: iPhoneThirdImage,
  //   photoLogo,
  //   rating: ratings,
  //   imageTitle: "Willian Vangence",
  //   imageDescription: "Purchased on October 14, 2024",
  //   ratingNumbers: 4.2,
  // },
  // {
  //   title: "Card 4",
  //   image: iPhoneFourImage,
  //   photoLogo,
  //   rating: ratings,
  //   imageTitle: "Willian Vangence",
  //   imageDescription: "Purchased on October 14, 2024",
  //   ratingNumbers: 4.2,
  // },
  // {
  //   title: "Card 5",
  //   image: iPhoneFourImage,
  //   photoLogo,
  //   rating: ratings,
  //   imageTitle: "Willian Vangence",
  //   imageDescription: "Purchased on October 14, 2024",
  //   ratingNumbers: 4.2,
  // },
  // {
  //   title: "Card 6",
  //   image: iPhoneFourImage,
  //   photoLogo,
  //   rating: ratings,
  //   imageTitle: "Willian Vangence",
  //   imageDescription: "Purchased on October 14, 2024",
  //   ratingNumbers: 4.2,
  // },
];

const Testimonials = () => {
  return (
    <section className="padding-default-section">
      <div className="wrapper">
        <h2 className="w-full max-w-6xl text-[24px] font-medium font-['IBM Plex Sans']  testimonials-title ">
          Testimonials
        </h2>

        {/* Common Slider Component */}
        <CommonSlider
          items={cardData}
          renderItem={(item, index) => (
            <TestimonialCards key={index} {...item} />
            
          )}
          leftIcon={leftCircleIcon}
          rightIcon={rightCircleIcon}
          itemGap={24}
        />
      </div>
      {/* Title */}
    </section>
  );
};

export default Testimonials;
