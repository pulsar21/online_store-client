import React from 'react'
import { useSelector } from 'react-redux'
import AboutUs from '../../pages/public/AboutUs'

const AboutUsContainer = () => {
    const loading = useSelector(state => state.type.loading);
    return <>
        <AboutUs loading={loading}/>
    </>
}

export default AboutUsContainer
