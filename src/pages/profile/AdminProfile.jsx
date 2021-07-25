import React from 'react';
import { Button, Image, Input, Form, Space } from 'antd';
import '../../assets/scss/profile/PrivateProfile.scss';
import UserLogo from '../../assets/img/auth/avatar.jpg';

const AdminProfile = (props) => {
    const {
        email, setEmail, fullName, 
        setFullName, visible, user,
        loadingBtn, handleVisibleClick,
        handleEditClick
    } = props;   

    return <>
        <section className="admin-profile">
            <div className="admin-profile__block">
                <h3 className="title">
                    Profile
                </h3>
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
                                <p className="card__desc">{user.email}</p>
                            </div>
                            <div className="card">
                                <h3 className="card__title">Full Name</h3>
                                <p className="card__desc">{user.full_name}</p>
                            </div>
                            <div className="card">
                                <h3 className="card__title">Id</h3>
                                <p className="card__desc">{user.id}</p>
                            </div>
                            <div className="card">
                                <h3 className="card__title">role</h3>
                                <p className="card__desc">{user.role}</p>
                            </div>
                    
                        </div>
                    </div>
                </div>
                <div className="admin-profile__settings">
                    Access Settings
                </div>
                <div className="cards access__cards">
                    <div className="card">
                        <h3 className="card__title">In Date</h3>
                        <p className="card__desc">{user.createdAt}</p>
                    </div>
                    <div className="card">
                        <h3 className="card__title">Out Date</h3>
                        <p className="card__desc">{user.updatedAt}</p>
                    </div>
                    <div className="card">
                        <h3 className="card__title">In Date</h3>
                        <p className="card__desc">{user.createdAt}</p>
                    </div>
                    <div className="card">
                        <h3 className="card__title">Out Date</h3>
                        <p className="card__desc">{user.updatedAt}</p>
                    </div>
                </div>
            </div>
        </section>
    </>;
};

export default AdminProfile;
