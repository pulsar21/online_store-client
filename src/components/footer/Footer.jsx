import React, { useState } from 'react';
import '../../assets/scss/footer/Footer.scss';
import Search from 'antd/lib/input/Search';
import { useTypeAction } from '../../hooks/useTypeAction';
import { FacebookFilled, FacebookOutlined, InstagramFilled, InstagramOutlined, LinkedinOutlined, TwitterOutlined, TwitterSquareFilled, YoutubeFilled, YoutubeOutlined } from '@ant-design/icons';
import { Form, Skeleton } from 'antd';
import { useSelector } from 'react-redux';
const Footer = () => {
    const [email, setEmail] = useState('');
    const {loadingBtn} = useSelector(state => state.user);
    const {loading} = useSelector(state => state.type);
    const { userfollowNotification } = useTypeAction();
    return <>
      <Skeleton loading={loading} active>
        <footer className="footer">
                <div className="footer__block">
                    <div className="footer__left">
                        <h4>Будьте в курсе новостей</h4>
                        <p>Подпишитесь на последние обновления и узнавайте о новинках и специальных предложениях первыми</p>
                        <div className="footer__search">
                            <h4>Связь с нами</h4>
                            <Form>
                                <Search 
                                    className="search" 
                                    enterButton="Подписаться" 
                                    placeholder="Адрес электронный почты..."
                                    loading={loadingBtn}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    onSearch={() => userfollowNotification(email)}
                                />    
                            </Form>
                        </div>
                        <div className="social">
                            <h4>Мы в соцсетях</h4>
                            <ul>
                                <li>
                                    <a href="#">
                                        <YoutubeOutlined />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <InstagramOutlined />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <LinkedinOutlined />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <FacebookOutlined />
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <TwitterOutlined />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer__right">
                        <div className="content">
                            <ul className="menu">
                                <li>
                                    <a href="#" className="active">
                                        Интернет магазин
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Акции
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Новости   
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Гарантия низкой цены
                                    </a>
                                </li>
                            </ul>
                            <ul className="menu">
                                <li>
                                    <a href="#" className="active">
                                        Компания «Майнинг»
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        О компании
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Контакты
                                    </a>
                                </li>
                            </ul>
                            <ul className="menu">
                                <li>
                                    <a href="#" className="active">
                                        Помощь покупателю
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Как сделать заказ
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Доставка и оплата
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Как найти товар
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Все бренды
                                    </a>
                                </li>
                                <li className="hotline">
                                    <h3>1717</h3>
                                    <span>Горячая линия с 08:00 до 00:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
      </Skeleton>
    </>
}

export default Footer
