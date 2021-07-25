import React from 'react';
import { privateRoutes, publicRoutes, authRoutes } from '../../routes/routes';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ERROR_404_ROUTE } from '../../utils/consts';
import AuthLayout from '../../layouts/AuthLayout';
import PrivateLayout from '../../layouts/PrivateLayout';
import PublicLayout from '../../layouts/PublicLayout';


const AppRouter = () => {
    const { user } = useSelector(state => state.user);
    return <>
        <Switch>
            {user?.role === 'ADMIN' && privateRoutes.map(({path, Component}) => <Route key={path} path={path} exact>
                <PrivateLayout>
                    <Component />
                </PrivateLayout>
            </Route>)}
            {authRoutes.map(({path, Component}) => <Route key={path} path={path} exact>
                <AuthLayout>
                    <Component />
                </AuthLayout>
            </Route>)}
            {publicRoutes.map(({path, Component}) => <Route key={path} path={path} exact>
                <PublicLayout>
                    <Component />
                </PublicLayout>
            </Route>)}
            <Redirect to={ERROR_404_ROUTE}/>
        </Switch>
    </>
};


export default AppRouter;
