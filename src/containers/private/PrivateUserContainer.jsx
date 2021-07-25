import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import DataLoader from '../../components/loader/DataLoader';
import { ErrorNotification } from '../../components/notification/ErrorNotification';
import { useTypeAction } from '../../hooks/useTypeAction';
import PrivateUser from '../../pages/private/PrivateUser';

const PrivateUserContainer = () => {
    let {users, user, loading, loadingBtn, page, limit, totalCount} = useSelector(state => state.user);
    const { getUsers, deleteUser, setCurrentPageUser, searchUsers } = useTypeAction();
    const [searchName, setSearchName] = useState('');
    const [sort, setSort] = useState('');

    const pageChangeHandler = (currentPage) => {
        setCurrentPageUser(currentPage);
    };

    const searchClickHandler = () => {
        searchUsers(searchName);
    }

    const deleteClickHandler = async(e, id, email) => {
        e.stopPropagation();
        try {
            if(id !== user.id) {
                await deleteUser(id, email); 
            } else {
                ErrorNotification('delete',500, 'DateError', 'Вы не можете удалить себя')
            } 
        } catch (error) {
            console.log(error);
        }
    };
    
    const sortHandleChange = (value) => {
        setSort(value);
    };
    
    useEffect(() => {       
        try {
            getUsers(page, limit, sort);   
        } catch (error) {
            console.log(error);
        }
    }, [page, sort])
  
    return <>
        <PrivateUser 
            users={users} user={user} deleteClickHandler={deleteClickHandler} 
            loadingBtn={loadingBtn} pageChangeHandler={pageChangeHandler} page={page} 
            limit={limit} totalCount={totalCount} setSearchName={setSearchName} searchName={searchName}
            loading={loading} searchClickHandler={searchClickHandler} sortHandleChange={sortHandleChange}
        />
    </>
}

export default PrivateUserContainer;
