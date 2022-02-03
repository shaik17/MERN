import React from "react";
import Notiflix from "notiflix";
import { connect } from "react-redux";
import classnames from "classnames";
import propTypes from "prop-types";
import { profileCreate, getProfile } from "../action/profile.Action.js";
import { withRouter } from "react-router-dom";
import isEmpty from "../validation/is-empty";

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      company: "",
      website: "",
      location: "",
      bio: "",
      skills: "",
      status: "",
      githubusername: "",
      twitter: "",
      facebook: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      view: false,
      errors: {},
    };
  }
  componentDidMount() {
    this.props.getProfile();
  }
  changed = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.Profile.Profile) {
      const profile = nextProps.Profile.Profile;
      const skillsCSV = profile.skills.join(",");
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
        profile.social = !isEmpty(profile.social)? profile.social:{};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
      profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram : "";
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location:profile.location,
        bio:profile.bio,
        skills:skillsCSV,
        status:profile.status,
        githubusername:profile.githubusername,
        twitter:profile.twitter,
        facebook:profile.facebook,
        instagram:profile.instagram,
        linkedin:profile.linkedin,
        youtube:profile.youtube,
      });
    }
  }
  submit = (event) => {
    event.preventDefault();
    const newprofile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      bio: this.state.bio,
      skills: this.state.skills,
      status: this.state.status,
      githubusername: this.state.githubusername,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
    };
    console.log(newprofile);

    this.props.profileCreate(newprofile, this.props.history);
  };
       
  render() {
    const { errors } = this.state;

    return (
      <div>
        <h1 className="d-flex justify-content-center align-items-center mt-4">
          Edit Your Profile
        </h1>
        <p className="text-center mt-2">
          Let's get some information to make your profile stand out
        </p>

        <div className="row mt-2">
          <div className="col-md-6 col-lg-6 col-sm-12  m-auto">
            <p className="mt-1 m-1">*required fields</p>
            <form noValidate onSubmit={this.submit}>
              <div className="form-group mt-2 m-1">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.handle,
                  })}
                  id="exampleInputname"
                  onChange={this.changed}
                  name="handle"
                  value={this.state.handle}
                  placeholder="* Profile Handle"
                />
                <small className="form-text text-muted m-1">
                  A unique handle for your profile URL. Your full name, company
                  name, nickname
                </small>
                {errors.handle && (
                  <div className="invalid-feedback">{errors.handle}</div>
                )}
              </div>
              <div className="form-group mt-3 m-1">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.status,
                  })}
                  id="exampleInputEmail1"
                  onChange={this.changed}
                  name="status"
                  value={this.state.status}
                  aria-describedby="emailHelp"
                  placeholder="* Select Professional status"
                />
                <small className="form-text text-muted m-1">
                  Give us an idea of where you are at in your career
                </small>

                {errors.status && (
                  <div className="invalid-feedback">{errors.status}</div>
                )}
              </div>
              <div className="form-group mt-3 m-1">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={this.changed}
                  name="company"
                  value={this.state.company}
                  placeholder="Company"
                />
                <small className="text-muted form-text m-1">
                  Could be your own company or one you work for
                </small>
              </div>
              <div className="form-group mt-3 m-1">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={this.changed}
                  name="location"
                  value={this.state.location}
                  placeholder="Location"
                />
                <small className="form-text text-muted m-1">
                  City or city & state suggested (eg.Tanjore, TamilNadu)
                </small>
              </div>
              <div className="form-group mt-3 m-1">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={this.changed}
                  name="githubusername"
                  value={this.state.githubusername}
                  placeholder="Githubusername"
                />
                <small className="form-text text-muted m-1">
                  if you want your latest repos and a Github link, include your
                  username
                </small>
              </div>
              <div className="form-group mt-3 m-1">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.website,
                  })}
                  id="exampleInputPassword2"
                  onChange={this.changed}
                  name="website"
                  value={this.state.website}
                  placeholder="Website"
                />
                <small className="form-text text-muted m-1">
                  Could be your own website or a company one
                </small>
                {errors.website && (
                  <div className="invalid-feedback">{errors.website}</div>
                )}
              </div>
              <div className="form-group mt-3 m-1">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.skills,
                  })}
                  id="exampleInputPassword2"
                  onChange={this.changed}
                  name="skills"
                  value={this.state.skills}
                  placeholder="* Skills"
                />
                <small className="form-text text-muted m-1">
                  Please use comma seperated values
                  (eg.HTML,CSS,javascript,React)
                </small>
                {errors.skills && (
                  <div className="invalid-feedback">{errors.skills}</div>
                )}
              </div>
              <div className="form-group mt-3 m-1">
                <textarea
                  name="bio"
                  class="form-control"
                  rows="3"
                  value={this.state.bio}
                  placeholder="Bio"
                ></textarea>
                <small className="text-muted form-text m-1">
                  Tell us a little about Yourself
                </small>
              </div>
              <button
              type="button"
                className="d-block mb-3 btn btn-light text-dark "
                onClick={() =>
                  this.setState((prevstate) => ({
                    view: !prevstate.view,
                  }))
                }
              >
                Add More Social Links
              </button>

              {this.state.view ? (
                <div>
                  <div className="input-group form-group ">
                    <div class="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fab fa-facebook m-1"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.facebook,
                      })}
                      id="exampleInputPassword2"
                      onChange={this.changed}
                      name="facebook"
                      value={this.state.facebook}
                      placeholder="facebook"
                    />
                    {errors.facebook && (
                      <div className="invalid-feedback">{errors.facebook}</div>
                    )}
                  </div>
                  <div className="input-group form-group  mt-1">
                    <div class="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fab fa-instagram m-1"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.instagram,
                      })}
                      id="exampleInputPassword2"
                      onChange={this.changed}
                      name="instagram"
                      placeholder="instagram"
                      value={this.state.instagram}
                    />
                    {errors.instagram && (
                      <div className="invalid-feedback">{errors.instagram}</div>
                    )}
                  </div>
                  <div className="input-group form-group  mt-2">
                    <div class="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fab fa-twitter m-1"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.twitter,
                      })}
                      id="exampleInputPassword2"
                      onChange={this.changed}
                      name="twitter"
                      value={this.state.twitter}
                      placeholder="twitter"
                    />
                    {errors.twitter && (
                      <div className="invalid-feedback">{errors.twitter}</div>
                    )}
                  </div>
                  <div className="input-group form-group  mt-1">
                    <div class="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fab fa-linkedin m-1"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.linkedin,
                      })}
                      id="exampleInputPassword2"
                      onChange={this.changed}
                      name="linkedin"
                      value={this.state.linkedin}
                      placeholder="linkedin"
                    />
                    {errors.linkedin && (
                      <div className="invalid-feedback">{errors.linkedin}</div>
                    )}
                  </div>
                  <div className="input-group form-group  mt-1">
                    <div class="input-group-prepend">
                      <span className="input-group-text" id="basic-addon1">
                        <i class="fab fa-youtube-square m-1"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.youtube,
                      })}
                      id="exampleInputPassword2"
                      onChange={this.changed}
                      name="youtube"
                      value={this.state.youtube}
                      placeholder="youtube"
                    />
                    {errors.youtube && (
                      <div className="invalid-feedback">{errors.youtube}</div>
                    )}
                  </div>
                </div>
              ) : null}

              <button
                type="submit"
                className="btn btn-info btn-block mt-5 p-1 "
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profileCreate: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  getProfile:propTypes.func.isRequired,
  Profile:propTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  errors: state.errors,
  Profile: state.profile,
});

export default connect(mapStateToProps, { profileCreate ,getProfile})(
  withRouter(EditProfile)
);
