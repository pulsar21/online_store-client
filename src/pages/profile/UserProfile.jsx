import React from 'react'
import '../../assets/scss/avatar/Avatar.scss';
import { Button, Image, Input, Space } from 'antd';
import {Form} from 'antd';
import '../../assets/scss/profile/PrivateProfile.scss';
import UserLogo from '../../assets/img/auth/avatar.jpg';

const UserProfile = (props) => {
    const {
        email, setEmail, fullName, 
        setFullName, user, handleEditClick,
        visible, handleVisibleClick, loadingBtn
    } = props;   
    
    return <>
        <section className="admin-profile">
            <div className="container">
                <div className="admin-profile__block">
                    <div className="admin-profile__info">
                        <div className="admin-profile__thumb">
                            <Image src={UserLogo} className="admin-profile__img"/>
                            {
                                visible ? 
                                <Form size={"small"} className="form" initialValues={{
                                    email: user.email,
                                    full_name: user.full_name
                                }}>
                                    <Form.Item name="email" className="form__item">
                                        <Input type={"email"} value={email} onChange={e => setEmail(e.target.value)} size={"middle"} style={{marginTop: '0.5rem'}}/>
                                    </Form.Item>
                                    <Form.Item name="full_name" className="form__item">
                                        <Input type={"text"} value={fullName} onChange={e => setFullName(e.target.value)} size={"middle"}/>
                                    </Form.Item>
                                    <Form.Item className="form__item">
                                        <Space>
                                            <Button onClick={handleVisibleClick} className="cancel">Cancel</Button>
                                            <Button onClick={handleEditClick} loading={loadingBtn} className="save">Save</Button>
                                        </Space>
                                    </Form.Item>
                                </Form> :
                                <Button onClick={handleVisibleClick} className="admin-profile__btn">Edit Profile</Button>
                            }   
                        </div>
                        <div className="admin-profile__content">
                            <div className="cards">
                            
                                <div className="card">
                                    <h3 className="card__title">Email</h3>
                                    <p className="card__desc">{user && user.email}</p>
                                </div>
                                <div className="card">
                                    <h3 className="card__title">Full Name</h3>
                                    <p className="card__desc">{user && user.full_name}</p>
                                </div>
                                <div className="card">
                                    <h3 className="card__title">createdAt</h3>
                                    <p className="card__desc">{user && user.createdAt}</p>
                                </div>
                                <div className="card">
                                    <h3 className="card__title">updatedAt</h3>
                                    <p className="card__desc">{user && user.updatedAt}</p>
                                </div>
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>;
};

export default UserProfile;
