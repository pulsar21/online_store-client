import { AuditOutlined, CloseOutlined, ContactsOutlined, HomeOutlined, LoginOutlined, LogoutOutlined, PhoneOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PRIVATE_PROFILE_ROUTE, HOME_ROUTE, PUBLIC_DEVICE_ROUTE, SIGNIN_ROUTE, USER_PROFILE, PUBLIC_TYPE_ROUTE, ABOUT_US_ROUTE } from '../../utils/consts';
import { showLogOutModal } from '../modal/LogoutModal';

const PublicSidebar = (props) => {
    const { 
        sidebarOpen, toggleSidebar, show, 
        setShow, history, signOut, user
    } = props;
    const isAuth = useSelector(state => state.user.isAuth);
    return <>
        <div className={`public-sidebar ${sidebarOpen ? 'menu-show' : 'menu-hide'}`}>
            <div className="sidebar__title">
                <div className="sidebar__img">
                    <h1>Maining Store</h1>
                </div>
                <CloseOutlined onClick={toggleSidebar}/>
            </div>
            <ul className="menu-sidebar">
                <li>
                    <NavLink to={HOME_ROUTE}>
                        <HomeOutlined />
                        <span className="title">Дом</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={PUBLIC_DEVICE_ROUTE}>
                        <ShoppingOutlined />
                        <span className="title">Девайсы</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={PUBLIC_TYPE_ROUTE}>
                        <ShoppingOutlined />
                        <span className="title">Типы</span>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={PUBLIC_BRA}>
                        <ShoppingOutlined />
                        <span className="title">Бренды</span>
                    </NavLink>
                </li> */}
                <li>
                    <NavLink to={ABOUT_US_ROUTE}>
                        <AuditOutlined />
                        <span className="title">О нас</span>
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={HOME_ROUTE}>
                        <ContactsOutlined />
                        <span className="title">Свяжитесь с нами</span>
                    </NavLink>
                </li> */}
                <li className="item-phone">
                    <a href="tel:+77074576404">
                        <PhoneOutlined />
                        <span className="title">+7(707)4576404</span>
                    </a>
                </li>
                { isAuth ? 
                    <><li>
                        <NavLink 
                            to={user?.role === 'ADMIN' ? `${PRIVATE_PROFILE_ROUTE}/${user?.id}` : `${USER_PROFILE}/${user?.id}`}
                        >
                            <UserOutlined />
                            <span className="title">{user?.email}</span>
                        </NavLink>
                    </li> 
                    <li className="sign-out">
                        <NavLink to={SIGNIN_ROUTE} onClick={(e) => showLogOutModal(e, setShow, signOut, history)}>
                            <LogoutOutlined />
                            <span className="title">Выйти</span>
                        </NavLink>
                    </li></> :  
                    <li>
                        <NavLink to={SIGNIN_ROUTE}>
                            <LoginOutlined />
                            <span className="title">Войти</span>
                        </NavLink>
                    </li>
                }
            </ul>
        </div>
    </>
}

export default PublicSidebar
