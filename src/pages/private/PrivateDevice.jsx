import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined, DownOutlined, EditOutlined, EyeOutlined, UpOutlined, UserAddOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import '../../assets/scss/admin/Customer.scss';
import {Button, Space, Table, Pagination, Radio, Select, Tag} from 'antd';
import { useTypeAction } from '../../hooks/useTypeAction';
import EditDeviceModal from '../../components/modal/EditDeviceModal';
import DeviceImg from '../../assets/img/auth/avatar.jpg';
import AddDeviceModal from '../../components/modal/AddDeviceModal';
import { useHistory } from 'react-router';
import { PRIVATE_DEVICE_PAGE_ROUTE } from '../../utils/consts';
import Search from 'antd/lib/input/Search';

const { Option } = Select;

const PrivateDevice = (props) => {
    const {
        devices, types, brands, loadingBtn, 
        deleteClickHandler, pageChangeHandler, 
        limit, totalCount, page, setSelectedBrand, 
        setSelectedType, selectedType,
        selectedBrand, searchClickHandler, sortHandleChange, 
        searchName, setSearchName, filterBrandShow,
        setFilterBrandShow, filterTypeShow, setFilterTypeShow,
        loading
    } = props;
    const history = useHistory();
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            fixed: true,
            width: 100,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: 'Img',
            key: 'img',
            render: (devices) => <>
                <Space size="small">
                    {devices.img ? <img src={`${process.env.REACT_APP_API_URL}${devices.img}`} style={{width: '50px', height:'50px'}}/> : <img src={DeviceImg}/>}
                </Space>
            </>,
            responsive: ['md'],
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price.toString().localeCompare(b.price)
        },
        {
            title: 'Count',
            dataIndex: 'count',
            key: 'count',
            responsive: ['md'],
            sorter: (a, b) => a.count.toString().localeCompare(b.count)
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            responsive: ['md'],
            sorter: (a, b) => a.rating.toString().localeCompare(b.rating)
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
            render: (devices) => <>
                <Space size="middle">
                        <EditDeviceModal devices={devices} loadingBtn={loadingBtn}/>
                        <Button icon={<DeleteOutlined />} className="delete" onClick={(e) => deleteClickHandler(e, devices.id, devices.name)}></Button>
                        <Button icon={<EyeOutlined />} className="view" onClick={() => history.push(`${PRIVATE_DEVICE_PAGE_ROUTE}/${devices.id}`)}></Button>
                </Space>
            </>,
        },
    ];
    return <>
        <section className="customer">
            <div className="customer__block">
                <div className="customer__header">
                    <h3>Device</h3>
                    <AddDeviceModal loadingBtn={loadingBtn} types={types} brands={brands}/>
                </div>
                <div className="customer__group" style={{display: 'grid'}}>
                    <div className="type">
                        { selectedType ?  
                            <div className="selected">
                                <div className="selected__block">
                                    <span>Выбрано: </span>
                                </div>
                                <Tag>{selectedType?.name ?? 'All'}</Tag>
                            </div> :
                            null
                        }
                        <div className="type__block type__block-start">
                            <span>Типы</span>
                            {
                                filterTypeShow ? 
                                <UpOutlined onClick={() => setFilterTypeShow(!filterTypeShow)}/> : 
                                <DownOutlined onClick={() => setFilterTypeShow(!filterTypeShow)}/>
                            }
                        </div>
                        <div className={`${filterTypeShow ? 'type__show' : 'type__hide'}`}>
                            <div className="type__checkbox">
                                <Radio.Group defaultValue={selectedType?.name}>
                                    <Space direction="vertical">
                                        <Radio onClick={() => setSelectedType('all')} defaultChecked={"all"}>All</Radio>
                                        {types?.map(type => <Radio key={type.id} onClick={() => setSelectedType(type)} value={type.name}>
                                            {type.name}
                                        </Radio>)}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                    <div className="brand">
                        { selectedBrand ?  
                            <div className="selected">
                                <div className="selected__block">
                                    <span>Выбрано: </span>
                                </div>
                                <Tag>{selectedBrand?.name ?? 'All'}</Tag>
                            </div> :
                            null
                        }
                        <div className="brand__block brand__block-start">
                            <span>Бренд</span>
                            {
                                filterBrandShow ? 
                                <UpOutlined onClick={() => setFilterBrandShow(!filterBrandShow)}/> : 
                                <DownOutlined onClick={() => setFilterBrandShow(!filterBrandShow)}/>
                            }
                        </div>
                        <div className={`${filterBrandShow ? 'brand__show' : 'brand__hide'}`}>
                            <div className="brand__checkbox">
                                <Radio.Group defaultValue={selectedBrand?.name}>
                                    <Space direction="vertical">
                                        <Radio onClick={() => setSelectedBrand('all')} defaultChecked={"all"}>All</Radio>
                                        {brands?.map(brand => <Radio key={brand.id} onClick={() => setSelectedBrand(brand)} value={brand.name}>
                                            {brand.name}
                                        </Radio>)}
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="filter">
                    <div className="sort">
                        Сортировать: <Select defaultValue="По дате создания" style={{marginLeft: '0.5rem'}} onChange={sortHandleChange}>
                            <Option value="asc_name">По алфавитному <ArrowUpOutlined /></Option>
                            <Option value="desc_name">По алфавитному <ArrowDownOutlined /></Option>
                            <Option value="asc_price">По цене <ArrowUpOutlined /></Option>
                            <Option value="desc_price">По цене <ArrowDownOutlined /></Option>
                            <Option value="asc_rating">По рейтингу<ArrowUpOutlined /></Option>
                            <Option value="desc_rating">По рейтингу<ArrowDownOutlined /></Option>
                            <Option value="asc_createdAt">По дате <ArrowUpOutlined /></Option>
                            <Option value="desc_createdAt">По дате <ArrowDownOutlined /></Option>
                            <Option value="asc_updatedAt">По обнов дате <ArrowUpOutlined /></Option>
                            <Option value="desc_updatedAt">По обнов дате <ArrowDownOutlined /></Option>
                        </Select>
                    </div>
                    <Search
                        placeholder='Search ...'
                        defaultValue={localStorage.getItem('search_device_query')}
                        onChange={e => setSearchName(e.target.value)} 
                        onPressEnter={searchClickHandler}
                        className="private-search"
                    />
                </div>
                <Table 
                    dataSource={devices} 
                    columns={columns} 
                    rowKey={devices => devices.id} 
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

export default PrivateDevice;
