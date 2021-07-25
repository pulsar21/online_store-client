import React from 'react'
import '../../assets/scss/navbar/PrivateNavbar.scss';
import Notification from '../notification/Notification';
import TheAvatar from '../avatar/TheAvatar';
import Country from '../country/Country';
import { MenuOutlined } from '@ant-design/icons';
import LoadingBar from 'react-top-loading-bar';

const PrivateNavbar = ({ toggleSidebar, user, progress, setPageTranstitonProgressBar }) => {

    const onFinished = () => setPageTranstitonProgressBar(0);

    return <>
        <nav className="navbar">
            <LoadingBar color="#3f3d56" progress={progress} onLoaderFinished={onFinished}/>
            <div className="navbar__left">
                <div className="navbar__icon">
                    <MenuOutlined onClick={toggleSidebar} />
                </div>
                <h3>Hi, {user.full_name}</h3>
            </div>
            <div className="navbar__right">
                <Notification />
                <Country />
                <TheAvatar user={user} setPageTranstitonProgressBar={setPageTranstitonProgressBar}/>
            </div>
        </nav>
    </>
}

export default PrivateNavbar
