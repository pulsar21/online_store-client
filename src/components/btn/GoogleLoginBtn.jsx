import React from 'react'
import axios from 'axios';
import GoogleLogin from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useTypeAction } from '../../hooks/useTypeAction';
import { Button } from 'antd';
import { useSelector } from 'react-redux';

const GoogleLoginBtn = () => {
    const { google } = useTypeAction();
    const loading = useSelector(state => state.user.loadingGoogleBtn)

    const googleSuccess = async ({tokenId, googleId}) => {
        try {
            await google(googleId, tokenId)
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = async () => {
        console.log('Failure');
    };

    return <> 
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={(renderProps) => (
                <Button className="btn" onClick={renderProps.onClick} disabled={renderProps.disabled} loading={loading}>
                    <FontAwesomeIcon icon={faGoogle} className="google-icon"/>
                    <span>Sign In with Google</span>
                </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
        />
    </>
}

export default GoogleLoginBtn
