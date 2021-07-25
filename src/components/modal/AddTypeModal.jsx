import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';

const AddTypeModal = ({loadingBtn}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState('');
    const { addType } = useTypeAction();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        try {
            addType(name);
            setVisible(false);
        } catch (error) {
            console.log(error);
            setVisible(false);
        }
    };

    const handleCancel = () => setVisible(false);

    return <>
        <Button icon={<UserAddOutlined />} className="btn-blue" onClick={showModal}>Добавить тип</Button>
        <Modal
            title="Добавить типа"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            style={{transition: 'none !important', transform: 'none !important'}}
            footer={[
                <Button className="cancel" onClick={handleCancel} key="btn-edit-cancel">
                    Отмена
                </Button>,
                <Button className="save" onClick={handleOk} loading={loadingBtn} key="btn-edit-save">
                    Добавить
                </Button>
            ]}
        >
            <Form
                className="form form__modal"
                initialValues={{ remember: true }}
                size={'large'}
            >
                <Form.Item
                    name="name"
                    label="Имя типа"
                    rules={[{required: true, message: 'Введите имя типа!'}]}
                    className="form_modal-item"
                    hasFeedback
                >
                    <Input 
                        type="text" 
                        placeholder="Введите имя типа ..." 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default AddTypeModal
