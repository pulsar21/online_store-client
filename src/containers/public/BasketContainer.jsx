import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import Basket from '../../pages/public/Basket';

const BasketContainer = () => {
    const [qty, setQty] = useState(1);

    const { cartItems, loadingCart, loadingCartBtn, cartTotalPrice } = useSelector(state => state.cart);
    const { getCart, removeFromCart } = useTypeAction();

    const removeCartItemHandler = (e, id, name) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            removeFromCart(id, name);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        try {
            getCart();
        } catch (error) {
            console.log(error);
        }
    }, [cartTotalPrice])
    return <>
        <Skeleton loading={loadingCart} active>
            <Basket 
                cartItems={cartItems} loadingCartBtn={loadingCartBtn} cartTotalPrice={cartTotalPrice} 
                removeCartItemHandler={removeCartItemHandler} qty={qty} setQty={setQty} 
                loadingCart={loadingCart}
            />
        </Skeleton>
    </>
}

export default BasketContainer
