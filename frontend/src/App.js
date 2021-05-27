import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Register from "./screens/landingPage/registerPage/index";
import Timeline from "./screens/timeline";
import Login from "./screens/landingPage/loginPage";
import Navbar from "./screens/components/navbar";
import Footer from "./screens/components/footer";
import SinglePost from "./screens/timeline/singlePost";
import ForgotPassword from "./screens/landingPage/forgotPassword";
import ResetPassword from "./screens/landingPage/resetPassword";

const App = () => {
  return (
    <div>
      
      <Router>
      <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/timeline" exact component={Timeline} />
          <Route
            path="/timeline/SingleLikeCommentPage"
            component={SinglePost}
          />
          <Route path="/ForgotPassword" exact component={ForgotPassword} />
          <Route path="/ResetPassword" component={ResetPassword} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
};

export default App;
