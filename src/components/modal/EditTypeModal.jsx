import { EditOutlined } from '@ant-design/icons'
import { Button, Modal, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useTypeAction } from '../../hooks/useTypeAction';
import { ErrorNotification } from '../notification/ErrorNotification';

const EditTypeModal = ({types, loadingBtn}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState(types.name);
    const { editType } = useTypeAction();
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        try {
            if(name === types.name){
                ErrorNotification('Поля не изменились!',400,'dsa','dsa')
            } 
            else {
                await editType(types.id, name)
                setVisible(false);
            }
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
        <Button icon={<EditOutlined />} className="edit" onClick={showModal}></Button>
        <Modal
            title="Изменение типа"
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
                    Изменить
                </Button>
            ]}
        >
            <Form
                className="form form__modal"
                size={'large'}
                initialValues={{
                    name: types.name
                }}
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

export default EditTypeModal
