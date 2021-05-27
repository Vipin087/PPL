import axios from "axios";
import React, { useEffect, useState } from "react";

const TabForInvite = () => {
  const userEmail = localStorage.getItem("Email");
  const [friendEmail, setFriendEmail] = useState("");
  const [friend, setFriend] = useState([]);
  const [send, setSend] = useState("send");
  const updateFriendEmail = (event) => {
    setFriendEmail(event.target.value);
  };
  useEffect(() => {
    var obj = {
      userEmail: userEmail,
    };
    axios.post("http://localhost:3001/friendRequest", obj).then((response) => {
      console.log("here sssaaa", response);
    });
  }, []);
  const submitEmail = () => {
    var obj = {
      userEmail: userEmail,
      friendEmail: friendEmail,
    };
    axios
      .post("http://localhost:3001/checkFriendEmail", obj)
      .then((response) => {
        console.log("2ndrequest", response);
        // setFriend(response.da)
      });
  };
  return (
    <div className="rght_cate">
      <div className="rght_cate_hd" id="rght_cat_bg">
        Invite
      </div>
      <div className="rght_list">
        <ul>
          <li>
            <input type="text" onChange={updateFriendEmail}></input>
            <br />
            <br />
            <button onClick={submitEmail}>{send} request</button>
          </li>
          <li>
            <a href>
              <span className="list_icon"></span> Friends
            </a>
          </li>
          {friend.map((item) => {
            return (
              <li>
                <a href>
                  <span className="list_icon"></span> {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TabForInvite;
