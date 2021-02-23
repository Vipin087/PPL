import React from "react";
import Timeline from "./Components/TimeLine/Timeline";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Register from "./Components/Register/Index";
import Login from "./Components/Login/Index";
import Navbar from "./Components/Navbar/Index";
import Footer from "./Components/Footer/Index";
import SingleLikeCommentpage from "./Components/SinglelikeComentpage/Index";
import ForgotPassword from "./Components/ForgotPassword/forgotPaassword"
import ResetPassword from "./Components/ResetPassword/Index";
const App = () => {
  return (
    <div>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Login" component={Login} />
          <Route path="/Register" component={Register} />
          <Route path="/timeline" exact component={Timeline} />
          <Route path="/ForgotPassword" exact component={ForgotPassword} />
          <Route path="/timeline/SinglelikeCommentPage" component={SingleLikeCommentpage} />
          <Route path="/ResetPassword"  component={ResetPassword} />
        </Switch>
      </Router>

      <Footer />
    </div>
  );
};
export default App;
