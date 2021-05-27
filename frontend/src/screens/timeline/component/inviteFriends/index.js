import React, { useState } from "react";
// import  '../likeAndComment/css/like.css'
import TabForInvite from "./tabForInvite/index";
let flag = true;
const TimelineInvitefriends = () => {
  const [inviteFriend, setInviteFriend] = useState("");
  const tabForInvite = () => {
    if (flag === false) {
      setInviteFriend("");
      flag = "true";
    } else {
      setInviteFriend(<TabForInvite />);
      flag = false;
    }
  };

  return (
    <div>
      <div className="rght_btn">
        {" "}
        <span className="rght_btn_icon">
          <img src="/images/btn_icona.png" alt="up" />
        </span>{" "}
        <span className="btn_sep">
          <img src="/images/btn_sep.png" alt="sep" />
        </span>{" "}
        <button className="LikeButton Size" onClick={tabForInvite}>
          Invite Friends
        </button>
      </div>
      <div>{inviteFriend}</div>
    </div>
  );
};

export default TimelineInvitefriends;
