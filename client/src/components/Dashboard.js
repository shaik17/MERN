import React from "react";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getProfile,DeleteProfile} from "../action/profile.Action";
import { Link } from "react-router-dom";
import Notiflix from "notiflix";
import Lottie from "react-lottie";
import editing from "../animation/edit.json";
import loadingjson from '../animation/loading.json';
import addjson from '../animation/add.json';
import deletejson from '../animation/delete.json';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getProfile();
  }
  deleteprofile = ()=>{
    this.props.DeleteProfile();
  }

  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: editing,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const defaultOptions1 = {
      loop: true,
      autoplay: true,
      animationData: loadingjson,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const defaultOptions2 = {
      loop: true,
      autoplay: true,
      animationData: addjson,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    }; const defaultOptions3 = {
      loop: true,
      autoplay: true,
      animationData: deletejson,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    let dashboard;
    const { loading, Profile } = this.props.profile;
    const { user } = this.props.auth;

    if (loading === true || Profile === null) {
      dashboard = (
        <div className="d-flex justify-content-center align-items-center" steyle={{}}>
            <Lottie options={defaultOptions1} height={500} width={400} />
        </div>
      );
    } else {
      if (Object.keys(Profile).length > 0) {
        dashboard =( 
          <div className="container">
            <h1 className="dashboard mt-4">Dashboard</h1>
            <a className="mt-5 username">welcome  {user.name} </a>
            <div className="row mt-5">
              <div className="col-md-3 col-lg-3 col-sm-12">
                <Link to="/editprofile" className="text-center">
                  <div className="" aria-hidden="true">
                    {" "}
                    <Lottie options={defaultOptions} height={70} width={70} />
                  </div>
                  <br />
                  <p
                    className="iconsize text-center"
                    style={{ fontStyle: "italic"}}
                  >
                    Edit Profile
                  </p>
                </Link>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12">
                <a className="text-center">
                  <div className="" aria-hidden="true">
                    {" "}
                    <Lottie options={defaultOptions2} height={80} width={80} />
                  </div>
                  <br />
                  <p
                    className="iconsize text-center"
                    style={{ fontStyle: "italic",marginTop:"-10px" }}
                  >
                    Add Education
                  </p>
                </a>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12">
                <a className="text-center">
                  <div className="" aria-hidden="true">
                    {" "}
                    <Lottie options={defaultOptions2} height={80} width={80} />
                  </div>
                  <br />
                  <p
                    className="iconsize text-center"
                    style={{ fontStyle: "italic",marginTop:"-10px" }}
                  >
                    Add Experience
                  </p>
                </a>
              </div>
              <div className="col-md-3 col-lg-3 col-sm-12">
                <a className="text-center" onClick={this.deleteprofile}>
                  <div className="" aria-hidden="true">
                    {" "}
                    <Lottie options={defaultOptions3} height={70} width={70} />
                  </div>
                  <br />
                  <p
                    className="iconsize text-center"
                    style={{ fontStyle: "italic"}}
                  >
                    Delete Profile
                  </p>
                </a>
              </div>

            </div>

            {/* <Link to="/createprofile" className="btn btn-info">
              Create Profile
            </Link> */}
          </div>
        
        )
      } else {
        dashboard = (
          <div>
          <div className="container">
              <h1 className="dashboard mt-4">Dashboard</h1>
              <a className="mt-5 username">Welcome {user.name}</a><br/>
              <h5 className="mt-3">You have not yet setup a profile, please add some info</h5>
              <Link to="/createprofile" className="btn btn-primary mt-3">Create Profile</Link>
          </div>
        </div>
        );
      }
    }

    return (
      <div>
        <div className="">
          <div className="">{dashboard}</div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: propTypes.object.isRequired,
  getProfile: propTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfile,DeleteProfile})(Dashboard);
