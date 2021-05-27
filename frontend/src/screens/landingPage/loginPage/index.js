import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import "./login.css";
import LeftContent from "../component/leftContent";
import URL from "../../../configs/config";
import action from "../../../redux/action";

const Rightform = (props) => {
  const history = useHistory();
  if (localStorage.length > 0) {
    history.push("/timeline");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    var obj = {
      email,
      password,
    };
    axios.post(URL.checkUserExist, obj).then((response) => {
      if (response.data) {
        localStorage.setItem("profile pic", response.data[0].profileImage);
        localStorage.setItem(
          "Full Name",
          response.data[0].Fname + " " + response.data[0].Lname
        );
        localStorage.setItem("Email", response.data[0].email);
        setError("congrats you are logged in");
        props.dispatch(action.show(true));
        history.push("/Timeline");
        props.dispatch(action.loginTab(true));
      } else {
        setError("Email or Password incorrect");
      }
    });
  };
  return (
    <div class="container">
      <div class="content">
        <LeftContent />
        <div className="content_rgt">
          <div className="login_sec">
            <h1>Log In</h1>
            <form onSubmit={submitHandler}>
              <ul>
                <li>
                  <span>Email-ID</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter your email"
                    onChange={updateEmail}
                  />
                </li>
                <li>
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={updatePassword}
                  />
                </li>
                <li>
                  <input type="checkbox" />
                  Remember Me
                </li>
                <li>
                  <input type="submit" defaultValue="Log In" />
                  <Link to="/ForgotPassword"> Forgot Password</Link>
                </li>
              </ul>
              <p className="warning">{error}</p>
            </form>
            <div className="addtnal_acnt">
              I do not have any account yet.
              <Link to="/Register"> Create My Account Now !</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Rightform);
