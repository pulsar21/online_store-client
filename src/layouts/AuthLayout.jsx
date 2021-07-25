import React from 'react';
import '../assets/scss/layout/AuthLayout.scss';

const AuthLayout = (props) => {
    return <>
        <div className="public-wrapper">
            { props.children }
        </div>
    </>;
};

export default AuthLayout;
