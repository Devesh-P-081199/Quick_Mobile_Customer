import React from "react";

const TestimonialCards = ({
  image,
  photoLogo,
  rating,
  imageTitle,
  imageDescription,
  ratingNumbers,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden testimonial-card transform transition ">
      {/* <div className="flex pb-8 justify-center testimonial-img">
        <img src={image} className="items-center" />
      </div> */}
      <div className="flex justify-between">
        <div>
          <img src={photoLogo} />
        </div>
        <div>
          <p className="font-[IBM Plex Sans] font-[500] text-[16px]">
            {imageTitle}
          </p>
          <p className="font-[IBM Plex Sans] text-[12px] font-[400] text-[#00000080]">
            {imageDescription}
          </p>
        </div>
      </div>
      <div className="flex items-center p-1 gap-1">
        <div>
          <img src={rating} />
        </div>
        <span className="font-[IBM Plex Sans] text-[16px] font-[500] text-[#00000080]">
          {ratingNumbers}
        </span>
      </div>
      <div className="font-[IBM Plex Sans] text-[14px] w-fit text-left flex font-[400]">
        <div>
          <p>I recently purchased an iPhone from </p>
          <p>
            <span className="text-[#00B5EA]">QuickMobile</span> , and I couldn't
            be
          </p>
          <p>happier with my experience! The </p>
          <p>website was easy to navigate, and </p>{" "}
          <p> the phone arrived quickly with free </p> shipping.
        </div>
      </div>
    </div>
  );
};

export default TestimonialCards;
