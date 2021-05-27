/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./singlePost.css"
import RightUploadButton from "../component/rightUploadButton";
import InviteFriends from "../component/inviteFriends";
import axios from "axios";
import URL from "../../../configs/config";
let UsersCheck;

const SinglePost = () => {
  
  const [sideImages, setSideImages] = useState([]);
  const [image, setImage] = useState("");
  const [Desc, setDesc] = useState("");
  const [Tag, setTag] = useState("");
  const [Name, setName] = useState("");
  const [TotalLike, setTotalLike] = useState();
  const [comment, setComment] = useState("");
  const [getTrue, setTrue] = useState(false);
  const [userImg,setUserImg]=useState("")
  const [commentLength, setCommentLength] = useState("");
  const [photoComment, setPhotoComment] = useState([]);

  const pathName = window.location.pathname;
  const userName = localStorage.getItem("Full Name");
  useEffect(() => {
    const a = pathName.split("/");
    const Id = a[3];
    var obj = {
      Id,
    };
    axios.post(URL.sendImageId, obj).then((response) => {
      UsersCheck = response.data[0].UserId;
      setImage(response.data[0].imageName);
      setDesc(response.data[0].desc);
      setTag(response.data[0].Tag);
      setName(response.data[0].email);
      setTotalLike(response.data[0].Like.length);
      setPhotoComment(response.data[0].Comment);
      setCommentLength(response.data[0].Comment.length);
      setUserImg(response.data[0].profilePic)
      setTrue(false);
      axios
        .get(URL.url+"getImage")
        .then((response) => {
          const extraVar = response.data;
          setSideImages(extraVar);
        })
        .catch((error) => {
          console.log("Something went wrong! try again");
        });
    });
  }, [getTrue]);
  const updateComment = (event) => {
    setComment(event.target.value);
  };
  const updateSetTrue = () => {
    setTrue(true);
  };
  const useLike = () => {
    console.log("clicked", UsersCheck);
    const pathName = window.location.pathname;
    const a = pathName.split("/");
    const Id = a[3];
    console.log("the id of image in singleLikeCommentPage is", Id);

    const UserId = localStorage.getItem("Full Name");

    var obj = {
      Id,
      UserId,
    };
    axios.post(URL.totalLike, obj).then((response) => {
      console.log("kawal", response.data.Like);
      const array = response.data.Like;
      console.log(array, "ssos");
      setTotalLike(array.length);
    });
  };
  const submitComment = (event) => {
    event.preventDefault();
    const pathName = window.location.pathname;
    const a = pathName.split("/");
    console.log("comment is:", userName);
    const Id = a[3];
    console.log("comment is:", userName + comment);
    const objComment = userName + ":" + comment;
    var obj = {
      objComment,
      Id,
    };
    axios.post(URL.commentData, obj).then((response) => {
      console.log("-my user comment is-:", response);
      setPhotoComment(response.data.Comment);
      setCommentLength(response.data.Comment.length);
    });
    event.target.reset();
  };

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <RightUploadButton />
            <InviteFriends />
            <div className="rght_cate">
              <div className="rght_cate_hd" id="opn_cat_bg">
                Featured
              </div>
              {sideImages
                .map((item) => {
                  return (
                    <div className="sub_dwn">
                      <div className="feat_sec">
                        <div className="feat_sec_img">
                          <Link to={"/timeline/SinglelikeCommentPage/" + item._id}>
                            {" "}
                            <img
                              src={URL.url + item.imageName}
                              alt=""
                              onClick={updateSetTrue}
                            />
                          </Link>
                        </div>
                        <div className="feat_txt">{item.desc}</div>
                        <div className="btm_rgt">
                          <div className="btm_arc">Rabbits</div>
                        </div>
                      </div>
                    </div>
                  );
                })
                .reverse()}
            </div>
          </div>
          <div className="content_lft">
            <div className="contnt_2">
              <div className="div_a">
                <div className="div_title">{Desc}</div>
                <div className="btm_rgt">
                  <div className="btm_arc">{Tag}</div>
                </div>
                <div className="div_top">
                  <div className="div_top_lft">
                    <img className="small" src={URL.url+userImg} alt="" />
                    {Name}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">02 Jan 2014</span>
                    <span className="span_time">11:15am</span>
                  </div>
                </div>
                <div className="div_image">
                  <img src={URL.url + image} alt="" />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a href className="pointer">
                          <span className="btn_icon">
                            <img src="/images/icon_001.png" alt="share" />
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a href className="pointer">
                          <span className="btn_icon">
                            <img src="/images/icon_002.png" alt="share" />
                          </span>
                          Flag
                        </a>
                      </li>
                      <li>
                        <a href onClick={useLike} className="pointer">
                          <span className="btn_icon">
                            <img src="/images/icon_003.png" alt="share" />
                          </span>
                          {TotalLike} Like
                        </a>
                      </li>
                      <li>
                        <a href className="pointer">
                          <span className="btn_icon">
                            <img src="/images/icon_004.png" alt="share" />
                          </span>
                          {commentLength} Comment
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="contnt_3">
              <ul>
                {photoComment.map((item) => {
                  const Comment = item.split(":");
                  return (
                    <li>
                      <div className="list_image">
                        <div className="image_sec">
                          <img src="/images/post_img.png" alt="" />
                        </div>
                        <div className="image_name">{comment[0]}</div>
                      </div>

                      <div className="list_info">{Comment[1]}</div>
                    </li>
                  );
                })}

                <li>
                  <div className="cmnt_div1">
                    <form onSubmit={submitComment}>
                      <input
                        id="myInput"
                        type="text"
                        placeholder="Enter your Comment"
                        className="cmnt_bx1"
                        onChange={updateComment}
                      />
                      <input
                        type="Submit"
                        className="sub_bttn1"
                        defaultValue="Submit Comment"
                      />{" "}
                    </form>
                  </div>
                </li>
              </ul>
              <div className="view_div">
                <a href>View more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default SinglePost;
