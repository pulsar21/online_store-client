import React, { useState } from 'react'
import '../../assets/scss/avatar/Avatar.scss';
import { Avatar, Dropdown, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { PRIVATE_PROFILE_ROUTE, USER_PROFILE } from '../../utils/consts';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useTypeAction } from '../../hooks/useTypeAction';
import { showLogOutModal } from '../modal/LogoutModal';

const TheAvatar = ({user, setPageTranstitonProgressBar}) => {
    const [show, setShow] = useState(false);
    let full_name = user && user.full_name.split(' ').map(name => name[0].toUpperCase()).join('')
    const { signOut } = useTypeAction();
    const history = useHistory();

    const menu = (
        <Menu className="logout-modal__menu">
            <Menu.Item icon={<UserOutlined />} className="logout-modal__item">
                <span className="logout-modal__link" onClick={() => {
                    setPageTranstitonProgressBar(0)
                    user.role === 'ADMIN' ? history.push(`${PRIVATE_PROFILE_ROUTE}/${user.id}`) : history.push(`${USER_PROFILE}/${user.id}`)
                    setPageTranstitonProgressBar(100)
                }}>View profile</span>
            </Menu.Item>
            <Menu.Item icon={<LogoutOutlined />} className="logout-modal__item logout-modal__item-logout">
                <span className="logout-modal__link logout-modal__link-logout" onClick={(e) => showLogOutModal(e, setShow, signOut, history)}>
                    Sign Out
                </span>
            </Menu.Item>
        </Menu>
    );
    return <>
        <div className={`avatar ${user?.role === 'ADMIN' && 'avatar-purple'}`}>
            <Dropdown overlay={menu} trigger={['hover', 'click']} className="avatar__dropdown" placement="bottomRight" arrow>
                <Avatar>{user ? full_name : 'US'}</Avatar>
            </Dropdown>
        </div>
    </>;
};

export default TheAvatar;
