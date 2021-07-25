import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Button, Divider, Empty, Pagination, Select } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { Fragment } from 'react';
import '../../assets/scss/admin/PrivateNotification.scss';

const { Option } = Select;

const PrivateNotification = (props) => {
    const { 
        notifications, user, page,
        limit, totalCount, pageChangeHandler,
        sortHandleChange, searchName, setSearchName,
        searchClickHandler, deleteClickHandler
    } = props;
    console.log(user);
    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>Notifiction</h3>
                </div>
                <div className="filter">
                    <div className="sort">
                        Сортировать: <Select defaultValue="По дате создания" style={{marginLeft: '0.5rem'}} onChange={sortHandleChange}>
                            <Option value="asc_title">По алфавитному <ArrowUpOutlined /></Option>
                            <Option value="desc_title">По алфавитному <ArrowDownOutlined /></Option>
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
                <div className="cards notification__cards">
                    {notifications?.length > 0 ? notifications?.map(notification => <Fragment key={notification.id} >
                        <div className="card notification__card">
                            <div>
                                <div className="avatar">
                                    <Avatar>
                                        {notifications ? notification?.full_name.split(' ').map(name => name[0].toUpperCase()).join('') : 'US'}
                                    </Avatar>
                                    <span className="avatar__full-name">{notification.full_name}</span>
                                </div>        
                                <div className="content">
                                    <p>{notification?.title}</p>
                                </div>  
                            </div>
                            <div>
                                <Button icon={<DeleteOutlined />} className="delete" onClick={(e) => deleteClickHandler(e, notification.id, notification.title)}></Button>
                            </div>
                        </div><Divider className="divider"/></Fragment>
                    ) : <Empty />}
                </div>
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

export default PrivateNotification

