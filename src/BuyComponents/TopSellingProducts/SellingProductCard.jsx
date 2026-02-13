import React from "react";

const SellingProductCard = ({
  image,
  rating,
  description,
  tag,
  specification,
  number,
  startingText,
  endTextTwo,
  endTextOne,
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden rating-card transform ">
      <div className="text-[14px] font-[IBM Plex Sans] bg-[#F4F4F4] font-[500] w-fit  p-3 rounded-md text-[#34A853] ml-28 ">
        {tag}
      </div> 
      <div className="flex justify-center">
        <img src={image} className="items-center" />
      </div>

      <div className=" text-center  font-[500] font-[IBM Plex Sans]  text-[14px]  ">
        {description}
      </div>
      <div className="font-[IBM Plex Sans] font-[500] text-[10px] text-center text-[#00000080]">
        {specification}
      </div>
      <div className="flex items-center gap-2 justify-center p-1">
        <span>
          <img src={rating} />
        </span>
        <span className="font-[IBM Plex Sans] text-[10px] font-[500] text-[#00000080]">
          {number}
        </span>
      </div>
      <div className="flex items-center justify-between px-1">
        <div>
          <span className="font-[IBM Plex Sans] font-[500] text-[14px]">
            {startingText}
          </span>
        </div>
        <div className="flex gap-1  items-center">
          <span className="font-[IBM Plex Sans] font-[500] text-[14px]">
            {endTextOne}
          </span>
          <span className="font-[IBM Plex Sans] font-[500] text-[10px] text-[#00000080]">
            {endTextTwo}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SellingProductCard;
