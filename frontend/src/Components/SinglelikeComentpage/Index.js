import React, { useEffect, useState } from "react";
import RightUploadButton from "../TimeLine/rightUploadButton/Index";
import InviteFriends from "../TimeLine/InviteFriends/Index";
import RightLowerImage from "../TimeLine/lowerImages/Index";
import RightUpperImage from "../TimeLine/rightUpperImages/Index";
import axios from "axios";
import Address from "../../configs/config";
let UsersCheck;
const SingleLikeCommentpage = () => {
  const [image, setImage] = useState("");
  const [Desc, setDesc] = useState("");
  const [Tag, setTag] = useState("");
  const [Name, setName] = useState("");
  const [TotalLike, setTotalLike] = useState();
  const [comment, setComment] = useState("");
  const [photoComment, setPhotoComment] = useState([]);
  const pathName = window.location.pathname;
  const [userName,setUserName]=useState(localStorage.getItem("myValueInLocalStorage"))
  useEffect(() => {
    const a = pathName.split("/");
    const Id = a[3];
    var obj = {
      Id,
    };
    axios.post(Address.address[4], obj).then((response) => {
      console.log("axios.post(Address.address[4], obj)", response);
      console.log("cccc", response.data[0].UserId);
      UsersCheck = response.data[0].UserId;
      setImage(response.data[0].imageSchema);
      setDesc(response.data[0].desc);
      setTag(response.data[0].Tag);
      setName(response.data[0].email);
      setTotalLike(response.data[0].Like.length);
      setPhotoComment(response.data[0].Comment);
      // setPhotoComment(response.data.Comment)
    });
  }, []);
  const updateComment = (event) => {
    setComment(event.target.value);
  };
  const useLike = () => {
    console.log("clicked", UsersCheck);
    const pathName = window.location.pathname;
    const a = pathName.split("/");
    const Id = a[3];

    const UserId = localStorage.getItem("myValueInLocalStorage");

    var obj = {
      Id,
      UserId,
    };
    axios.post(Address.address[5], obj).then((response) => {
      console.log("kawal", response.data.Like);
      const array = response.data.Like;
      console.log(array, "ssos");
      setTotalLike(array.length);
    });
  };
  const submitComment = () => {
    const pathName = window.location.pathname;
    const a = pathName.split("/");
    const Id = a[3];
    console.log("comment is:", comment);
    const objComment = comment;
    var obj = {
      objComment,
      Id,
    };
    axios.post(Address.address[9], obj).then((response) => {
      // setComment(response.data[0].comment)
      setPhotoComment(response.data.Comment);
    });
  };

  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <RightUploadButton />
            <InviteFriends />
            <RightUpperImage />
            <RightLowerImage />
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
                    <img src="/images/img_6.png" />
                    {Name}
                  </div>
                  <div className="div_top_rgt">
                    <span className="span_date">02 Jan 2014</span>
                    <span className="span_time">11:15am</span>
                  </div>
                </div>
                <div className="div_image">
                  <img src={Address.address[6] + image} />
                </div>
                <div className="div_btm">
                  <div className="btm_list">
                    <ul>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="/images/icon_001.png" alt="share" />
                          </span>
                          Share
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="/images/icon_002.png" alt="share" />
                          </span>
                          Flag
                        </a>
                      </li>
                      <li>
                        <a onClick={useLike}>
                          <span className="btn_icon">
                            <img src="/images/icon_003.png" alt="share" />
                          </span>
                          {TotalLike}
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="btn_icon">
                            <img src="/images/icon_004.png" alt="share" />
                          </span>
                          4 Comments
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="contnt_3">
              <ul>
                <li>
                  <div className="list_image">
                    <div className="image_sec">
                      <img src="/images/post_img.png" />
                    </div>
                    <div className="image_name">Bharat</div>
                  </div>
                  <div className="list_info">
                    This is an example of a comment. You can create as many
                    comments like this one or sub comments as you like and
                    manage all of your content inside your Account.
                  </div>
                  <input
                    type="button"
                    defaultValue="Reply"
                    className="orng_btn"
                  />
                </li>
                <li>
                  <div className="list_image">
                    <div className="image_sec">
                      <img src="/images/post_img.png" />
                    </div>
                    <div className="image_name">Bharat</div>
                  </div>
                  <div className="list_info">
                    This is an example of a comment. You can create as many
                    comments like this one or sub comments as you like and
                    manage all of your content inside your Account.
                  </div>
                  <input
                    type="button"
                    defaultValue="Reply"
                    className="black_btn"
                  />
                  <div className="cmnt_div">
                    <input
                      type="text"
                      defaultValue="Add a Comment"
                      className="cmnt_bx"
                    />
                    <input
                      type="submit"
                      className="sub_bttn"
                      defaultValue="Submit Comment"
                    />
                  </div>
                </li>
                <li>
                  <div className="list_image">
                    <div className="image_sec">
                      <img src="/images/post_img.png" />
                    </div>
                    <div className="image_name">Bharat</div>
                  </div>
                  <div className="list_info">
                    This is an example of a comment. You can create as many
                    comments like this one or sub comments as you like and
                    manage all of your content inside your Account.
                  </div>
                  <input
                    type="button"
                    defaultValue="Reply"
                    className="orng_btn"
                  />
                </li>
                
                  {photoComment.map((item) => {
                    return <li>
                    <div className="list_image">
                    <div className="image_sec">
                      <img src="/images/post_img.png" />
                    </div>
                    <div className="image_name">{userName}</div>
                  </div>
                    
                    <div className="list_info">
                   {item}
                  </div>
                  <input
                    type="button"
                    defaultValue="Reply"
                    className="orng_btn"
                  />
                    </li>
                    
                  })}
                
                <li>
                  <div className="cmnt_div1">
                    <input
                      type="text"
                      placeholder="Enter your Comment"
                      className="cmnt_bx1"
                      onChange={updateComment}
                    />
                    <input
                      type="submit"
                      onClick={submitComment}
                      className="sub_bttn1"
                      defaultValue="Submit Comment"
                    />
                  </div>
                </li>
              </ul>
              <div className="view_div">
                <a href="#">View more</a>
              </div>
            </div>
          </div>
        </div>
        <div className="clear" />
      </div>
    </div>
  );
};

export default SingleLikeCommentpage;
