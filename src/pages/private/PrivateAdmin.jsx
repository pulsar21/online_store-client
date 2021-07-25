import React from 'react';
import '../../assets/scss/admin/Customer.scss';
import { Pagination, Select, Table } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';

const { Option } = Select;

const PrivateAdmin = (props) => {
    const {
        admins, loading, sortHandleChange,
        searchName, setSearchName, searchClickHandler,
        page, limit, totalCount, pageChangeHandler
    } = props;

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            fixed: true,
            width: 150,
            sorter: (a, b) => a.email.localeCompare(b.email)
        },
        {
            title: 'Full Name',
            dataIndex: 'full_name',
            key: 'full_name',
            sorter: (a, b) => a.full_name.localeCompare(b.full_name)
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
        }
    ];
  
    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>Админы</h3>
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
                    dataSource={admins} 
                    columns={columns} 
                    rowKey={admins => admins.id} 
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

export default PrivateAdmin;
