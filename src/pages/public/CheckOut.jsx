import { Image } from 'antd';
import { Button, Input, Form, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';
import '../../assets/scss/main/CheckOut.scss';
import { BASKET_ROUTE } from '../../utils/consts';

const CheckOut = (props) => {
    const { 
        cartItems, loadingCart, cartTotalPrice,
        street, setStreet, deliveryHandler,
        phone, setPhone, house, setHouse,
        city, setCity, apartment, setApartment,
        cartNumber, setCartNumber, cartFullName,
        setCartFullName, cartDate, setCartDate,
        cartCode, setCartCode, fullName, setFullName,
        email, setEmail
    } = props;

    const history = useHistory();

    return <>
        <section className="checkout">
            <h2>Оформление заказа</h2>
            <div className="checkout__block">
                <div className="checkout__left">
                    <Form
                        className="form"
                        initialValues={{ remember: true }}
                        size={'large'}
                    >
                        <fieldset>
                            <h3 className="checkout__title">Введите контактные данные</h3>
                            <div className="checkout__contacts">
                                <Form.Item
                                    name="full_name"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="text"
                                        placeholder="Ваше имя" 
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="email"
                                        placeholder="Ваш e-mail" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="tel"
                                        placeholder="Ваш телефон" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                            <h3 className="checkout__title">Введите адрессные данные</h3>
                            <div className="checkout__address">
                                <Form.Item
                                    name="city"
                                    className="form__item"
                                >
                                    <select value={city} onChange={(e) => setCity(e.target.value)} className="select checkout__select">
                                        <option value="Uralsk" className="option checkout__option">Uralsk</option>
                                        <option value="Atyrau" className="option checkout__option">Atyrau</option>
                                        <option value="Aktau" className="option checkout__option">Aktau</option>
                                    </select>
                                </Form.Item>
                                <Form.Item
                                    name="street"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="text"
                                        placeholder="Улица" 
                                        value={street} 
                                        onChange={(e) => setStreet(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="house"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="text"
                                        placeholder="Номер дома" 
                                        value={house} 
                                        onChange={(e) => setHouse(e.target.value)}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="apartment"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="text"
                                        placeholder="Номер квартиры" 
                                        value={apartment} 
                                        onChange={(e) => setApartment(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                            <h3 className="checkout__title">Введите данные карты</h3>
                            <div className="checkout__card">
                                <Form.Item
                                    name="card_number"
                                    className="form__item form__item-mt"
                                >
                                    <Input
                                        className="input checkout__input checkout__input-card"
                                        type="text"
                                        placeholder="Номер карты" 
                                        value={cartNumber} 
                                        onChange={(e) => setCartNumber(e.target.value)}
                                        size={12}
                                        minLength={12}
                                        maxLength={12}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="card_date"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="text"
                                        placeholder="ММ / ГГ" 
                                        value={cartDate} 
                                        onChange={(e) => setCartDate(e.target.value)}
                                        size={5}
                                        minLength={5}
                                        maxLength={5}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="card_code"
                                    className="form__item form__item-mt"
                                >
                                    <Input
                                        className="input checkout__input checkout__input-card"
                                        type="text"
                                        placeholder="CVC" 
                                        value={cartCode} 
                                        onChange={(e) => setCartCode(e.target.value)}
                                        size={3}
                                        minLength={3}
                                        maxLength={3}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="card_full_name"
                                    className="form__item"
                                >
                                    <Input
                                        className="input checkout__input"
                                        type="text"
                                        placeholder="Имя владельца" 
                                        value={cartFullName} 
                                        onChange={(e) => setCartFullName(e.target.value)}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item
                                className="form__btn"
                            >
                                <Button.Group className="checkout__group">
                                    <Button onClick={deliveryHandler} className="btn checkout__btn">
                                        Оплата
                                    </Button>
                                    <Button onClick={() => history.push(BASKET_ROUTE)} className="btn checkout__btn" style={{marginLeft: '2rem'}}>
                                        Вернуться в корзину
                                    </Button>
                                </Button.Group>
                            </Form.Item>
                        </fieldset>
                    </Form>
                </div>
                <div className="checkout__right">
                    <h3>Информация о заказе</h3>
                    {
                        cartItems?.length > 0 ? cartItems?.map(item => <div key={item.id} className="checkout__right-cart">
                            <span>
                                <Image src={`${process.env.REACT_APP_API_URL}${item.img}`}/>
                            </span>
                            <div>
                                <h3>{item.name}</h3>
                                <p>$ {item.price}</p>
                                <p>{item.quantity}</p>
                            </div>
                        </div>) : 'No data'
                    }
                    <div className="total-price">
                        <span>Товаров</span>
                        <span>{cartItems?.length > 0 ? cartItems?.length : 0}</span>
                    </div>
                    <div className="total-price">
                        <span>Сумма</span>
                        <span>$ {cartTotalPrice}</span>
                    </div>
                    <Divider />
                    <div className="total-price">
                        <span>К оплате</span>
                        <span>$ {cartTotalPrice}</span>
                    </div>
                </div>
            </div>
        </section>
    </>
};

export default CheckOut;