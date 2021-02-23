import React, { useState } from "react";
import "../../Css/Like.css";

let count = 0;
const Like = () => {
  const [like, setLike] = useState(0);
  const increser = () => {
    count = count == 1 ? (count = 0) : (count = 1);
    setLike(count);
  };

  return (
    <li>
      {/* <a href='#'> */}
      <span className="btn_icon">
        <img src="images/icon_003.png" alt="share" />
      </span>
      <button className="LikeButton" onClick={increser}>
        {like} Likes
      </button>
      {/* </a> */}
    </li>
  );
};
export default Like;
