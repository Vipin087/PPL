import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LeftContent from "../leftContent/Index";
import Address from "../../configs/config";

const Rightform = () => {
  const history = useHistory();
  const [Uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [success, setSuccess] = useState("");

  const updateUname = (event) => {
    setUname(event.target.value);
  };
  const updateFname = (event) => {
    setFname(event.target.value);
  };
  const updateLname = (event) => {
    setLname(event.target.value);
  };
  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    var obj = {
      Uname,
      email,
      password,
      Fname,
      Lname,
    };
    console.log("this is my obj",obj)
    axios.post(Address.address[1], obj).then((response) => {
      if (response.data) {
        console.log(response.data);
        setSuccess("Data inserted  try login");
        history.push("/login");
        console.log(success);
      } else {
        setSuccess("user exist try another email");
        console.log(success);
      }
    });
  };
  return (
    <div class="container">
      <div class="content">
        <LeftContent />
        <div className="content_rgt">
          <div className="register_sec">
            <h1>Create An Account</h1>
            <form onSubmit={submitHandler}>
              <ul>
                <li>
                  <span>Username</span>
                  <input
                    type="text"
                    name="Uname"
                    placeholder="Enter your username"
                    onChange={updateUname}
                  />
                </li>
                <li>
                  <span>Password</span>
                  <input
                    type="text"
                    name="password"
                    placeholder="Enter your password"
                    onChange={updatePassword}
                  />
                </li>
                <li>
                  <span>Email</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    onChange={updateEmail}
                  />
                </li>
                <li>
                  <span>First Name</span>
                  <input
                    type="text"
                    name="Fname"
                    placeholder="Enter your first name"
                    onChange={updateFname}
                  />
                </li>
                <li>
                  <span>Last Name</span>
                  <input
                    type="text"
                    name="Lname"
                    placeholder="Enter your last name"
                    onChange={updateLname}
                  />
                </li>
                <li>
                  <input type="checkbox" />I agree to Term &amp; Conditions
                </li>
                <li>
                  <input type="submit" defaultValue="Register" />
                </li>
              </ul>
              <p>{success}</p>
            </form>
            <div className="addtnal_acnt">
              I already have an account.
              <Link to="/login">Login My Account !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightform;
