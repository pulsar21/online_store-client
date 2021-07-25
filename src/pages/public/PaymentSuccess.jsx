import { Image } from 'antd';
import { Button, Input, Form, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import '../../assets/scss/main/PaymentSuccess.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-regular-svg-icons';
import { PUBLIC_DEVICE_ROUTE, SIGNIN_ROUTE } from '../../utils/consts';

const PaymentSuccess = (props) => {
    const { 
       
    } = props;
    const history = useHistory();
    return <>
        <section className="payment">
            <div className="auth-container">
                <FontAwesomeIcon icon={faCheckCircle} size={"10x"}/>
                <h2 className="success__title">Success</h2>
                <p>Your payment was successfuly</p>
                <button className="btn btn-circle payment__btn" onClick={() => history.push(PUBLIC_DEVICE_ROUTE)}>Go Home</button>
            </div>
        </section>
    </>
};

export default PaymentSuccess;