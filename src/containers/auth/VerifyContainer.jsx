import React, { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import AppLoader from '../../components/loader/AppLoader';
import { useTypeAction } from '../../hooks/useTypeAction';

const Verify = lazy(() => import('../../pages/auth/Verify'));

const VerifyContainer = () => {
    const [code, setCode] = useState(0);
    
    const { loadingBtn, verify } = useSelector(state => state.user);
    const { verifyAccount } = useTypeAction();

    const history = useHistory();
    const {id, token} = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        verifyAccount(id, token, code);
    };

    return <>
        <Suspense fallback={<AppLoader />}>
            <Verify 
                code={code} setCode={setCode} loadingBtn={loadingBtn} verify={verify}
                history={history} handleSubmit={handleSubmit}
            />
        </Suspense>
    </>
};

export default VerifyContainer;