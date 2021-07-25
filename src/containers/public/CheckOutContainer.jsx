import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTypeAction } from '../../hooks/useTypeAction';
import CheckOut from '../../pages/public/CheckOut';
import { PAYMENT_SUCCESS_ROUTE } from '../../utils/consts';

const CheckOutContainer = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [street, setStreet] = useState('');
    const [phone, setPhone] = useState('');
    const [house, setHouse] = useState('');
    const [apartment, setApartment] = useState('');
    const [city, setCity] = useState('Uralsk');
    const [cartNumber, setCartNumber] = useState('');
    const [cartFullName, setCartFullName] = useState('');
    const [cartDate, setCartDate] = useState('');
    const [cartCode, setCartCode] = useState('');

    const { cartItems, loadingCart, cartTotalPrice } = useSelector(state => state.cart);
    const { getCart, addToDelivery, resetCart } = useTypeAction();
    const history = useHistory();

    const deliveryHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('full_name', fullName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('city', city);
        formData.append('street', street);
        formData.append('house', house);
        formData.append('apartment', apartment);
        formData.append('cart_number', cartNumber);
        formData.append('cart_full_name', cartFullName);
        formData.append('cart_date', cartDate);
        formData.append('cart_code', cartCode);
        console.log(fullName, email, phone, city, house, street, apartment, cartNumber, cartFullName, cartDate, cartCode)
        addToDelivery(formData, cartItems);
        history.push(PAYMENT_SUCCESS_ROUTE);
        resetCart();
    }

    useEffect(() => {
        try {
            getCart();
        } catch (error) {
            console.log(error);
        }
    }, [])

    return <>
        <Skeleton loading={loadingCart} active>
            <CheckOut 
                cartItems={cartItems} loadingCart={loadingCart} cartTotalPrice={cartTotalPrice}
                street={street} setStreet={setStreet} deliveryHandler={deliveryHandler}
                phone={phone} setPhone={setPhone} city={city} setCity={setCity} 
                house={house} setHouse={setHouse} apartment={apartment} setApartment={setApartment}
                cartNumber={cartNumber} setCartNumber={setCartNumber} cartFullName={cartFullName}
                setCartFullName={setCartFullName} cartDate={cartDate} setCartDate={setCartDate}
                cartCode={cartCode} setCartCode={setCartCode} fullName={fullName} setFullName={setFullName}
                email={email} setEmail={setEmail}
            />
        </Skeleton>
    </>
}

export default CheckOutContainer;