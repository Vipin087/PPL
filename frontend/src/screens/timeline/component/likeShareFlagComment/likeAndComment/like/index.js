import React from "react";
import "../../css/Like.css";


const Like = () => {



  return (
    <li>
      {/* <a href='#'> */}
      <span className="btn_icon">
        <img src="images/icon_003.png" alt="share" />
      </span>
      <button className="LikeButton">
         Likes
      </button>
      {/* </a> */}
    </li>
  );
};
export default Like;
