import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, EyeOutlined, UpOutlined } from '@ant-design/icons';
import React from 'react';
import '../../assets/scss/admin/Customer.scss';
import {Button, Pagination, Select, Space, Table} from 'antd';
import { useHistory } from 'react-router';
import { PRIVATE_PROFILE_ROUTE } from '../../utils/consts';
import EditUserModal from '../../components/modal/EditUserModal';
import AddUserModal from '../../components/modal/AddUserModal';
import Search from 'antd/lib/input/Search';

const { Option } = Select;

const PrivateUser = (props) => {
    const {
        users, user, deleteClickHandler, 
        loadingBtn, pageChangeHandler, page, 
        limit, totalCount, searchName, setSearchName, 
        sortHandleChange, loading, searchClickHandler
    } = props;
    const history = useHistory();
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
           sorter: (a, b) => a.full_name.localeCompare(b.full_name),
           responsive: ['sm'],
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            responsive: ['md'],
        },
        {
            title: 'UpdatedAt',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            responsive: ['md'],
        },
        {
            title: 'Action',
            key: 'action',
            render: (users) => <>
                <Space size="middle">
                    {
                        user.id !== users.id ? <>
                            <EditUserModal users={users} loadingBtn={loadingBtn} />
                            <Button icon={<DeleteOutlined />} className="delete" onClick={(e) => deleteClickHandler(e,users.id, users.email)}></Button>
                        </> : <Button icon={<EyeOutlined />} className="view" onClick={() => history.push(`${PRIVATE_PROFILE_ROUTE}/${user.id}`)}></Button>
                    }
                </Space>
            </>,
        },
    ];
    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>User</h3>
                    <AddUserModal loadingBtn={loadingBtn} />
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
                    dataSource={users} 
                    columns={columns} 
                    rowKey={users => users.id} 
                    className="customer__table" 
                    size={'small'} 
                    pagination={false} 
                    loading={loading}
                    scroll={{x: 100}}
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

export default PrivateUser;
