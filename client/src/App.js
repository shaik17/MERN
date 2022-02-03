import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./register";
import Login from "./login";
import Landing from "./components/Landing";
import "./App.css";
import setAuthtoken from "./utility/setAuthtoken";
import { setCurrentUser, logoutUser } from "./action/authAction";
import jwt_decode from "jwt-decode";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import createProfile from "./components/createProfile";
import EditProfile from "./components/Editprofile";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: true,
    };
  }
  componentDidMount() {
    if (
      window.location.pathname === "/createprofile" ||
      window.location.pathname === "/editprofile"
    ) {
      this.setState({ view: false });
    }
  }

  render() {
    if (localStorage.jwttoken) {
      setAuthtoken(localStorage.jwttoken);
      const decoded = jwt_decode(localStorage.jwttoken);
      store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        store.dispatch(logoutUser());
        window.location.href = "/login";
      }
    }
    let { view } = this.state;
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Landing} />

            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/createprofile"
                component={createProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/editprofile" component={EditProfile} />
            </Switch>
            {view ? <Footer /> : ""}
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
