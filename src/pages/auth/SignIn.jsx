import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FORGOT_PASSWORD_ROUTE, HOME_ROUTE, MONITOR_ROUTE, SIGNUP_ROUTE } from '../../utils/consts';
import '../../assets/scss/auth/SignIn.scss';

import GoogleLoginBtn from '../../components/btn/GoogleLoginBtn';

import { Button, Input, Form } from 'antd';
import { LoginOutlined, ShoppingFilled, UserAddOutlined } from '@ant-design/icons';

const SignIn = React.memo((props) => {
    const {
    email, password, setEmail, setPassword, 
    history, isAuth, loadingBtn, handleSubmit,
    user
    } = props;

    useEffect(() => {
        try {
            if(isAuth) {
                if (user.role === 'ADMIN') {
                    history.push(MONITOR_ROUTE);
                } else {
                    history.push(HOME_ROUTE);
                }
            };
        } catch(error) {
            console.log(error.message);
        }
    },[isAuth, loadingBtn]);

    return <>
        <div className="signin">
            <div className="signin__form">
                <Form
                     className="form"
                     initialValues={{ remember: true }}
                     size={'large'}
                >
                    <h2 className="auth__title">Sign In for Shop</h2>
                    <GoogleLoginBtn />
                    <Button className="btn" onClick={() => history.push(HOME_ROUTE)}>
                        <ShoppingFilled />
                        <span>Go to Store</span>
                    </Button>
                    <Button className="btn" onClick={() => history.push(SIGNUP_ROUTE)}>
                        <UserAddOutlined />
                        <span>Sign Up</span>
                    </Button>
                    <div className="divider">
                        <span>Or sign in with e-mail</span>
                    </div>
                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your E-mail!'}]}
                        className="from__item"
                        hasFeedback
                    >
                        <Input 
                            type="email" 
                            placeholder="Enter yout email ..." 
                            className="input signin__input" 
                            allowClear
                            value={email} 
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your E-mail!'}]}
                        className="from__item"
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Enter your password ... " 
                            className="input signin__input" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Button className="btn btn-blue" loading={loadingBtn} onClick={handleSubmit}>
                        <LoginOutlined />
                        <span>Sign In</span>
                    </Button>
                    <NavLink to={FORGOT_PASSWORD_ROUTE} className="signin__link">Forget password?</NavLink>
                </Form>
            </div>
            <div className="signin__thumb">
            </div>
        </div>
    </>
});

export default SignIn;
