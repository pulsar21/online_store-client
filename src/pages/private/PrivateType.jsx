import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import '../../assets/scss/admin/Customer.scss';
import {Button, Input, Space, Table, Form, Pagination, Select} from 'antd';
import Modal from 'antd/lib/modal/Modal';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import { ErrorNotification } from '../../components/notification/ErrorNotification';
import AddTypeModal from '../../components/modal/AddTypeModal';
import EditTypeModal from '../../components/modal/EditTypeModal';
import Search from 'antd/lib/input/Search';

const { Option } = Select;

const PrivateType = (props) => {
    const {
        types, deleteClickHandler, loadingBtn,
        page, limit, totalCount, pageChangeHandler,
        searchClickHandler, searchName, setSearchName,
        sortHandleChange, loading
    } = props;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: true,
            width: 150,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            responsive: ['md'],
            sorter: (a, b) => a.createdAt.toString().localeCompare(b.createdAt)
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            responsive: ['md'],
            sorter: (a, b) => a.updatedAt.toString().localeCompare(b.updatedAt)
        },
        {
            title: 'Action',
            key: 'action',
            render: (types) => <>
                <Space size="middle">
                        <EditTypeModal types={types} loadingBtn={loadingBtn}/>
                        <Button icon={<DeleteOutlined />} className="delete" onClick={(e) => deleteClickHandler(e, types.id, types.name)}></Button>
                </Space>
            </>,
        },
    ];
    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>Типы</h3>
                    <AddTypeModal loadingBtn={loadingBtn}/>
                </div>
                <div className="filter">
                    <div className="sort">
                        Сортировать: <Select defaultValue="По дате создания" style={{marginLeft: '0.5rem'}} onChange={sortHandleChange}>
                            <Option value="asc_name">По алфавитному <ArrowUpOutlined /></Option>
                            <Option value="desc_name">По алфавитному <ArrowDownOutlined /></Option>
                            <Option value="asc_createdAt">По дате <ArrowUpOutlined /></Option>
                            <Option value="desc_createdAt">По дате <ArrowDownOutlined /></Option>
                            <Option value="asc_updatedAt">По обнов дате <ArrowUpOutlined /></Option>
                            <Option value="desc_updatedAt">По обнов дате <ArrowDownOutlined /></Option>
                        </Select>
                    </div>
                    <Search
                        placeholder='Search ...'
                        value={searchName}
                        onChange={e => setSearchName(e.target.value)} 
                        onPressEnter={searchClickHandler}
                        onSearch={searchClickHandler}
                        className="private-search"
                    />
                </div>
                <Table 
                    dataSource={types} 
                    columns={columns} 
                    rowKey={types => types.id} 
                    className="customer__table" 
                    size={'small'} 
                    pagination={false}
                    loading={loading}
                />
                <Pagination 
                    defaultCurrent={1}
                    showQuickJumper 
                    showTotal={total => `Total ${total} items`}
                    current={page}
                    pageSize={limit}
                    total={totalCount}
                    onChange={pageChangeHandler}
                    className="pagination"
                />
            </div>
        </section>
    </>
};

export default React.memo(PrivateType);
