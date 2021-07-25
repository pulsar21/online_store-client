import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import DataLoader from '../../components/loader/DataLoader';
import { useTypeAction } from '../../hooks/useTypeAction';
import PrivateAdmin from '../../pages/private/PrivateAdmin';

const PrivateAdminContainer = () => {
    let { admins, loading, page, limit, totalCount } = useSelector(state => state.admin);
    const { getAdmins, searchAdmins, setCurrentPageAdmin } = useTypeAction();
    const [searchName, setSearchName] = useState('');
    const [sort, setSort] = useState('');

    const searchClickHandler = () => {
        searchAdmins(searchName)
    }
    const pageChangeHandler = (currentPage) => {
        setCurrentPageAdmin(currentPage);
    };

    const sortHandleChange = (value) => {
        setSort(value);
    };

    useEffect(() => {
        try {
            getAdmins(page, limit, sort); 
        } catch (error) {
            console.log(error);
        }
    }, [page, sort]);
    
    return <>
        <PrivateAdmin 
            admins={admins} loading={loading} searchClickHandler={searchClickHandler}
            pageChangeHandler={pageChangeHandler} sortHandleChange={sortHandleChange}
            searchName={searchName} setSearchName={setSearchName} page={page}
            limit={limit} totalCount={totalCount}
        />
    </>
}

export default PrivateAdminContainer;
