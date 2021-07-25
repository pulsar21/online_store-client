import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { ErrorNotification } from '../../components/notification/ErrorNotification';
import { useTypeAction } from '../../hooks/useTypeAction';
import UserProfile from '../../pages/profile/UserProfile';
import { ERROR_404_ROUTE, SIGNIN_ROUTE } from '../../utils/consts';

const UserProfileContainer = () => {
    const [visible, setVisible] = useState(false);
    const {user, loadingBtn} = useSelector(state => state.user);
    const {loading} = useSelector(state => state.type);
    const [email, setEmail] = useState(user?.email);
    const [fullName, setFullName] = useState(user?.full_name);
    const history = useHistory();
    const { id } = useParams();
    const { getOneUser } = useTypeAction();
    const { editUser } = useTypeAction();

    const handleVisibleClick = () => {
        setVisible(!visible);
    }

    const handleEditClick = async () => {
        if(email === user.email && fullName === user.full_name){
            ErrorNotification('Поля не изменились!',400,'dsa','dsa')
        } else if (email === '' || fullName === '') {
            ErrorNotification('Поля не должны быть пустыми!',400,'dsa','dsa')
        } 
        else {
            await editUser(id, email, fullName)
            setVisible(!visible);
        }
    };

    useEffect(() => {
        try {
            if(user.id !== id) {
                history.push(ERROR_404_ROUTE)
            } else {
                getOneUser(id);
            }
        } catch (error) {
            console.log(error);
            history.push(SIGNIN_ROUTE);
        }
    }, [])

    return <>
        <Skeleton loading={loading} active>
            <UserProfile 
                email={email} setEmail={setEmail} fullName={fullName}
                setFullName={setFullName} visible={visible} user={user}
                loadingBtn={loadingBtn} handleVisibleClick={handleVisibleClick}
                handleEditClick={handleEditClick}
            />
        </Skeleton>
    </>
}

export default UserProfileContainer
