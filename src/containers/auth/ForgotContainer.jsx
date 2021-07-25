import React, { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppLoader from '../../components/loader/AppLoader';
import { useTypeAction } from '../../hooks/useTypeAction';

const Forgot = lazy(() => import('../../pages/auth/Forgot'));

const ForgotContainer = () => {
    const [email, setEmail] = useState('');

    const { forgot } = useTypeAction();
    const { send, loadingBtn } = useSelector(state => state.user);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgot(email);
    };

    return <>
        <Suspense fallback={<AppLoader />}>
            <Forgot 
                email={email} setEmail={setEmail} send={send} loadingBtn={loadingBtn}
                history={history} handleSubmit={handleSubmit}
            />
        </Suspense>
    </>
};

export default ForgotContainer;