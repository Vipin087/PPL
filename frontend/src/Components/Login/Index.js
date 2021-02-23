import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import LeftContent from "../leftContent/Index";
import Address from '../../configs/config'

const Rightform = () => {
  const history = useHistory();
  const [value, setValue] = React.useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  
  React.useEffect(() => {
    localStorage.setItem('myValueInLocalStorage', value);
  }, [value]);
  
  const updateEmail = (event) => {
    setEmail(event.target.value);
    setValue(event.target.value);
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
    axios.post(Address.address[0], obj).then((response) => {
      console.log(response);
      if (response.data) {
        setSuccess("congrats you are logged in");
        history.push("/Timeline");
      } else {
        setSuccess("email or password incorrect");
        console.log(success);
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
                    type="text"
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
              <p className="warning">{success}</p>
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
export default Rightform;
