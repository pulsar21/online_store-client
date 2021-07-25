import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Pagination, Select, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react'

const { Option } = Select;

const PrivateFollowNotification = (props) => {
    const { 
        follow_notification, page,
        limit, totalCount, pageChangeHandler,
        searchName, setSearchName, sortHandleChange,
        searchClickHandler, loading
    } = props;

    const followNotificationData = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email)
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
            sorter: (a, b) => a.createdAt.toString().localeCompare(b.createdAt)
        }
    ]

    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>Follow Notification</h3>
                </div>
                <div className="filter">
                    <div className="sort">
                        Сортировать: <Select defaultValue="По дате создания" style={{marginLeft: '0.5rem'}} onChange={sortHandleChange}>
                            <Option value="asc_email">По алфавитному <ArrowUpOutlined /></Option>
                            <Option value="desc_email">По алфавитному <ArrowDownOutlined /></Option>
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
                    dataSource={follow_notification} 
                    columns={followNotificationData} 
                    rowKey={follow_notification => follow_notification.id} 
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
}

export default PrivateFollowNotification
