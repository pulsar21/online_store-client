import React, { useState } from 'react'
import '../../assets/scss/sidebar/Sidebar.scss';
import { DesktopOutlined, HomeOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined, UserSwitchOutlined, CloseOutlined, NotificationOutlined, SettingOutlined, SettingFilled, ProfileOutlined } from '@ant-design/icons';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import {
    MONITOR_ROUTE, PRIVATE_USER_ROUTE, HOME_ROUTE, PRIVATE_DEVICE_ROUTE, 
    PRIVATE_BRAND_ROUTE, PRIVATE_ADMIN_ROUTE, PRIVATE_TYPE_ROUTE, SIGNIN_ROUTE, 
    PRIVATE_FOLLOW_NOTIFICATION, PRIVATE_NOTIFICATION_ROUTE, PRIVATE_PROFILE_ROUTE, PRIVATE_SETTINGS_ROUTE
} from '../../utils/consts';
import { useTypeAction } from '../../hooks/useTypeAction';
import { showLogOutModal } from '../modal/LogoutModal';

const PrivateSidebar = ({sidebarOpen, toggleSidebar, user, setPageTranstitonProgressBar}) => {
    const [show, setShow] = useState(false);
    const { signOut } = useTypeAction();
    const history = useHistory();
    const { pathname } = useLocation();

    const productsLinkData = [
        {
            id: 1,
            activeLink: 'active__menu__link',
            icon: <ShoppingCartOutlined />,
            route: PRIVATE_TYPE_ROUTE,
            name: 'Types'
        },
        {
            id: 2,
            activeLink: 'active__menu__link',
            icon: <ShoppingCartOutlined />,
            route: PRIVATE_BRAND_ROUTE,
            name: 'Brands'
        },
        {
            id: 3,
            activeLink: 'active__menu__link',
            icon: <ShoppingCartOutlined />,
            route: PRIVATE_DEVICE_ROUTE,
            name: 'Devices'
        },
    ]

    const usersLinkData = [
        {
            id: 1,
            activeLink: 'active__menu__link',
            icon: <UserOutlined />,
            route: PRIVATE_USER_ROUTE,
            name: 'Users'
        },
        {
            id: 2,
            activeLink: 'active__menu__link',
            icon: <UserSwitchOutlined />,
            route: PRIVATE_ADMIN_ROUTE,
            name: 'Admins'
        },
    ]

    const notificationsLinkData = [
        {
            id: 1,
            activeLink: 'active__menu__link',
            icon: <NotificationOutlined />,
            route: PRIVATE_FOLLOW_NOTIFICATION,
            name: 'Follow Notifications'
        },
        {
            id: 2,
            activeLink: 'active__menu__link',
            icon: <NotificationOutlined />,
            route: PRIVATE_NOTIFICATION_ROUTE,
            name: 'Notifications'
        },
    ]

    const accountLinkData = [
        {
            id: 1,
            activeLink: 'active__menu__link',
            icon: <ProfileOutlined />,
            route: `${PRIVATE_PROFILE_ROUTE}/${user.id}`,
            name: 'Profile'
        },
        {
            id: 2,
            activeLink: 'active__menu__link',
            icon: <SettingOutlined />,
            route: PRIVATE_SETTINGS_ROUTE,
            name: 'Settings'
        },
    ]

    const dashboardLinkData = [
        {
            id: 1,
            activeLink: 'active__menu__link',
            icon: <DesktopOutlined />,
            route: MONITOR_ROUTE,
            name: 'Monitor'
        },
        {
            id: 2,
            activeLink: 'active__menu__link',
            icon: <HomeOutlined />,
            route: HOME_ROUTE,
            name: 'Store'
        },
    ]

    console.log(pathname)
    return <>
        <div className={`${sidebarOpen ? "sidebar-responsive sidebar" : "sidebar"}`}>
            <div className="sidebar__title" style={sidebarOpen ? {justifyContent: 'space-between'} : {justifyContent: 'center'}}>
                <h1>Maining Store</h1>
                <CloseOutlined id="sidebarIcon" onClick={toggleSidebar}/>
            </div>
            <div className="sidebar__menu">
                <h2>Dashboard</h2>
                <div>
                    {
                        dashboardLinkData.map(({id, activeLink, icon, route, name}) => 
                        <div className={`sidebar__link ${route === pathname ? activeLink : ''}`} key={id}>
                            {icon}
                            <NavLink to={route} onClick={() => {
                                setPageTranstitonProgressBar(0)
                                setPageTranstitonProgressBar(100)
                            }}>{name}</NavLink>
                        </div>)
                    }
                </div>
                <h2>Account</h2>
                <div>
                    {
                        accountLinkData.map(({id, activeLink, icon, route, name}) => 
                        <div className={`sidebar__link ${route === pathname ? activeLink : ''}`} key={id}>
                            {icon}
                            <NavLink to={route} onClick={() => {
                                setPageTranstitonProgressBar(0)
                                setPageTranstitonProgressBar(100)
                            }}>{name}</NavLink>
                        </div>)
                    }
                </div>
                <h2>Product</h2>
                <div>
                    {
                        productsLinkData.map(({id, activeLink, icon, route, name}) => 
                        <div className={`sidebar__link ${route === pathname ? activeLink : ''}`} key={id}>
                            {icon}
                            <NavLink to={route} onClick={() => {
                                setPageTranstitonProgressBar(0)
                                setPageTranstitonProgressBar(100)
                            }}>{name}</NavLink>
                        </div>)
                    }
                </div>
                <h2>Users</h2>
                <div>
                    {
                        usersLinkData.map(({id, activeLink, icon, route, name}) => 
                        <div className={`sidebar__link ${route === pathname ? activeLink : ''}`} key={id}>
                            {icon}
                            <NavLink to={route} onClick={() => {
                                setPageTranstitonProgressBar(0)
                                setPageTranstitonProgressBar(100)
                            }}>{name}</NavLink>
                        </div>)
                    }
                </div>
                <h2>Notifications</h2>
                <div>
                    {
                        notificationsLinkData.map(({id, activeLink, icon, route, name}) => 
                        <div className={`sidebar__link ${route === pathname ? activeLink : ''}`} key={id}>
                            {icon}
                            <NavLink to={route} onClick={() => {
                                setPageTranstitonProgressBar(0)
                                setPageTranstitonProgressBar(100)
                            }}>{name}</NavLink>
                        </div>)
                    }
                </div>
            </div>
        </div>
    </>
}

export default PrivateSidebar;
