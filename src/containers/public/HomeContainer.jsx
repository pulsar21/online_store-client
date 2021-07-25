import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTypeAction } from '../../hooks/useTypeAction';
import { useHistory } from 'react-router';
import Home from '../../pages/public/Home';
import AppLoader from '../../components/loader/AppLoader';
import { Skeleton } from 'antd';

const HomeContainer = () => {
    const {devices, loading} = useSelector(state => state.device);
    const { selectedBrand, brands } = useSelector(state => state.brand)
    const { getDevices, getBrands, setSelectedBrand } = useTypeAction();
    const history = useHistory();

    useEffect(() => {
        try {
            getDevices(null, null, 1, 100);
        } catch (error) {
            console.log(error);
        }
    },[])

    return <>
        <Home devices={devices} history={history} loading={loading} />
    </>
}

export default HomeContainer
