import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import URL from "../../../configs/config";
import LeftContent from "../component/leftContent";

const ResetPassword = (props) => {
  const history = useHistory();
  const email = props.location.state.params;
  const [password, setPassword] = useState();
  const [ConfirmPassword, setConfirmPassword] = useState();
  const [warning, setWarning] = useState("");
  const updatePassword = (event) => {
    setPassword(event.target.value);
  };
  const updateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const checkPassword = () => {
    if (password === ConfirmPassword) {
      var obj = { email, password };
      axios.post(URL.updatePassword, obj).then((Response) => {
        console.log("password Updated");
        history.push("/Login");
      });
    } else {
      setWarning("password not matched");
    }
  };
  return (
    <div>
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Reset Password</h1>
              <ul>
                <li>
                  <span>Enter New Password</span>
                  <input
                    type="text"
                    placeholder="Enter your new password"
                    onChange={updatePassword}
                  />
                </li>
                <li>
                  <span>Confirm Password</span>
                  <input
                    type="text"
                    placeholder="Enter your password again"
                    onChange={updateConfirmPassword}
                  />
                </li>
                <li>
                  <input
                    type="submit"
                    defaultValue="Submit"
                    onClick={checkPassword}
                  />
                </li>
                <h4>{warning}</h4>
              </ul>
            </div>
          </div>
          <LeftContent />
          <div className="clear" />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
