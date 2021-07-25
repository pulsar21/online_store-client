import React, { useEffect } from 'react';
import { CHECK_MAIL_ROUTE, SIGNIN_ROUTE } from '../../utils/consts';
import '../../assets/scss/auth/SignUp.scss';
import { Input, Form, Button } from 'antd';
import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';

const SignUp = React.memo((props) => {
    const {
        email, password, setEmail, 
        setPassword, next, history, 
        loadingBtn, handleSubmit,
        fullName, setFullName, confirmPassword,
        setConfirmPassword
    } = props;

    useEffect(() => {
        if(next) {
            history.push(CHECK_MAIL_ROUTE);
        };
    }, [next, loadingBtn])

    return <>
       <div className="signup">
            <div className="signup__form">
                <Form
                    className="form"
                    initialValues={{ remember: true }}
                    size={'large'}
                >
                    <h2 className="auth__title">Sign Up for Shop</h2>
                    <Form.Item
                        name="full_name"
                        rules={[{required: true, message: 'Please input your full name!'}]}
                        className="from__item"
                        hasFeedback
                    >
                        <Input 
                            type="text" 
                            placeholder="Enter yout full name ..." 
                            className="input signup__input" 
                            value={fullName} 
                            onChange={e => setFullName(e.target.value)} 
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your E-mail!'}]}
                        className="from__item"
                        hasFeedback
                    >
                        <Input 
                            type="email" 
                            placeholder="Enter yout E-mail ..." 
                            className="input signup__input" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            allowClear
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your password'}]}
                        className="from__item"
                        hasFeedback
                    >
                         <Input.Password
                            placeholder="Enter yout password ..." 
                            className="input signup__input" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm_password"
                        rules={[{required: true, message: 'Please input your password confirm'}]}
                        className="from__item"
                        hasFeedback
                    >
                        <Input.Password
                            placeholder="Enter yout confirm password ..." 
                            className="input signup__input" 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)} 
                        />
                    </Form.Item>
                    <Button className="btn btn-blue" loading={loadingBtn} onClick={handleSubmit}>
                        <UserAddOutlined />
                        <span>Sign Up</span>
                    </Button>
                    <div className="divider">
                        <span>Or sign in with e-mail</span>
                    </div>
                    <button className="btn btn-light" onClick={() => history.push(SIGNIN_ROUTE)}>
                        <LoginOutlined  className="signin-icon"/>
                        <span>Sign In</span>
                    </button>
                </Form>
            </div>
            <div className="signup__thumb">
            </div>
        </div>
    </>
});

export default SignUp;
