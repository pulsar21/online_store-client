import React, { lazy, Suspense } from 'react';
import { useHistory } from 'react-router-dom';
import AppLoader from '../../components/loader/AppLoader';

const CheckMail = lazy(() => import('../../pages/auth/CheckMail'));

const CheckMailContainer = () => {
    const history = useHistory();

    return <>
        <Suspense fallback={<AppLoader />}>
            <CheckMail history={history} />
        </Suspense>
    </>
};

export default CheckMailContainer;