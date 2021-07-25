import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { SIGNIN_ROUTE, VERIFY_ROUTE } from '../../utils/consts';
import '../../assets/scss/auth/Verify.scss';
import { Button, Form, Input } from 'antd';
import { LoginOutlined } from '@ant-design/icons';

const Verify = React.memo((props) => {
    const {
        code, setCode, loadingBtn, verify,
        history, handleSubmit
    } = props;

    useEffect(() => {
        try {
            if(verify) {
                history.push(SIGNIN_ROUTE);
            }
        } catch (error) {
            console.log(error);
        };
    }, [verify]);

    return <>
        <section className="auth">
            <div className="auth-container">
                <div className="verify">
                    <div className="verify__form">
                        <Form
                             className="form"
                             initialValues={{ remember: true }}
                             size={'large'}
                        >
                            <h2 className="auth__title">Verify your account</h2>
                            <Form.Item
                                name="code"
                                className="from__item"
                                hasFeedback
                            >
                                <Input
                                    placeholder="Enter your code ... " 
                                    className="input verify__input"
                                    value={code}
                                    onChange={e => setCode(+e.target.value)}
                                    maxLength={4}
                                />
                            </Form.Item>
                            <Button className="btn btn-blue" loading={loadingBtn} onClick={handleSubmit}>
                                <LoginOutlined />
                                <span>Submit</span>
                            </Button>
                            <NavLink to={SIGNIN_ROUTE} className="verify__link">Or Sign In?</NavLink>
                        </Form>
                    </div>
                    <div className="verify__thumb">

                    </div>
                </div>
            </div>
        </section>
    </>
});

export default Verify;
