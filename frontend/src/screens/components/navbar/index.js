/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "./navbar.css";
import "../../timeline/css/timeline.css";
import URL from "../../../configs/config";
import axios from "axios";
const Navbar = (props) => {
  const history = useHistory();
  const [me, setMe] = useState("");
  const [pendingFR, setPendingFR] = useState([]);
  const [showPendingFR, setShowPendingFR] = useState(false);
  const [flag, setFlag] = useState(false);

  const Logout = () => {
    if (window.location.pathname !== "/") {
      localStorage.clear();
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (window.location.pathname !== "/") {
      let hello;
      
      hello = props.navImage;
      
      setMe(
        <>
          <div className="pro_info pull-right">
            <div className="pro_icn">
            </div>
            <div className="pro_txt">
              Me
              <b className="caret" />
            </div>
            <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
              <li>
                <a
                  className="Logout"
                  style={{ color: "red" }}
                  href
                  onClick={Logout}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </>
      );
    }
  }, [props.Flags, props.tagFlag, props.tagFlag2]);

  useEffect(() => {
    var obj = {
      email: localStorage.getItem("Email"),
    };
    axios
      .post("http://localhost:3001/pendingFriendRequest", obj)
      .then((response) => {
        console.log("new navbar response is ", response);
        setPendingFR(response.data);
      });
  }, []);

  const showPendingRequest = () => {
    setShowPendingFR(!showPendingFR);
    if (showPendingFR) {
    }
  };
  const onHome = () => {
    if (window.location.pathname !== "/") history.push("/Timeline");
  };

  const acceptRequest = (acceptFR) => {
    var obj = {
      email: localStorage.getItem("Email"),
      acceptFR: acceptFR,
    };
    axios
      .post("http://localhost:3001/acceptFriendRequest", obj)
      .then((response) => {
        console.log("new navbar response is ", response);
        setPendingFR(response.data);
        setShowPendingFR(!showPendingFR);
        setFlag(true);
      });
  };
  const rejectRequest = (rejectFR) => {
    var obj = {
      email: localStorage.getItem("Email"),
      rejectFR: rejectFR,
    };
    axios
      .post("http://localhost:3001/rejectFriendRequest", obj)
      .then((response) => {
        console.log("new navbar response is ", response);
        setPendingFR(response.data);
        setShowPendingFR(!showPendingFR);
      });
  };
  const showFriends = () => {};
  return (
    <div>
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button
              type="button"
              className="btn btn-navbar"
              data-toggle="collapse"
              data-target=".nav-collapse"
            >
              {" "}
              <span className="icon-bar" /> <span className="icon-bar" />{" "}
              <span className="icon-bar" />{" "}
            </button>
            <a className="brand" href onClick={onHome}>
              PPL
            </a>
            <div className="pro_info pull-right">
              <div className="pro_icn">
                <img src="/images/pic_small.png" alt="" />
              </div>
              <div className="pro_txt">
                Me
                <b className="caret" />
              </div>
              <ul
                className="dropdown-menu"
                role="menu"
                aria-labelledby="dLabel"
              >
                <li>
                  <a href onClick={Logout}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active">
                  {" "}
                  <a href>Home</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>E-Coupons</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>E-Brands</a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href onClick={showFriends}>
                    Resuse Market
                  </a>{" "}
                </li>
                <li className>
                  {" "}
                  <a href>Lost and Found</a>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header">
        <div className="header_lft">
          <div className="logo">
            <a href>
              <img src="/images/logo.png" alt="" />
            </a>
          </div>
          <div className="navigatn">
            <ul>
              <li>
                <Link to="/Timeline">
                  <a href onClick={onHome}>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <a href> E-Coupons </a>
              </li>
              <li>
                <a href>E-Brands </a>
              </li>
              <li>
                <a href> Resuse Market </a>
              </li>
              <li>
                <a href> Lost and Found</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="header_rgt">
          <div className="flag_div">
            <img src="/images/flag.png" alt="" />
          </div>
          <input type="text" placeholder="Search" className="txt_box" />
          <div className="msg_box" onClick={showPendingRequest}>
            <a href>
              <span className="msg_count">{pendingFR.length}</span>
            </a>
            {showPendingFR
              ? pendingFR.map((item) => {
                  return (
                    <ul className="pendingFrBox">
                      <li>{item}</li>
                      <br />
                      <li>
                        {" "}
                        <button
                          onClick={() => {
                            acceptRequest(item);
                          }}
                        >
                          Accept
                        </button>
                      </li>
                      <br />
                      <li>
                        {" "}
                        <button
                          onClick={() => {
                            rejectRequest(item);
                          }}
                        >
                          Reject
                        </button>
                      </li>
                    </ul>
                  );
                })
              : false}
          </div>
          <div className="info_div">{me}</div>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    Flags: state.Flags,
    tagFlag: state.tagFlag,
    navImage: state.navbarImage,
    tagFlag2: state.tagFlag2,
  };
}
export default connect(mapStateToProps)(Navbar);
