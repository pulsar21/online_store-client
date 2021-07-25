import React from 'react';
import ErrorImg from '../../assets/img/error/404.svg';
import '../../assets/scss/error/Error.scss';
import { HOME_ROUTE, SIGNIN_ROUTE } from '../../utils/consts';

const Error404 = (props) => {
    const {
        history, isAuth
    } = props;

    return <>
        <section className="error">
            <div className="auth-container">
                <img src={ErrorImg} alt="404" className="error__img"/>
                <h2 className="error__title">Page Not Found</h2>
                <p className="error__desc">We can't find the page you're looking for.</p>
                <button className="btn btn-circle error__btn" onClick={() => isAuth ? history.push(HOME_ROUTE) : history.push(SIGNIN_ROUTE)}>{isAuth ? 'Home' : 'Sign In'}</button>
            </div>
        </section>
    </>
};

export default Error404;
