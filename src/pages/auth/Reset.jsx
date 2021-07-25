import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SIGNIN_ROUTE } from '../../utils/consts';
import '../../assets/scss/auth/Reset.scss';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const Reset = React.memo((props) => {
    const {
        password, setPassword, confirmPassword, setConfirmPassword,
        loadingBtn, send, history, handleSubmit
    } = props;

    useEffect(() => {
        try {
            if(send) {
                history.push(SIGNIN_ROUTE);
            }
        } catch (error) {
            console.log(error);
        };
    }, [send]);

    return <>
        <section className="auth">
            <div className="auth-container">
                <div className="reset">
                    <div className="reset__form">
                        <Form
                             className="form"
                             initialValues={{ remember: true }}
                             size={'large'}
                        >
                            <h2 className="auth__title">Reset yout Password</h2>
                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Please input your password!'}]}
                                className="from__item"
                                hasFeedback
                            >
                                <Input.Password  
                                    placeholder="Enter your password ... " 
                                    className="input reset__input"
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
                                    placeholder="Enter your password confirm" 
                                    className="input reset__input"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </Form.Item>
                            <Button className="btn btn-blue" loading={loadingBtn} onClick={handleSubmit}>
                                <LoginOutlined />
                                <span>Submit</span>
                            </Button>
                            <NavLink to={SIGNIN_ROUTE} className="reset__link">Or Sign In?</NavLink>
                        </Form>
                    </div>
                    <div className="reset__thumb">
                    </div>
                </div>
            </div>
        </section>
    </>
});

export default Reset;
