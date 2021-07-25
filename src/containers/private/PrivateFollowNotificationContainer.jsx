import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTypeAction } from '../../hooks/useTypeAction'
import PrivateFollowNotification from '../../pages/private/PrivateFollowNotification';
import DataLoader from '../../components/loader/DataLoader';

const PrivateFollowNotificationContainer = () => {
    const [searchName, setSearchName] = useState('');
    const { follow_notification, loading, page, limit, totalCount } = useSelector(state => state.user);
    const { getfollowNotification, setCurrentPageFollowNotification, searchFollowNotification } = useTypeAction();
    const [sort, setSort] = useState('');

    const pageChangeHandler = (currentPage) => {
        setCurrentPageFollowNotification(currentPage);
    };

    const searchClickHandler = () => {
        searchFollowNotification(searchName);
    }

    const sortHandleChange = (value) => {
        setSort(value);
    };

    useEffect(() => {
        getfollowNotification(page, limit, sort);
    }, [page, sort])

    return <>
        <PrivateFollowNotification 
            follow_notification={follow_notification} page={page} limit={limit} 
            totalCount={totalCount} pageChangeHandler={pageChangeHandler} 
            searchName={searchName} setSearchName={setSearchName}
            searchClickHandler={searchClickHandler} sortHandleChange={sortHandleChange}
            loading={loading}
        />
    </>
}

export default PrivateFollowNotificationContainer
