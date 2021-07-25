import { UserAddOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { useTypeAction } from '../../hooks/useTypeAction';

const AddBrandModal = ({loadingBtn}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState('');
    const { addBrand } = useTypeAction();

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        try {
            addBrand(name);
            setVisible(false);
        } catch (error) {
            console.log(error);
            setVisible(false);
        }
    };

    const handleCancel = () => setVisible(false);

    return <>
        <Button icon={<UserAddOutlined />} className="btn-blue" onClick={showModal}>Добавить бренд</Button>
        <Modal
            title="Добавить бренд"
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
                    label="Имя бренда"
                    rules={[{required: true, message: 'Введите имя бренда!'}]}
                    className="form_modal-item"
                    hasFeedback
                >
                    <Input 
                        type="text" 
                        placeholder="Введите имя бренда ..." 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default AddBrandModal
