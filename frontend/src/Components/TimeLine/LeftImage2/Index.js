import React from "react";
import StWagh from "../Steve/Index";
import DateandTime from "../DateAndTime/Index";
import LikeAndComment from "../Like and Comment/LikeandComment/Index"


const LeftImage2 = () => {
  return (
    <div>
      <StWagh />
      <DateandTime />
      <div className="div_image">
        <img src="images/lft_img1.png" alt="pet" />
      </div><LikeAndComment/>
    </div>
  );
};
export default LeftImage2;
