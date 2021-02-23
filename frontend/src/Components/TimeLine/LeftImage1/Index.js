import React from "react";
import LikeAndComment from "../Like and Comment/LikeandComment/Index"
import StWagh from "../Steve/Index"
import DateandTime from "../DateAndTime/Index";

const LeftImage1 = () => {
  return(<div>
    <StWagh/>
    <DateandTime/><div className="div_image">
  
    <img src="images/lft_img.png" alt="pet" />
    <LikeAndComment/>
  </div></div>);
};

export default LeftImage1
