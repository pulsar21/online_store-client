import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Switch } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import '../../assets/scss/admin/Settings.scss';
import { showLogOutModal } from '../../components/modal/LogoutModal'
import { useSelector } from 'react-redux'
import { useTypeAction } from '../../hooks/useTypeAction'
import { SIGNIN_ROUTE } from '../../utils/consts'

const PrivateSettings = ({darkMode, setDarkMode, setShow}) => {
    const user = useSelector(state => state.user.user);
    const history = useHistory();
    const { signOut } = useTypeAction();
    
    const changeColorMode = () => {
        if(darkMode) {
          localStorage.setItem('theme-color', 'theme-light')
          setDarkMode(false);
        } else {
          localStorage.setItem('theme-color', 'theme-dark')
          setDarkMode(true);
        }
    };
    return <>
        <section className="settings">
            <div className="settings__block">
                <div className="account" style={{marginTop: '1rem'}}>
                    <h4 className="title">Account Settings</h4>
                    <div className="account__email"  style={{marginTop: '1rem'}}>
                        <p>{user.email}</p>
                        <NavLink to={SIGNIN_ROUTE} onClick={(e) => showLogOutModal(e, setShow, signOut, history)}>Log Out</NavLink>
                    </div>
                </div>
                <div className="switch"  style={{marginTop: '1rem'}}>
                    <h4 className="title">Light / Dark mode</h4>
                    <Switch
                        checked={darkMode}
                        checkedChildren={<FontAwesomeIcon icon={faSun} style={{fill: 'yellow', color: 'yellow'}}/>}
                        unCheckedChildren={<FontAwesomeIcon icon={faMoon} style={{fill: 'yellow', color: 'yellow'}}/>}
                        onChange={changeColorMode}
                    />     
                </div>
            </div>
        </section>
    </>
}

export default PrivateSettings;
