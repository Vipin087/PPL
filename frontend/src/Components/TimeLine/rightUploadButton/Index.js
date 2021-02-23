import React, { useState } from "react";
import axios from 'axios'
import  "../Like and Comment/Css/Like.css";
import Address from '../../../configs/config'
import  './css/uploadButton.css'
import Timeline from '../Timeline'
import Like from "../Like and Comment/LikeandComment/Like/Index";

const Timelinerightbutton = (props) => {
  const [value, setValue] = useState(
  localStorage.getItem('myValueInLocalStorage')
  );
  const set = props.isTrue;
  const[Tag,setTag]=useState("")
  const[aDate,setaDate]=useState()
  const [form, setForm] = useState("");
  const [desc, setDesc] = useState("");
  const [Image, setImage] = useState("");
  const [showForm,setShowForm]=useState(false);
  const [like,setLike]=useState(0);
  const createForm = () => {
    setShowForm(!showForm)
    if(showForm){setForm(true);}
    else{setForm(false)}
  };
  const uploadDesc=(e)=>{
    setDesc(e.target.value)
  }
  const uploadTag=(e)=>{
    setTag(e.target.value)
  }
  const uploadImage=(e)=>{
      setImage(e.target.files[0])
  }
  

  const uploadFile=(e)=>{
    e.preventDefault()
    console.log("vslue",value)
    // let x = new window.Date()
    setaDate(new Date())
    const formData =new FormData()
    formData.append("desc",desc)
    formData.append("email",value)
    formData.append("Tag",Tag)
    formData.append("like",Like)
    formData.append("uploadImage",Image)
    const config = {
      headers :{
        'content-type':'multipart/form-data',
      }
    }
    axios.post(Address.address[2], formData ,config).then((response)=>{
     if(response){
       console.log("Image",response) 
        set(true); 
      }
    
    })
    setForm(false)
  }

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
          <input className="mid1" type="file" name="uploadImage" onChange= {uploadImage} /><br /><br /><div className="Description  submmit">Desc:</div> 
          <input className="tesst " type="text" name="desc" onChange={uploadDesc} /><br /><br />
          <div className="Description  submmit">Tag:</div> 
          <input className="tesst " type="text" name="Tag" onChange={uploadTag} /><br /><br />
          
          <input className="submmit" type="submit" onClick={uploadFile} name="submit"/>
        </form>
      ) : (
        false
      )}
    </div>
    
  );
};

export default Timelinerightbutton;
