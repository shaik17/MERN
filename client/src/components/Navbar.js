import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../action/authAction';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


function Navbar(props) {
    const { isAuthenticated, user } = props.auth;
    const logoutfunction = (e) => {
        e.preventDefault();
        props.logoutUser();
    }
    const authnav = (
        <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link className="nav-link text-white" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item ">

                <a href="#" className="nav-link text-white" onClick={logoutfunction}>
                    <img src={user.avatar} className="rounded-circle" style={{ width: "25px", marginRight: "8px" }} alt={user.name} />Logout</a>
            </li>

        </ul>

    )
    const guestnav = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
                <Link className="nav-link text-white" to="/register">Register <span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item ">
                <Link className="nav-link text-white" to="/login">Login</Link>
            </li>
        </ul>
    )

    return (


        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark ">
                <Link className="navbar-brand text-white p-1" to="/">Developer</Link>
                <Link className="navbar-brand text-white" to="#">Devconnecter</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    {isAuthenticated ? authnav : guestnav}
                </div>
            </nav>

        </div>
    )
}
Navbar.propTypes = {
    logoutUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);
