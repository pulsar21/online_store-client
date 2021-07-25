import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';

import DataLoader from '../../components/loader/DataLoader';
import PrivateBrand from '../../pages/private/PrivateBrand';

const PrivateBrandContainer = () => {
    let { brands, loading, loadingBtn, page, limit, totalCount } = useSelector(state => state.brand);
    const { getBrands, deleteBrand, setCurrentPageBrand, searchBrands } = useTypeAction();
    const [searchName, setSearchName] = useState('');
    const [sort, setSort] = useState('');

    const searchClickHandler = () => {
        searchBrands(searchName, page, limit);
    }
    const pageChangeHandler = (currentPage) => {
        setCurrentPageBrand(currentPage);
    };

    const sortHandleChange = (value) => {
        setSort(value);
    };

    const deleteClickHandler = async(e, id, name) => {
        e.stopPropagation();
        try {
            await deleteBrand(id, name); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            getBrands(page, limit, sort); 
        } catch (error) {
            console.log(error);
        }
    }, [page, sort]);
    
    return <>
        <PrivateBrand 
            brands={brands} deleteClickHandler={deleteClickHandler} loadingBtn={loadingBtn}
            page={page} limit={limit} totalCount={totalCount} pageChangeHandler={pageChangeHandler}
            searchClickHandler={searchClickHandler} searchName={searchName} setSearchName={setSearchName}
            sortHandleChange={sortHandleChange} loading={loading}
        />
    </>
}

export default PrivateBrandContainer;
