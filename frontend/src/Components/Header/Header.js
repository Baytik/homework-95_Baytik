import React, {Component} from 'react';
import './Header.css';
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import userIcon from './user-icon.jpeg';
import {logoutUser} from "../../store/actions/userLogAction";
import {apiURL} from "../../apiURL";

class Header extends Component {

    logoOutUserHandler = () => {
        this.props.logoutUser();
    };

    render() {
        return (
            <header className="header">
                <div className="logo">
                    <NavLink to="/">Home</NavLink>
                </div>
                <nav className="main-nav">
                    <ul>
                        {this.props.user ? (
                            <>
                                <span>Hello, {this.props.user.displayName}!</span>
                                {this.props.user.avatar ? (
                                    <img src={this.props.user.avatar} alt="" className="avatar"/> ||
                                    <img src={apiURL + '/uploads/' + this.props.user.avatar} alt="" className="avatar"/>
                                ) : (
                                    <img src={userIcon} alt="" className="avatar"/>
                                )}
                                <li>
                                    <NavLink to="/new/ingredient">Add new ingredient</NavLink>
                                </li>
                                <li>
                                    <p>/</p>
                                </li>
                                <li>
                                    <NavLink to="/my/ingredient">My ingredient</NavLink>
                                </li>
                                <li>
                                    <p>/</p>
                                </li>
                                <li>
                                    <button onClick={() => this.logoOutUserHandler()}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: (user) => dispatch(logoutUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);