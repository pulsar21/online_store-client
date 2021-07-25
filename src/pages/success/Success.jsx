import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router';
import '../../assets/scss/Success.scss';
import { SIGNIN_ROUTE } from '../../utils/consts';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';

const Success = () => {
    const history = useHistory();
    return <>
        <section className="success">
            <div className="auth-container">
                <FontAwesomeIcon icon={faCheckCircle} size={"10x"}/>
                <h2 className="success__title">Success</h2>
                <p>Your payment was successfuly</p>
                <button className="btn btn-circle success__btn" onClick={() => history.push(SIGNIN_ROUTE)}>Go Home</button>
            </div>
        </section>
    </>
};

export default Success;
