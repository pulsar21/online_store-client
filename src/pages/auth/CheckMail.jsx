import React from 'react';
import '../../assets/scss/auth/CheckMail.scss';
import { SIGNIN_ROUTE } from '../../utils/consts';
import { MailOutlined } from '@ant-design/icons';

const CheckMail = (props) => {
    const {
        history
    } = props;

    return <>
        <section className="check">
            <div className="auth-container">
                <div className="check__thumb">
                    <MailOutlined />
                </div>
                <h2 className="check__title">Please verify your email</h2>
                <p className="check__desc">A verification code has been sent to your email.</p>
                <button className="btn btn-voilet check__btn" onClick={() => history.push(SIGNIN_ROUTE)}>Go Sign In</button>
            </div>
        </section>
    </>
};

export default CheckMail;
