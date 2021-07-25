import { DeleteOutlined, DownOutlined, InboxOutlined, PlusOutlined, UploadOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Col, Dropdown, Form, Image, Input, InputNumber, Menu, message, Modal, Rate, Row, Select, Upload } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React, { useState } from 'react'
import { useTypeAction } from '../../hooks/useTypeAction';

const { Option } = Select;
const { Dragger } = Upload;

const AddDeviceModal = ({loadingBtn, types, brands}) => {
    const [drag, setDrag] = useState(false);
    const [imgPrev, setImgPrev] = useState(null);
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [count, setCount] = useState(0);
    const [rating, setRating] = useState(0);
    const [img, setImg] = useState(null);
    const [selectedTypeName, setSelectedTypeName] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedBrandName, setSelectedBrandName] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [info, setInfo] = useState([]);

    const { addDevice } = useTypeAction();
    const showModal = () => {
        setVisible(true);
    };
  
    const handleOk = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('count', `${count}`);
        formData.append('img', img);
        formData.append('rating', `${rating}`);
        formData.append('description', description);
        formData.append('typeId', selectedType);
        formData.append('brandId', selectedBrand);
        formData.append('info', JSON.stringify(info));
        console.log(name, price, count, img, rating, description, selectedType, selectedBrand, info)
        await addDevice(formData);
        setVisible(false);
    };

    // const uploadProps = {
    //     name: 'file',
    //     multiple: false,
    //     action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     listType: 'picture',
    //     maxCount: 1,
    //     onChange(info) {
    //       if (info.file.status === 'done') {
    //         setImg(info.file.originFileObj);
    //         message.success(`${info.file.name} file uploaded successfully`);
    //       } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} file upload failed.`);
    //         console.log(info)
    //       }
    //     },
    //     progress: {
    //         strokeColor: {
    //           '0%': '#6c63ff',
    //           '100%': '#3f3d56',
    //         },
    //         strokeWidth: 3,
    //         format: percent => `${parseFloat(percent.toFixed(2))}%`,
    //     },
    // };

    // const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type ==='image/jpeg'|| file.type ==='image/png' || file.type === 'image/svg+xml';
    //     if(!isJpgOrPng){
    //         message.error('You can only upload JPG/PNG/SVG file!');
    //     }
    //     // const isLt2M = file.size /1024/1024<2;
    //     // console.log(isLt2M);
    //     // if(!isLt2M){
    //     //     message.error('Image must smaller than 2MB!');
    //     // }
    //     return isJpgOrPng;
    // };

    const handleCancel = () => {
        setVisible(false);
    };

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }
  
    const deleteInfo = (number) => {
        setInfo(info.filter(item => item.number !== number))
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(item => item.number === number ? {...item, [key]: value}: item));
    };


    const dragStartHandler = (e) => {
        e.preventDefault();
        setDrag(true);
    };

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setDrag(false);
    };

    const onDropHandler = (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        // let reader = new FileReader();
        // reader.readAsDataURL(file[0]);
        // setImgPrev(reader);
        setImg(file);
        setDrag(false);
    }

    const typeMenu = (
        <Menu>
            {
                types?.map(type => 
                <Menu.Item 
                    key={type.id} 
                    onClick={() => {
                        setSelectedType(type.id);
                        setSelectedTypeName(type.name);
                    }}
                >
                    {type.name}
                </Menu.Item>)
            }
        </Menu>
    )

    const brandMenu = (
        <Menu>
            {
                brands?.map(brand => 
                <Menu.Item 
                    key={brand.id} 
                    onClick={() => {
                        setSelectedBrand(brand.id);
                        setSelectedBrandName(brand.name);
                    }}
                >
                    {brand.name}
                </Menu.Item>)
            }
        </Menu>
    )
    return <>
        <Button icon={<UserAddOutlined />} className="btn-blue" onClick={showModal}>Add Device</Button>
        <Modal
            title="Добавить устройство"
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
                initialValues={{ 
                    price: price,
                    count: count,
                    remember: true 
                }}
                size={'large'}
                encType="multipart/form-data"
            >
                <Form.Item
                    name="name"
                    label="Имя"
                    rules={[{required: true, message: 'Введите имя устройство!'}]}
                    className="form__item form__item-name"
                    hasFeedback
                >
                    <Input 
                        type={"text"} 
                        placeholder="Введите имя устройство ..."  
                        value={name} 
                        onChange={e => setName(e.target.value)} 
                        allowClear
                    />
                </Form.Item>
                <div className="form__group">
                    <Form.Item
                        name="price"
                        rules={[{required: true, message: 'Введите стоимость устройство!'}]}
                        className="form__item form__item-price"
                        label="Цена"
                    >
                        <InputNumber
                            formatter={price => `$${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            onChange={(value) => setPrice(Number(value))}
                            max={Number.MAX_SAFE_INTEGER}
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
                    name="rating"
                    className="form__item form__item-rating"
                    label="Рейтинг"
                >
                    <Rate allowHalf allowClear value={rating} onChange={setRating}>
                        <InputNumber min={1} max={5} onClick={(e) => setRating(Number(e.target.value))}/>
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
                <div className="form__group add-device-modal-dropdown">
                    <Form.Item>
                        <Dropdown overlay={typeMenu}>
                            <Button icon={<DownOutlined />} style={{width: '100%'}}>
                                {selectedTypeName || 'Выберите тип'}
                            </Button>
                        </Dropdown>
                    </Form.Item>
                    <Form.Item>
                        <Dropdown overlay={brandMenu}>
                            <Button icon={<DownOutlined />} style={{width: '100%'}}>
                                {selectedBrandName || 'Выберите бренд'}
                            </Button>
                        </Dropdown>
                    </Form.Item>
                </div>
                <Form.Item
                    className="form__item"
                    style={{marginTop: '0.5rem'}}
                >
                    <div 
                        className="dragger" 
                        // onDragStart={e => dragStartHandler(e)}
                        // onDragLeave={e => dragLeaveHandler(e)}
                        // onDragOver={e => dragStartHandler(e)}
                        // onDrop={e => onDropHandler(e)}
                    >
                        <Input 
                            type="file"
                            name="photos"
                            placeholder="Enter photos"
                            id="filephotos"
                            className="dragger__drop-area"
                            multiple={true}
                            onChange={e => onDropHandler(e)}
                        />
                        {/* <label htmlFor="filephotos">
                            <InboxOutlined />
                            {drag ? <p>Отпустите файл чтобы загрузить</p> : <p>Ператащите файл чтобы загрузить</p>}
                        </label> */}
                        
                        {/* <Dragger {...uploadProps} beforeUpload={beforeUpload}>
                            <p className="dragger__img">
                            <InboxOutlined />
                            </p>
                            <p className="dragger__text">Click or drag file to this area to upload</p>
                        </Dragger> */}
                    </div>
                    {/* {imgPrev && loadingImg ? <div className="preview__img">
                        <Image src={imgPrev.result} preview={false} />
                    </div> : null} */}
                </Form.Item>
                <Form.Item
                    className="form__item"
                >
                    <Button onClick={addInfo} className="add-device-modal-add-charactes" icon={<PlusOutlined />}>Добавить новое свойство</Button>
                    {
                        info.map(item => <div key={item.number}>
                            <Form.Item
                                style={{marginTop: '0.5rem'}}
                            >
                                <Input
                                    style={{marginTop: '0.5rem'}}
                                    value={item.title}
                                    onChange={(e) => changeInfo('title', e.target.value, item.number)}
                                    placeholder="Введите название свойство"
                                    
                                />
                            </Form.Item>
                            <Form.Item
                                className="form__item"
                                style={{marginTop: '0.5rem'}}   
                            >
                                <Input.TextArea
                                    value={item.description}
                                    onChange={(e) => changeInfo('description', e.target.value, item.number)}
                                    placeholder="Введите описание свойство"
                                    style={{marginTop: '0.5rem'}}
                                />
                            </Form.Item>
                            <Button onClick={() => deleteInfo(item.number)} icon={<DeleteOutlined />} style={{float: 'right', marginTop: '0.5rem  '}}>Удалить</Button>
                        </div>)
                    }
                </Form.Item>
            </Form>
        </Modal>
    </>
}

export default AddDeviceModal;
