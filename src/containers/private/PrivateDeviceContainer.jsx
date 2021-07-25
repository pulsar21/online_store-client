import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';

import DataLoader from '../../components/loader/DataLoader';
import PrivateDevice from '../../pages/private/PrivateDevice';
import { ErrorNotification } from '../../components/notification/ErrorNotification';

const PrivateDeviceContainer = () => {
    let { devices, loading, loadingBtn, page, limit, totalCount } = useSelector(state => state.device);
    let { types, selectedType } = useSelector(state => state.type);
    let { brands, selectedBrand } = useSelector(state => state.brand);
    const [searchName, setSearchName] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);
    const [filterBrandShow, setFilterBrandShow] = useState(true);
    const [filterTypeShow, setFilterTypeShow] = useState(true);
    const [sort, setSort] = useState('');
    const { getDevices, getTypes, getBrands, deleteDevice, setCurrentPageDevice , searchDevices, setSelectedType, setSelectedBrand} = useTypeAction();

    const pageChangeHandler = (currentPage) => {
        setCurrentPageDevice(currentPage);
    };

    const deleteClickHandler = async(e, id, name) => {
        e.stopPropagation();
        try {
            await deleteDevice(id, name); 
        } catch (error) {
            console.log(error);
        }
    };

    const searchClickHandler = () => {
        return searchDevices(searchName, selectedType?.id, selectedBrand?.id)
    };

    const sortHandleChange = (value) => {
        setSort(value);
    };

    useEffect(() => {
        try {
            getDevices(selectedType?.id, selectedBrand?.id, page, limit, sort); 
        } catch (error) {
            console.log(error);
        }
    }, [page, selectedType, selectedBrand, sort]);

    useEffect(() => {
        try {
            getTypes(1, 20); 
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            getBrands(1, 20); 
        } catch (error) {
            console.log(error);
        }
    }, []);
    
    return <>
        <PrivateDevice 
            devices={devices} types={types} brands={brands} 
            loadingBtn={loadingBtn} deleteClickHandler={deleteClickHandler} 
            pageChangeHandler={pageChangeHandler} page={page} limit={limit} 
            totalCount={totalCount} setSelectedBrand={setSelectedBrand}
            setSelectedType={setSelectedType} selectedType={selectedType}
            selectedBrand={selectedBrand} searchClickHandler={searchClickHandler}
            sortHandleChange={sortHandleChange} searchName={searchName} setSearchName={setSearchName}
            filterBrandShow={filterBrandShow} setFilterBrandShow={setFilterBrandShow}
            filterTypeShow={filterTypeShow} setFilterTypeShow={setFilterTypeShow}
            loading={loading}
        />
    </>
}

export default PrivateDeviceContainer;
