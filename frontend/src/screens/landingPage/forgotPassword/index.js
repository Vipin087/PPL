import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import LeftContent from "../component/leftContent";
import URL from "../../../configs/config";

const ForgotPassword = () => {
  const [Email, setEmail] = useState("");
  const [warning, setWarning] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState();
  const [num, setNum] = useState();
  const [otpWarning, setOtpWarning] = useState("");
  const history = useHistory();

  const updateEmail = (event) => {
    setEmail(event.target.value);
  };
  const CheckEmail = () => {
    const email = Email;
    var obj = {
      email,
    };
    axios.post(URL.checkEmail, obj).then((response) => {
      console.log("my email response is:", response.data);
      if (response.data) {
        console.log("ss", response.data.num);
        setNum(response.data.num);
        setShow(true);
      } else {
        setWarning("email incorrect");
      }
    });
  };
  const checkingNumber = () => {
    setShow(false);
    setShowOtp(true);
  };
  const updateOtp = (event) => {
    setOtp(event.target.value);
  };
  const checkingOtp = () => {
    console.log("type of otp is", typeof otp);
    console.log("type of num is", typeof num);

    if (parseInt(otp) === num) {
      console.log("in if type of otp is", typeof otp);
      console.log("type of num is", typeof num);

      history.push("/ResetPassword", { params: Email });
      // <ResetPassword data ={"thisismail"}/>
    } else {
      console.log("iin else type of otp is", typeof otp);
      console.log("type of num is", typeof num);

      console.log(otp, num);
      setOtpWarning("Incorrect OTP");
    }
  };
  return (
    <div>
      {show ? (
        <div className="popup_sec" id="pop_forgt">
          <div className="clos_btn">
            <img src="images/clos.png" alt="" id="clos_pop" />
          </div>
          <div className="pop_hdr">
            A mail has been send to your e-mail Id for Reset Password Link
          </div>
          <div className="man_contnt">
            <span>Please Check Your Mail Box!</span>
            <input type="submit" onClick={checkingNumber} defaultValue="Ok" />
          </div>
        </div>
      ) : (
        false
      )}
      {showOtp ? (
        <div className="popup_sec" id="pop_forgt">
          <div className="clos_btn">
            <img src="images/clos.png" alt="" id="clos_pop" />
          </div>
          <div className="pop_hdr">
            <input type="number" onChange={updateOtp} />
          </div>
          <div className="man_contnt">
            <span>Enter your Otp</span>
            <span>{otpWarning}</span>
            <input type="submit" onClick={checkingOtp} defaultValue="Ok" />
          </div>
        </div>
      ) : (
        false
      )}

      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Forgot Password</h1>
              <ul>
                <li>
                  <span>Enter E-mail ID</span>
                  <input
                    type="text"
                    placeholder="User@gmail.com"
                    onChange={updateEmail}
                  />
                </li>
                {/* <ResetPassword data ={Email}/> */}
                <li>
                  <input
                    type="submit"
                    defaultValue="Submit"
                    onClick={CheckEmail}
                  />
                </li>
              </ul>
              <h5>{warning}</h5>
            </div>
          </div>
          <LeftContent />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
