import React from 'react';
import './FacebookLogin.css';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {useDispatch} from "react-redux";
import {loginWithFacebook} from "../../store/actions/userLogAction";
import icon from './facebook.png';

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const callback = (facebookData) => {
        if (facebookData.id) {
            dispatch(loginWithFacebook(facebookData));
        }
    };

    return (
        <FacebookLoginButton
            appId="3109373302426478"
            callback={callback}
            fields="name, picture"
            render={renderProps => (
                <button onClick={renderProps.onClick} className="facebook"><img src={icon} alt=""/></button>
            )}
        />
    );
};

export default FacebookLogin;