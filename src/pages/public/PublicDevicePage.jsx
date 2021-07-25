import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTypeAction } from '../../hooks/useTypeAction';
import { useHistory, useParams } from 'react-router-dom';
import DataLoader from '../../components/loader/DataLoader';
import DevicePageImg from '../../assets/img/auth/avatar.jpg';
import { Button, Col, Divider, Image, Rate, Row, Select, Skeleton } from 'antd';
import '../../assets/scss/main/PublicDevicePage.scss';
import { EnvironmentOutlined, HeartOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { Option } from 'antd/lib/mentions';


const PublicDevicePage = () => {
    const [qty, setQty] = useState(1);
    const {device, loading} = useSelector(state => state.device);
    const { getOneDevice, addToCart } = useTypeAction();
    const history = useHistory();
    const { id } = useParams();


    const addToCartHandler = (e) => {
        e.preventDefault();
        addToCart(device?.id, +qty);
    }
   
    useEffect(() => {
        try {
            getOneDevice(id);
        } catch (error) {
            console.log(error);
        }
    }, [])
   
    return <>
        <section className="device-detail">
            <Skeleton loading={loading}>
                <div className="device-detail__block">
                    <Row>
                        <Col md={10}>
                            <div className="device-detail__left">
                                <div className="show">
                                    <div className="header">
                                        <h3 className="title">
                                            {device?.name}
                                        </h3>
                                        <div className="add-to-wishlist">
                                            <HeartOutlined />
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className="thumb">
                                    <Image src={`${process.env.REACT_APP_API_URL}/${device?.img}`}/>
                                </div>
                            </div>
                        </Col>
                        <Col md={14}>
                            <div className="device-detail__right">
                                <div className="hide">
                                    <div className="header">
                                        <h3 className="title">
                                            {device?.name}
                                        </h3>
                                        <div className="add-to-wishlist">
                                            <HeartOutlined />
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                                <div className="content">
                                    <div className="content__left">
                                        <div className="price">
                                            <span>$ {device?.price}</span>
                                        </div>
                                        <div className="rating">
                                            <Rate allowHalf disabled value={device?.rating}/>
                                        </div>
                                        <div className="status">
                                            <span>{device?.count > 0 ? 'В наличие' : 'Нет в наличие'}</span>
                                        </div>
                                        <div className="quantity">
                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                {[...Array(device?.count).keys()].map(count => <option key={count + 1} value={count + 1}>
                                                    {count + 1}
                                                </option>)}
                                            </select> 
                                        </div>
                                        <div className="description">
                                            <p>{device?.description}</p>
                                        </div>
                                        <div className="add-to-cart">
                                            <Button className="btn-circle" size="large" onClick={addToCartHandler}>Добавить в корзину</Button>
                                        </div>
                                        <div className="characters">
                                            <div className="characters__header">
                                                Описание <span>|</span> Характеристики
                                            </div>
                                            
                                            <div className="characters__content">
                                                {device?.info.length !== 0 ? device?.info.map(info => <div key={info.id}>
                                                    {info.title} : <span>
                                                        {info.description}
                                                    </span>
                                                </div>) : <div className="characters__empty">Характеристики пусты</div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="content__right">
                                        <h3 className="title">Заказы от 10 000 тенге доставим бесплатно</h3>
                                        <div className="pickup">
                                            <h3>Самовызов</h3>
                                            <div>
                                                <div className="pickup__thumb">
                                                    <EnvironmentOutlined />
                                                </div>
                                                <div className="pickup__content">
                                                    <h3>Самовывоз из магазина</h3>
                                                    <p>29 апреля - <span>бесплатно</span></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="delivery">
                                            <h3>Доставка</h3>
                                            <div>
                                                <div className="delivery__thumb">
                                                    <UserOutlined />
                                                </div>
                                                <div className="delivery__content">
                                                    <h3>Курьерская доставка</h3>
                                                    <p>1 мая - <span>бесплатно</span></p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="delivery__thumb">
                                                    <SafetyOutlined />
                                                </div>
                                                <div className="delivery__content">
                                                    <h3>Гарантия самой низкой цены</h3>
                                                    <p><span>Подробнее</span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Skeleton>
        </section>
    </>
}

export default PublicDevicePage
