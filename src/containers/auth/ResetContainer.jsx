import React, { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AppLoader from '../../components/loader/AppLoader';
import { useTypeAction } from '../../hooks/useTypeAction';

const Reset = lazy(() => import('../../pages/auth/Reset'));

const ResetContainer = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { loadingBtn, send } = useSelector(state => state.user);
    const history = useHistory();
    const { reset } = useTypeAction();
    const {id, token} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        reset(id, token, password, confirmPassword);
    };

    return <>
        <Suspense fallback={<AppLoader />}>
            <Reset 
                password={password} setPassword={setPassword} confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword} loadingBtn={loadingBtn} send={send}
                history={history} handleSubmit={handleSubmit}
            />
        </Suspense>
    </>
};

export default ResetContainer;