import React from 'react'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Button } from 'antd';
const FacebookLoginBtn = () => {

    const sendFacebookToken = (userID, accessToken) => {
        axios
        .post('http://localhost:8000/api/v1/user/facebook', {
            userID,
            accessToken
        })
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            console.log('GOOGLE SIGNIN ERROR', error.response);
        });
    };
    const responseFacebook = response => {
        console.log(response);
        sendFacebookToken(response.userID, response.accessToken)
    };

    return <> 
         <FacebookLogin
            appId={"481617016599145"}
            render={(renderProps) => (
                <Button className="btn" onClick={renderProps.onClick}>
                    <FontAwesomeIcon icon={faFacebook} className="google-icon"/>
                    <span>Sign In with Facebook</span>
                </Button>
            )} 
            autoLoad={false}
            callback={responseFacebook}
        />
    </>
}

export default FacebookLoginBtn
