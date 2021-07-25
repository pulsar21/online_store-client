import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';

import DataLoader from '../../components/loader/DataLoader';
import PrivateType from '../../pages/private/PrivateType';

const PrivateTypeContainer = () => {
    let { types, loading, loadingBtn, page, limit, totalCount} = useSelector(state => state.type);
    const { getTypes, deleteType, setCurrentPageType, searchTypes } = useTypeAction();
    const [searchName, setSearchName] = useState('');
    const [sort, setSort] = useState('');
    
    const pageChangeHandler = (currentPage) => {
        setCurrentPageType(currentPage);
    };

    const searchClickHandler = () => {
        searchTypes(searchName, page, limit);
    }

    const sortHandleChange = (value) => {
        setSort(value);
    };
    console.log(types);

    const deleteClickHandler = async(e, id, name) => {
        e.stopPropagation();
        try {
            await deleteType(id, name); 
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            getTypes(page, limit, sort); 
        } catch (error) {
            console.log(error);
        }
    }, [page, sort]);

    return <>
        <PrivateType 
            types={types} deleteClickHandler={deleteClickHandler} loadingBtn={loadingBtn}
            page={page} limit={limit} totalCount={totalCount} pageChangeHandler={pageChangeHandler}
            searchClickHandler={searchClickHandler} searchName={searchName} setSearchName={setSearchName}
            sortHandleChange={sortHandleChange} loading={loading}
        />
    </>
}

export default PrivateTypeContainer;
