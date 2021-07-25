import { ShoppingCartOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import PrivateSettings from '../../pages/private/PrivateSettings';
import { PRIVATE_TYPE_ROUTE } from '../../utils/consts';

const PrivateSettingsContainer = () => {
    const [show, setShow] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('theme-color');
        if(currentThemeColor === 'theme-dark') {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [])
    return <>
        <PrivateSettings darkMode={darkMode} setDarkMode={setDarkMode} setShow={setShow} />
    </>
}

export default PrivateSettingsContainer
