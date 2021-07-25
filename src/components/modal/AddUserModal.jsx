import { UserAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';

const AddUserModal = (props) => {
    const { loadingBtn } = props;
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { addUser } = useTypeAction()
    const showModal = () => {
        setVisible(!visible);
      };
  
    const handleOk = async (e) => {
        try {  
            e.preventDefault();
            await addUser(email, fullName, password, confirmPassword);
            setVisible(false);  
        } catch (error) {
            console.log(error);
            setVisible(false);
        }
    };
  
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
  
    return <>
            <Button icon={<UserAddOutlined />} className="btn-blue" onClick={showModal}>Add User</Button>
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
                  
                <Form
                    className="form form__modal"
                    initialValues={{ remember: true }}
                    size={'large'}
                >
                <Form.Item
                    name="full_name"
                    label="Имя и Фамилия"
                    rules={[{required: true, message: 'Введите имя пользователя!'}]}
                    className="form__item"
                    hasFeedback
                >
                    <Input 
                        type="text" 
                        placeholder="Введите имя пользователя ... " 
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
                        placeholder="Введите почту ..." 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Пароль"
                    rules={[{required: true, message: 'Введите пароль!'}]}
                    className="form__item"
                    hasFeedback
                >
                    <Input 
                        type="password" 
                        placeholder="Введите парооль ..." 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    label="Павторный пароль"
                    rules={[{required: true, message: 'Введите павторный пароль!'}]}
                    className="form__item"
                    hasFeedback
                >
                    <Input 
                        type="password" 
                        placeholder="Введите павторный пароль ..."  
                        value={confirmPassword} 
                        onChange={e => setConfirmPassword(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default AddUserModal
