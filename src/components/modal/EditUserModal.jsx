import { EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import { ErrorNotification } from '../notification/ErrorNotification';

const EditUserModal = ({users, loadingBtn}) => {
    const [fullName, setFullName] = useState(users.full_name);
    const [email, setEmail] = useState(users.email);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { editUsers } = useTypeAction();
    
    const showModal = () => {
        setVisible(!visible);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        try {
            if(email === users.email && fullName === users.full_name){
                ErrorNotification('Поля не изменились!',400,'dsa','dsa')
            } 
            else {
                await editUsers(users.id, email, fullName)
                setVisible(false);
            }
        } catch (error) {
            console.log(error);
            setVisible(false);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };
    return <>
        <Button icon={<EditOutlined />} className="edit" onClick={showModal}></Button>
        <Modal
            title="Title"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            style={{transition: 'none !important', transform: 'none !important'}}
            footer={[
                <Button className="edit-cancel" onClick={handleCancel} key="btn-edit-cancel">
                    Cancel
                </Button>,
                <Button className="edit-save" onClick={handleOk} loading={loadingBtn} key="btn-edit-save">
                    Save
                </Button>
            ]}
        >
            
            <Form size={"large"} className="form form__modal" initialValues={{
                email: users.email,
                full_name: users.full_name
            }}
            >
                <Form.Item
                    name="full_name"
                    label="Имя и Фамилия"
                    rules={[{required: true, message: 'Введите имя и фимилия!'}]}
                    className="form__item"
                    hasFeedback
                >
                    <Input 
                        type="text" 
                        placeholder="Введите имя и фимилия ... " 
                        value={fullName} 
                        onChange={e => setFullName(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Почта"
                    rules={[{ type: 'email', required: true, message: 'Введите почту!'}]}
                    className="form__item"
                    hasFeedback
                >
                    <Input 
                        type="email" 
                        placeholder="Введите потчу ... " 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default EditUserModal
