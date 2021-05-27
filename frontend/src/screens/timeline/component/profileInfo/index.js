import React, { useState,useEffect } from "react";
import axios from "axios";
import '../profile/profile.css'

const Timelineprofileinfo = () => {
  const [newUser, setNewUser] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newSex, setNewSex] = useState();
  const [flag,setFlag]=useState(false)
  useEffect(()=>{
    var obj={
      email:localStorage.getItem("Email")
    }
    axios.post("http://localhost:3001/userDetails",obj).then((response)=>{
      setNewUser(response.data[0].Fname +" " +response.data[0].Lname )
      setNewSex(response.data[0].Sex)
      setNewDesc(response.data[0].profileDesc)
    })
  },[])
  const updateName = (event) => {
    setNewUser(event.target.value);
    console.log(newUser);
  };
  const updateSex = (event) => {
    setNewSex(event.target.value);
    console.log(newUser);
  };
  const updateDesc = (event) => {
    setNewDesc(event.target.value);
    console.log(newUser);
  };
  const changeToInputField = (event) => {
    setFlag(true);
  };

  const submitForm = (e) => {
    e.preventDefault()
    console.log("maddy", newUser);
    // let fullName=localStorage.getItem("Full Name")
    let fullNameArray = newUser.split(" ");
    console.log("asdf", fullNameArray);
    let Fname = fullNameArray[0];
    let Lname = fullNameArray[1];

    var obj = {
      email: localStorage.getItem("Email"),
      Sex:newSex,
      profileDesc:newDesc,
      Fname: Fname,
      Lname: Lname,
    };
    console.log("my obj in info is", obj);
    axios.post("http://localhost:3001/updateName", obj).then((response) => {
      console.log("my new details",response);
      Lname=response.data[0].Lname
      if(Lname===undefined){console.log("nu55555555ll") 
      Lname=" "}
      // setNewSex(response.data[0].Sex)
      // setNewDesc(response.data[0].profileDesc)
      setFlag(false)
    });
  };
  return (
    <div className="profile_info">
      <div className="edit_div">
        <a href onClick={changeToInputField} className="pointer">
          Edit <img src="images/timeline_img.png" alt="" />
        </a>
      </div>
      <form onSubmit={submitForm}>
        <div className="profile_form">
          <ul>
            <li>
              <div className="div_name1">Name :</div>

              {flag ? (
                <div className="div_name2">
                  <input type="text" onChange={updateName} defaultValue={newUser}></input>
                </div>
              ) : (
                <div className="div_name2">
                  {newUser}
                </div>
              )}
            </li>
            <li>
              <div className="div_name1">Sex :</div>
              {flag ? (
                <div className="div_name2">
                  <input type="text" onChange={updateSex} defaultValue={newSex}></input>
                </div>
              ) : (
                <div className="div_name2">{newSex}</div>
              )}
            </li>
            <li>
              <div className="div_name1">Description :</div>
              {flag ? (
                <div className="div_name2">
                  <input style={{maxHeight:'75px',
                minHeight:'38px',
                  resize:'none',
                  padding:'9px',
                  boxSizing:'border-box',
                  fontSize:'15px'}}
                    type="text"
                    onChange={updateDesc}
                    defaultValue={newDesc}
                  ></input>
                  <button>Change</button>
                </div>
              ) : (
                <div className="div_name3">
                  {newDesc}
                </div>
              )}
            </li>
          </ul>
        </div>
      </form>
    </div>
  );
};
export default Timelineprofileinfo;
