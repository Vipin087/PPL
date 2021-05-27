import React, { useState } from "react";
import axios from "axios";
import "../likeShareFlagComment/css/Like.css";
import URL from "../../../../configs/config";
import "./css/uploadButton.css";
import Like from "../likeShareFlagComment/likeAndComment";
import action from "../../../../redux/action";
import { connect } from "react-redux";

const TimelineRightUploadButton = (props) => {
  const value = localStorage.getItem("Full Name");
  const profilePic=localStorage.getItem("profile pic")
  const [Tag, setTag] = useState("");
  const [form, setForm] = useState("");
  const [desc, setDesc] = useState("");
  const [Image, setImage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [flag, setFlag] = useState();
  const [success, setSuccess] = useState(false);
  const createForm = () => {
    setShowForm(!showForm);
    if (showForm) {
      setForm(true);
    } else {
      setForm(false);
    }
  };
  const uploadDesc = (e) => {
    setDesc(e.target.value);
  };
  const uploadTag = (e) => {
    setTag(e.target.value);
  };
  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("desc", desc);
    formData.append("fullName", value);
    formData.append("email", localStorage.getItem("Email"));
    formData.append("Tag", Tag);
    formData.append("like", Like);
    formData.append("uploadImage", Image);
    formData.append("profilePic",profilePic)
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios.post(URL.imageData, formData, config).then((response) => {
      if (response) {
        props.dispatch(action.showImage(flag));
        setFlag(!flag);
      }
    });
    setSuccess(true);
    setTimeout(()=>{ setSuccess(false); }, 1000);
    setForm(false);
  };

  return (
    <div>
      <div className="rght_btn">
        {" "}
        <span className="rght_btn_icon">
          <img src="/images/btn_iconb.png" alt="up" />
        </span>{" "}
        <span className="btn_sep">
          <img src="/images/btn_sep.png" alt="sep" />
        </span>{" "}
        <button className="LikeButton Size" onClick={createForm}>
          Upload Post
        </button>{" "}
      </div>
      {form ? (
        <form class="rbForm" encType="multipart/formData">
          <input
            className="mid1"
            type="file"
            name="uploadImage"
            onChange={uploadImage}
          />
          <br />
          <br />
          <div className="Description  submmit">Desc:</div>
          <input
            className="tesst "
            type="text"
            name="desc"
            onChange={uploadDesc}
          />
          <br />
          <br />
          <div className="Description  submmit">Tag:</div>
          <input
            list="Tag"
            className="tesst "
            name="Tag"
            onChange={uploadTag}
          />
          <datalist id="Tag">
            <option value="DOGS" />
            <option value="CATS" />
            <option value="RABBITS" />
            <option value="BIRDS" />
          </datalist>
          <br />
          <br />

          <input
            className="submmit"
            type="submit"
            onClick={uploadFile}
            name="submit"
          />
        </form>
      ) : (
        false
      )}
      {success?
        <h4>Image Uploaded</h4>:(false)}
      
    </div>
  );
};
function mapStateToProps(state) {
  return {
    fla: state.Flag,
  };
}
export default connect(mapStateToProps)(TimelineRightUploadButton);
