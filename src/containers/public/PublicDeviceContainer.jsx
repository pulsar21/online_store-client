import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTypeAction } from '../../hooks/useTypeAction';
import PublicDevice from '../../pages/public/PublicDevice'
import DataLoader from '../../components/loader/DataLoader';
import { useHistory } from 'react-router';
import { Skeleton } from 'antd';

const PublicDeviceContainer = () => {
    const {devices, loading, page, limit, totalCount} = useSelector(state => state.device);
    const {types, selectedType} = useSelector(state => state.type);
    const {brands, selectedBrand} = useSelector(state => state.brand);
    const { loadingCartBtn } = useSelector(state => state.cart)
    const { 
        getDevices, getTypes, filterPriceRangeDevices, 
        filterRatingRangeDevices, getBrands, setSelectedBrand, 
        setSelectedType, setPageTranstitonProgressBar, setCurrentPageDevice,
        addToCart
    } = useTypeAction();
    const history = useHistory();

    const [sort, setSort] = useState('');

    const sortHandleChange = (value) => {
        setSort(value);
    };

    const pageChangeHandler = (currentPage) => {
        setCurrentPageDevice(currentPage);
    };

    useEffect(() => {
        try {
            getDevices(selectedType?.id, selectedBrand?.id, page, limit, sort);
        } catch (error) {
            console.log(error);
        }
    },[selectedType, selectedBrand, page, sort])

    useEffect(() => {
        try {
            getBrands(1, 100, null);
        } catch (error) {
            console.log(error);
        }
    },[])

    return <>
        <Skeleton loading={loading} active>
            <PublicDevice 
                devices={devices} history={history} types={types} 
                brands={brands} setSelectedBrand={setSelectedBrand}
                selectedType={selectedType} selectedBrand={selectedBrand}
                setSelectedType={setSelectedType} setPageTranstitonProgressBar={setPageTranstitonProgressBar}
                loading={loading} sortHandleChange={sortHandleChange} pageChangeHandler={pageChangeHandler}
                page={page} limit={limit} totalCount={totalCount} filterPriceRangeDevices={filterPriceRangeDevices}
                filterRatingRangeDevices={filterRatingRangeDevices} addToCart={addToCart} loadingCartBtn={loadingCartBtn}
            />
        </Skeleton>
    </>
}

export default PublicDeviceContainer
