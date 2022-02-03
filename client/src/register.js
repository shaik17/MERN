import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { registerUser } from "./action/authAction.js";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Notiflix from "notiflix";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
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
  changed = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  submit = (event) => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    const { errors } = this.state;

    return (
      <div>
        <h3 className="text-center mt-5">Sign Up</h3>

        <div className="row">
          <form className="col-md-6 m-auto " noValidate onSubmit={this.submit}>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input
                type="text"
                className={classnames("form-control", {
                  "is-invalid": errors.name,
                })}
                id="exampleInputname"
                onChange={this.changed}
                name="name"
                placeholder="Enter Your Name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className={classnames("form-control", {
                  "is-invalid": errors.email,
                })}
                id="exampleInputEmail1"
                onChange={this.changed}
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
                id="exampleInputPassword1"
                onChange={this.changed}
                name="password"
                placeholder="Password"
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Confirm Password</label>
              <input
                type="password"
                className={classnames("form-control", {
                  "is-invalid": errors.password2,
                })}
                id="exampleInputPassword2"
                onChange={this.changed}
                name="password2"
                placeholder="Confirm Password"
              />
              {errors.password2 && (
                <div className="invalid-feedback">{errors.password2}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
