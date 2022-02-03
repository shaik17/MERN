import React, { Component } from "react";
import classnames from "classnames";
import { loginUser } from "./action/authAction.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Notiflix from 'notiflix';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }


  componentDidMount() {
    Notiflix.Loading.pulse("Loading...");
        Notiflix.Loading.remove();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    
  }
  change = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };


  componentWillReceiveProps(nextprops) {
    if (nextprops.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextprops.errors) {
      this.setState({ errors: nextprops.errors });
    }
  }
  submit = (event) => {
    event.preventDefault();
    const logUser = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(logUser);
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <h3 className="text-center mt-5">Login</h3>

        <form className="col-md-6 m-auto" onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className={classnames("form-control", {
                "is-invalid": errors.email,
              })}
              id="exampleInputEmail1"
              onChange={this.change}
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className={classnames("form-control", {
                "is-invalid": errors.password,
              })}
              id="examplepassword"
              onChange={this.change}
              name="password"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <button type="submit" className="btn bg-primary text-white">
            Login
          </button>
        </form>
      </div>
    );
  }
}
Login.PropTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
