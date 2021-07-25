import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import { useHistory } from 'react-router-dom';
import PrivateMonitor from '../../pages/private/PrivateMonitor';
import { PRIVATE_USER_ROUTE, PRIVATE_ADMIN_ROUTE, PRIVATE_BRAND_ROUTE, PRIVATE_DEVICE_ROUTE, PRIVATE_TYPE_ROUTE, PRIVATE_FOLLOW_NOTIFICATION } from '../../utils/consts';
import { UserOutlined, ShoppingCartOutlined, UserSwitchOutlined, NotificationOutlined } from '@ant-design/icons';

const PrivateMonitorContainer = () => {
    const { users, follow_notification } = useSelector(state => state.user);
    const admins = useSelector(state => state.user.admins);
    const types = useSelector(state => state.type.types);
    const brands = useSelector(state => state.brand.brands);
    const devices = useSelector(state => state.device.devices);
    const { getUsers, getAdmins, getTypes, getDevices, getBrands, getfollowNotification } = useTypeAction();
    const history = useHistory();
    console.log(admins);
    const monitorData = [
        {
            id: 1,
            count: users?.length,
            path: PRIVATE_USER_ROUTE,
            icon: <UserOutlined />,
            name: 'Number of users'
        },
        {
            id: 2,
            count: admins?.rows?.length,
            path: PRIVATE_ADMIN_ROUTE,
            icon: <UserSwitchOutlined />,
            name: 'Number of admin'
        },
        {
            id: 3,
            count: types?.length,
            path: PRIVATE_TYPE_ROUTE,
            icon: <ShoppingCartOutlined />,
            name: 'Number of type'
        },
        {
            id: 4,
            count: brands?.length,
            path: PRIVATE_BRAND_ROUTE,
            icon: <ShoppingCartOutlined />,
            name: 'Number of brand'
        },
        {
            id: 5,
            count: devices?.length,
            path: PRIVATE_DEVICE_ROUTE,
            icon: <ShoppingCartOutlined />,
            name: 'Number of device'
        },
        {
            id: 6,
            count: follow_notification?.length,
            path: PRIVATE_FOLLOW_NOTIFICATION,
            icon: <NotificationOutlined />,
            name: 'Number of device'
        }
    ]

    useEffect(() => {
        try {
            getDevices(); 
            getTypes(); 
            getBrands(); 
            getUsers();   
            getAdmins(); 
            getfollowNotification();
        } catch (error) {
            console.log(error);
        }
    }, []);
    return <>
        <PrivateMonitor users={users} admins={admins} types={types} brands={brands} devices={devices} monitorData={monitorData}/>
    </>
}

export default PrivateMonitorContainer;
