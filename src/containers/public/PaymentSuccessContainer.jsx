import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import PaymentSuccess from '../../pages/public/PaymentSuccess';

const PaymentSuccessContainer = () => {

    const { loadingCart } = useSelector(state => state.cart);
    return <>
        <Skeleton loading={loadingCart} active>
            <PaymentSuccess />
        </Skeleton>
    </>
}

export default PaymentSuccessContainer;