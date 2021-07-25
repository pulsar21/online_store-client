import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import '../../assets/scss/admin/Customer.scss';
import {Button, Space, Table} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import {motion} from 'framer-motion';

const Categorie = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
  
    const showModal = () => {
      setVisible(true);
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };
    const users = [
        {
            id: '1',
            email: 'www@ww.w',
            username: 'iiiegyeg',
            created_at: Date.now(),
            updated_at: Date.now()
        }
    ]
    const columns = [
        {
           title: 'Email',
           dataIndex: 'email',
           key: 'email',
           fixed: true,
           width: 150
        },
        {
           title: 'Username',
           dataIndex: 'username',
           key: 'username',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            responsive: ['md'],
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at',
            key: 'updated_at',
            responsive: ['md'],
        },
        {
            title: 'Action',
            key: 'action',
            render: () => <>
                <Space size="middle">
                        <Button icon={<EditOutlined />} className="edit"></Button>
                        <Button icon={<DeleteOutlined />} className="delete"></Button>
                </Space>
            </>,
        },
    ];
    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>Categories</h3>
                    <Button icon={<UserAddOutlined />} className="btn-blue" onClick={showModal}>Add User</Button>
                </div>
                <Table dataSource={users} columns={columns} rowKey={users => users.id} className="customer__table" size={'small'}/>
                <Modal
                    title="Title"
                    visible={visible}
                    onOk={handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    style={{transition: 'none !important', transform: 'none !important'}}
                >
                    <p>{modalText}</p>
                </Modal>
            </div>
        </section>
    </>
};

export default Categorie;
