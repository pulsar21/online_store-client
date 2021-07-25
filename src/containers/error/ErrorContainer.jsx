import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppLoader from '../../components/loader/AppLoader';

const Error404 = lazy(() => import('../../pages/errors/Error404'));

const ErrorContainer = () => {
    const history = useHistory();
    let isAuth = useSelector(state => state.user.isAuth);

    return <>
        <Suspense fallback={<AppLoader />}>
            <Error404 history={history} isAuth={isAuth}/>
        </Suspense>
    </>
};

export default ErrorContainer;