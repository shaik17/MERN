import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import Notiflix from 'notiflix';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Notiflix.Loading.pulse("Loading...");
    Notiflix.Loading.remove();
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div>
        <div className="landing">
          <Link
            to="/register"
            className="btn btn-outline-danger text-warning   p-2 m-2"
          >
            {" "}
            Sign up
          </Link>
          <Link
            to="/login"
            className="btn  btn-outline-danger text-warning p-2"
          >
            {" "}
            Login
          </Link>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Landing);
