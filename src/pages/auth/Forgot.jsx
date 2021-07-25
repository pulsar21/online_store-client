import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SIGNIN_ROUTE } from '../../utils/consts';
import '../../assets/scss/auth/Forget.scss';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const Forgot = React.memo((props) => {
    const { 
        email, setEmail, send, loadingBtn, 
        history, handleSubmit
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
                <div className="forget">
                    <div className="forget__form">
                        <Form
                            className="form"
                            initialValues={{ remember: true }}
                            size={'large'}
                        >
                            <h2 className="auth__title">Forget Password</h2>
                            <Form.Item
                                name="email"
                                rules={[{ type: 'email', required: true, message: 'Please input your E-mail!'}]}
                                className="from__item"
                                hasFeedback
                            >
                                <Input 
                                    type="text" 
                                    placeholder="Email" 
                                    className="input forget__input"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    allowClear
                                />
                            </Form.Item>
                            <Button className="btn btn-blue" loading={loadingBtn} onClick={handleSubmit}>
                                <LoginOutlined />
                                <span>Submit</span>
                            </Button>
                            <NavLink to={SIGNIN_ROUTE} className="forget__link">Or Sign In?</NavLink>
                        </Form>
                    </div>
                    <div className="forget__thumb">
                    </div>
                </div>
            </div>
        </section>
    </>
});

export default Forgot;
