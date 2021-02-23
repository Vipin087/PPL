import React, { useEffect, useState } from "react";
import TimelineUploadPostButton from "./rightUploadButton/Index";
import TimelineRightUpperImages from "./rightUpperImages/Index";
import TimelineUploadInviteFriends from "./InviteFriends/Index";
import TimelineRightLowerImages from "./lowerImages/Index";
import TimelineLeftCheckbox from "./leftCheckbox/Index";
import TimelineProfile from "./profile/Index";
import TimelineProfileInfo from "./profileInfo/Index";
import Buttons from "./activityButton/Index";
import UserInfo from "./UserInfo/Index";
import CatButton from "./catButton/Index";
import LeftImage1 from "./LeftImage1/Index";
import LikeAndComment from "./Like and Comment/LikeandComment/Index";
import DogButton from "./DogButton/Index";
import LeftImage2 from "./LeftImage2/Index";
import axios from "axios";
import Index from "./rightUploadButton/Index";
import Address from "../../configs/config";
import Userinfo from "./UserInfo/Index";
import { Link } from "react-router-dom";
import SinglelikeCommentPage from "../SinglelikeComentpage/Index"

const Timeline = () => {
  const [getTrue,setTrue] = useState(false)
  const isTrue = (value) =>
  {
    setTrue(value)
  }
  const [word, setWord] = useState([]);
  useEffect(() => {
    axios
      .get(Address.address[7])
      .then((response) => {
        const extraVar = response.data;

        console.log("slash", extraVar);
        setWord(extraVar);
        setTrue(false);
        // setD?esc(extraVar[0].desc);
        // extraVar.map(item=>{console.log(item.imageSchema)})
      })
      .catch((error) => {
        console.log("jskjkla");
      });
  }, [getTrue]);
 const sendImage=(id)=>{
  

 }
  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <TimelineUploadPostButton isTrue = {isTrue}/>
            <TimelineUploadInviteFriends />
            <TimelineRightUpperImages />
            <TimelineRightLowerImages />
          </div>
          <div className="content_lft">
            <div className="contnt_1">
              <TimelineLeftCheckbox />
              <div className="timeline_div">
                <div className="timeline_div1">
                  <TimelineProfile />
                  <TimelineProfileInfo />
                </div>
                <Buttons />
              </div>
            </div>
            <div className="contnt_2">
              <div className="div_a">
                <UserInfo />
                <CatButton />
                <div className="div_top"></div>

                <LeftImage1 />
              </div>
            </div>
            <div className="contnt_2">
              <div className="div_a">
                <Userinfo />
                <DogButton />
                <div className="div_top"></div>
                <LeftImage2 />
              </div>
            </div>

            {word.map((item) => {
              return (
                <div>
                  <div className="contnt_2">
                    <div className="div_a">
                      <div className="div_title">{item.desc}</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{item.Tag}</div>
                      </div>
                      <div className="div_top_lft">
                        <img src="images/img_6.png" />
                        {item.email}
                      </div>
                      <div className="div_top_rgt">
                        <span className="span_date">20 feb 2021</span>
                        <span className="span_time">5:45pm</span>
                      </div>
                      <div className="div_top"></div>
                     <Link to={Address.address[8]+item._id}> <img
                        src={Address.address[6] + item.imageSchema
                        }
                      /></Link>
                      <LikeAndComment />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
export default Timeline;
