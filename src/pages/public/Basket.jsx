import { DeleteOutlined } from '@ant-design/icons';
import { Button, Divider, Empty, Image, Select, Skeleton } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import { CHECKOUT_ROUTE, PUBLIC_DEVICE_ROUTE } from '../../utils/consts';
import React from 'react'
import '../../assets/scss/main/Basket.scss';
import { ErrorNotification } from '../../components/notification/ErrorNotification';

const Basket = (props) => {
    const { 
        cartItems, loadingCartBtn, cartTotalPrice, removeCartItemHandler,
        qty, setQty, loadingCart
    } = props;

    const history = useHistory();

    return <>
        <section className="basket">
            <div className="basket__block">
                <div className="basket__left">
                    <h2>Shopping Cart</h2>
                    <div className="basket__left-content">
                    
                        {
                            cartItems?.length > 0 ? cartItems?.map(item => <div key={item.id} className="basket__left-content__card">
                                <span>
                                    <Image src={`${process.env.REACT_APP_API_URL}${item.img}`} />
                                </span>
                                <h3>{item.name}</h3>
                                <div>
                                    <p>$ {item.price}</p>
                                    <div className="quantity">
                                        <select value={qty} onChange={e => setQty(e.target.value)}>
                                            {item.count >= 1 ? <option value="1">1</option> : null}
                                            {item.count >= 2 ? <option value="2">2</option> : null}
                                            {item.count >= 5 ? <option value="5">5</option> : null}
                                            {item.count >= 10 ? <option value="10">10</option> : null}
                                        </select>
                                    </div>
                                    <Button 
                                        icon={<DeleteOutlined/>} 
                                        className="delete" 
                                        loading={loadingCartBtn}
                                        onClick={(e) => removeCartItemHandler(e, item.id, item.name)}
                                    />
                                </div>
                            </div>) : <div className="basket__left-content__empty">
                                <Empty 
                                    description={
                                    <div>
                                        <p>No Item</p>
                                        <NavLink to={PUBLIC_DEVICE_ROUTE}>Go Back</NavLink>
                                    </div>
                                    }
                                />
                            </div>
                        }
                    </div>
                </div>  
                <Skeleton loading={loadingCart} active>
                    <div className="basket__right">
                        <div className="basket__right-content">
                            <h2>{cartItems?.length > 0 ? `Subtotal (${cartItems?.length}) items` : 'No Item'}</h2>
                        </div>
                        <Divider />
                        <div className="subtotal">
                            <span>Subtotal</span>
                            <span>$ {cartTotalPrice}</span>
                        </div>
                        <div className="total">
                            <span>Total to Pay</span>
                            <span>$ {cartTotalPrice}</span>
                        </div>
                        <Divider />
                        <div className="basket__right-footer">
                            <Button 
                                className="btn btn-checkout" 
                                onClick={() => cartItems?.length > 0 ? history.push(CHECKOUT_ROUTE) : ErrorNotification('Добавьте устройсво в корзину', 400, 'Ошибка корзины', 'CHECKOUT_ERROR', null)}
                            >
                                Processed to checkout
                            </Button>
                        </div>
                    </div>
                </Skeleton>
            </div>
        </section>
    </>
}

export default Basket;
