import React, { useEffect, useState } from "react";
import axios from "axios";
import {connect} from 'react-redux'


import "../profile/profile.css"
import action from "../../../../redux/action"
import URL from "../../../../configs/config";

const TimelineProfile = (props) => {
  const [showImageForm, setShowImageForm] = useState(false);
  const [Image, setImage] = useState("");
  const [imageSource, setImageSource] = useState();
  const userName = localStorage.getItem("Email");
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    var obj = { userName };
    axios.post("http://localhost:3001/Userdata", obj).then((response) => {
      localStorage.setItem("profile pic",response.data[0].profileImage)
      setImageSource("http://localhost:3001/" + response.data[0].profileImage);
    });
  });
  const changeProfile = () => {
    setShowImageForm(true);
  };
  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };
  const submitForm = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log("image", Image);
    formData.append("uploadImage", Image);
    formData.append("userName", userName);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    console.log("formData is", formData);
    axios
      .post(URL.url+"profile", formData, config)
      .then((response) => {
        if (response) {
          console.log("profile pic",response);
          setImageSource(URL.url + response);
          props.dispatch(action.navbarImage(URL.url + response.data))
          props.dispatch(action.userProfileImage(!flag))
          setFlag(!flag)
        }
      })
    setShowImageForm(false);
    
  };
  return (
    <>
      {showImageForm ? (
        <div className="popup_sec" id="pop_forgt">
        <div className="clos_btn">
            <img onClick={()=>{setShowImageForm(false)}} src="images/clos.png" alt="" id="clos_pop" />
          </div>
          <div className="pop_hdr Big">Select Image</div>
          <div className="man_contnt">
            <form class="rbForm" encType="multipart/formData">
              <input type="file" name="uploadImage" onChange={uploadImage} />
              <input type="submit" onClick={submitForm} Value="Change" />
            </form>
          </div>
        </div>
      ) : (
        false
      )}
      <div className="profile_pic">
        <img src={imageSource} alt="" />
        <div className="profile_text">
          <a href className="pointer" onClick={changeProfile}>
            Change Profile Pic{" "}
          </a>
        </div>
      </div>
    </>
  );
};
function mapStateToProps(state){
  return{
    sFlag: state.tagFlag,
    show:action.show
  }
}
export default connect(mapStateToProps)(TimelineProfile) ;
