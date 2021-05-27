/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import "./css/timeline.css";
import TimelineUploadPostButton from "./component/rightUploadButton";
import TimelineUploadInviteFriends from "./component/inviteFriends";
import TimelineLeftCheckbox from "./component/leftCheckbox";
import TimelineProfile from "./component/profile";
import TimelineProfileInfo from "./component/profileInfo";
import Buttons from "./component/activityButton";
import LikeAndComment from "./component/likeShareFlagComment/likeAndComment";
import URL from "../../configs/config";
import action from "../../redux/action";

let extraVar;
const Timeline = (props) => {
  if (localStorage.getItem("Full Name") === null) {
    window.location.href = "/";
  }
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    axios
      .get(URL.getImage)
      .then((response) => {
        props.dispatch(action.allImagePost(response.data));

        extraVar = response.data;
        setAllImages(extraVar);

        if (typeof props.tagImages[0] !== "undefined") {
          setAllImages(props.tagImages[0]);
        }
      })
      .catch((error) => {
        console.log("Something went wrong! try again", error);
      });
  }, [props.Flags, props.tagFlags]);

  const updateCategories = (tag) => {
    var obj = {
      Tag: tag,
    };
    axios.post(URL.url + "searchCategories", obj).then((response) => {
      setAllImages(response.data);
    });
  };
  const allCategories = () => {
    setAllImages(extraVar);
  };
  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <TimelineUploadPostButton />
            <TimelineUploadInviteFriends />
            <div className="rght_cate">
              <div className="rght_cate_hd" id="rght_cat_bg">
                Categories
              </div>
              <div className="rght_list">
                <ul className="pointer">
                  <li onClick={allCategories}>
                    <a href>
                      <span className="list_icon">
                        <img src="/images/icon_05.png" alt="up" />
                      </span>{" "}
                      All
                    </a>
                  </li>
                  <li onClick={() => updateCategories("CATS")}>
                    <a href>
                      <span className="list_icon">
                        <img src="/images/icon_01.png" alt="up" />
                      </span>{" "}
                      <> CATS </>
                    </a>
                  </li>
                  <li onClick={() => updateCategories("DOGS")}>
                    <a href>
                      <span className="list_icon">
                        <img src="/images/icon_02.png" alt="up" />
                      </span>{" "}
                      Dogs
                    </a>
                  </li>
                  <li onClick={() => updateCategories("BIRDS")}>
                    <a href>
                      <span className="list_icon">
                        <img src="/images/icon_03.png" alt="up" />
                      </span>{" "}
                      Birds
                    </a>
                  </li>
                  <li onClick={() => updateCategories("RABBITS")}>
                    <a href>
                      <span className="list_icon">
                        <img src="/images/icon_04.png" alt="up" />
                      </span>{" "}
                      Rabbit
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {allImages
              .map((item) => {
                return (
                  <div className="sub_dwn">
                    <div className="feat_sec">
                      <div className="feat_sec_img">
                        <Link
                          to={"/timeline/SinglelikeCommentPage/" + item._id}
                        >
                          {" "}
                          <img src={URL.url + item.imageName} alt="" />
                        </Link>
                      </div>
                      <div className="feat_txt">{item.desc}</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{item.Tag}</div>
                      </div>
                    </div>
                  </div>
                );
              })
              .reverse()}
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

            {allImages
              .map((item) => {
                return (
                  <div className="contnt_2">
                    <div className="div_a">
                      <div className="div_title">{item.desc}</div>
                      <div className="btm_rgt">
                        <div className="btm_arc">{item.Tag}</div>
                      </div>
                      <div className="div_top_lft">
                        <img
                          className="small"
                          src={URL.url + item.profilePic}
                          alt=""
                        />
                        {item.email}
                      </div>
                      <div className="div_top_rgt">
                        <span className="span_date">02 Jan 2014</span>
                        <span className="span_time">11:15am</span>
                      </div>
                      <div className="div_top"></div>
                      <Link to={"/timeline/SinglelikeCommentPage/" + item._id}>
                        {" "}
                        <img src={URL.url + item.imageName} alt="" />
                      </Link>
                      <LikeAndComment />
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    Flags: state.Flags,
    tagFlags: state.tagFlag,
  };
}
export default connect(mapStateToProps)(Timeline);
