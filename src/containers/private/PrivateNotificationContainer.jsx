import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import PrivateNotification from '../../pages/private/PrivateNotification';

const PrivateNotificationContainer = () => {
    const {notifications, page, limit, totalCount} = useSelector(state => state.notification);
    const {user, users} = useSelector(state => state.user);
    const [searchName, setSearchName] = useState('');

    const { setCurrentPageNotification, searchNotifications, setSortNotification, getUsers, deleteNotification } = useTypeAction();

    const pageChangeHandler = (currentPage) => {
        setCurrentPageNotification(currentPage);
    };

    const searchClickHandler = () => {
        searchNotifications(searchName)
    }

    const sortHandleChange = (value) => {
        setSortNotification(value);
    };

    const deleteClickHandler = async(e, id, title) => {
        e.stopPropagation();
        try {
            await deleteNotification(id, title);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, [])

    return <>
        <PrivateNotification 
            notifications={notifications} user={user} page={page}
            limit={limit} totalCount={totalCount} pageChangeHandler={pageChangeHandler}
            sortHandleChange={sortHandleChange} searchName={searchName} setSearchName={setSearchName}
            searchClickHandler={searchClickHandler} users={users} deleteClickHandler={deleteClickHandler}
        />
    </>
}

export default PrivateNotificationContainer
