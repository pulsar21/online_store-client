import { EditOutlined, InboxOutlined } from '@ant-design/icons'
import { Button, Modal, Form, Input, Rate, InputNumber, message } from 'antd'
import React, { useState } from 'react'
import { useTypeAction } from '../../hooks/useTypeAction';
import { ErrorNotification } from '../notification/ErrorNotification';
import DeviceImg from '../../assets/img/auth/avatar.jpg';
import Dragger from 'antd/lib/upload/Dragger';
import TextArea from 'antd/lib/input/TextArea';

const EditDeviceModal = ({devices, loadingBtn}) => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState(devices.name);
    const [description, setDescription] = useState(devices.description);
    const [price, setPrice] = useState(devices.price);
    const [count, setCount] = useState(devices.count);
    const [rating, setRating] = useState(devices.rating);
    const [img, setImg] = useState(devices.img);
    const { editDevice } = useTypeAction();
    const showModal = () => {
        setVisible(true);
    };

    const handleOk = async (e) => {
        e.preventDefault();
        try {
            if(name === devices.name && price === devices.price && count === devices.count && rating === devices.rating && description === devices.description){
                ErrorNotification('Поля не изменились!',400,'dsa','dsa')
            } 
            else {
                await editDevice(devices.id, name, price, count, rating, description)
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
            title="Изменение устройство"
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
                    name: devices.name,
                    price: devices.price,
                    count: devices.count,
                    rating: devices.rating,
                    description: devices.description
                }}
            >
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{required: true, message: 'Введите имя устройства!'}]}
                    className="form__item form__item-name"
                    hasFeedback
                >
                    <Input 
                        type="text" 
                        placeholder="Введите имя устройства ..." 
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
                <div className="form__group">
                    <Form.Item
                        name="price"
                        label="Цена"
                        rules={[{required: true, message: 'Введите стоимость устройство!'}]}
                        className="form__item form__item-price"
                    >
                        <InputNumber 
                            formatter={price => `$${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            max={Number.MAX_SAFE_INTEGER}
                            value={price} 
                            onChange={(value) => setPrice(value)} 
                        />
                    </Form.Item>
                    <Form.Item
                        name="count"
                        rules={[{required: true, message: 'Введите количество устройство!'}]}
                        className="form__item form__item-price"
                        label="Количетсво"
                    >
                        <InputNumber 
                            formatter={count => count}
                            onChange={(value) => setCount(Number(value))}
                            max={Number.MAX_SAFE_INTEGER}
                        />
                    </Form.Item>
                </div>
                <Form.Item
                    label="Рейтинг"
                    name="rating"
                    className="form__item-rating"
                >
                    <Rate allowHalf allowClear value={rating} onChange={setRating}>
                        <InputNumber min={1} max={5} onClick={(e) => setRating(e.target.value)}/>
                    </Rate>
                </Form.Item>
                <Form.Item
                    name="description"
                    className="form__item"
                >
                    <TextArea
                        placeholder="Введите описание устройство ..."  
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default EditDeviceModal
