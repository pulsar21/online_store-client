import React, { useState, Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { useTypeAction } from '../../hooks/useTypeAction';
import { SIGNIN_ROUTE } from '../../utils/consts';
import '../../assets/scss/auth/Auth.scss';
import AppLoader from '../../components/loader/AppLoader';

const SignIn = lazy(() => import('../../pages/auth/SignIn'));
const SignUp = lazy(() => import('../../pages/auth/SignUp'));

const AuthContainer = (props) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { isAuth, next, loadingBtn, user } = useSelector(state => state.user);
    const { signUp, signIn } = useTypeAction();

    const history = useHistory();
    const location = useLocation();

    const isLogin = location.pathname === SIGNIN_ROUTE;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isLogin) {
            signIn(email, password);   
        } else {
            signUp(fullName, email, password, confirmPassword);
        }
    }

    return <>
        <section className='auth'>
            <div className='auth-container'>
            {
                isLogin ? 
                <Suspense fallback={<AppLoader />}>
                    <SignIn 
                        email={email} password={password} setEmail={setEmail} 
                        setPassword={setPassword} isAuth={isAuth} signIn={signIn} 
                        history={history} loadingBtn={loadingBtn} handleSubmit={handleSubmit}
                        user={user}
                    />
                </Suspense> :
                <Suspense fallback={<AppLoader />}>
                    <SignUp 
                        email={email} password={password} setEmail={setEmail} 
                        setPassword={setPassword} next={next} signUp={signUp} 
                        history={history} loadingBtn={loadingBtn}
                        handleSubmit={handleSubmit} fullName={fullName} setFullName={setFullName}
                        confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                    />
                </Suspense>
            }
            </div>
        </section>
    </>
};

export default AuthContainer;
