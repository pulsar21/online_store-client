import { ArrowDownOutlined, ArrowUpOutlined, DownOutlined, EyeOutlined, HeartFilled, HeartOutlined, LineOutlined, ShoppingCartOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Empty, Form, Image, Input, List, Pagination, Radio, Rate, Row, Select, Skeleton, Space, Tag } from 'antd';
import React, { useState } from 'react';
import '../../assets/scss/main/Product.scss';
import { useTypeAction } from '../../hooks/useTypeAction';
import { PUBLIC_DEVICE_PAGE_ROUTE } from '../../utils/consts';

const { Option } = Select;

const PublicDevice = (props) => {
    const { 
        devices, history, brands, 
        selectedBrand, setSelectedBrand,
        setPageTranstitonProgressBar,
        sortHandleChange, page, totalCount, limit,
        pageChangeHandler, filterPriceRangeDevices, filterRatingRangeDevices,
        addToCart, loadingCartBtn
    } = props;

    console.log(devices);
    
    const [filterPriceShow, setFilterPriceShow] = useState(true);
    const [filterRatingShow, setFilterRatingShow] = useState(true);
    const [filterBrandShow, setFilterBrandShow] = useState(true);
    const [heartFilled, setHeartFilled] = useState(false);
    const [priceMin, setPriceMin] = useState(JSON.parse(localStorage.getItem('filterByPrice'))?.priceMin ?? 1);
    const [priceMax, setPriceMax] = useState(JSON.parse(localStorage.getItem('filterByPrice'))?.priceMax ?? 2000);
    const [ratingMin, setRatingMin] = useState(JSON.parse(localStorage.getItem('filterByRating'))?.ratingMin ?? 1);
    const [ratingMax, setRatingMax] = useState(JSON.parse(localStorage.getItem('filterByRating'))?.ratingMax ?? 5);
    const [basketFill, setBasketFill] = useState(false);

    const wishListClickHandler = () => {
        setHeartFilled(!heartFilled);
    };

    let filterPriceRangeHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('filterByPrice', JSON.stringify({ priceMin, priceMax }));
        filterPriceRangeDevices(priceMin, priceMax, selectedBrand?.id);
    };

    let filterRatingRangeHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('filterByRating', JSON.stringify({ ratingMin, ratingMax }));
        filterRatingRangeDevices(ratingMin, ratingMax, selectedBrand?.id);
    };
    
    const addToCartHandler = (e, id, qty) => {
        e.preventDefault();
        // addToCart(device?.id, qty);
        console.log(id, qty)
        setBasketFill(true);
    }

    return <>
        <section className="device">
            <Row className="device__row">
                <Col md={6} className="device__left">
                    <div className="device__sidebar">
                        { selectedBrand ?  
                            <div className="selected">
                                <div className="selected__block">
                                    <span>Выбрано</span>
                                </div>
                                <Tag>{selectedBrand?.name ?? 'All'}</Tag>
                            </div> :
                            null
                        }
                        <div className="price">
                            <div className="price__block">
                                <span>Price</span>
                                {
                                    filterPriceShow ? 
                                    <UpOutlined onClick={() => setFilterPriceShow(!filterPriceShow)}/> : 
                                    <DownOutlined onClick={() => setFilterPriceShow(!filterPriceShow)}/>
                                }
                            </div>
                            <div className={`${filterPriceShow ? 'price__show' : 'price__hide'}`}>
                                <Form
                                    initialValues={{
                                        priceMin,
                                        priceMax
                                    }}
                                >
                                    <div className="price__input">
                                            <Form.Item
                                                name="priceMin"
                                            >
                                                <Input
                                                    className="price__input-circle" 
                                                    placeholder="от" 
                                                    value={priceMin}
                                                    onChange={(e) => setPriceMin(Number(e.target.value))}
                                                />
                                            </Form.Item>
                                            <LineOutlined className="price__line"/>
                                            <Form.Item
                                                name="priceMax"
                                            >
                                                <Input 
                                                    className="price__input-circle" 
                                                    placeholder="до"
                                                    value={priceMax}
                                                    onChange={(e) => setPriceMax(Number(e.target.value))}
                                                />
                                            </Form.Item>
                                    
                                    </div>
                                    <div className="price__btn">
                                        <Button onClick={filterPriceRangeHandler}>Применить</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="rating">
                            <div className="rating__block">
                                <span>Rating</span>
                                {
                                    filterRatingShow ? 
                                    <UpOutlined onClick={() => setFilterRatingShow(!filterRatingShow)}/> : 
                                    <DownOutlined onClick={() => setFilterRatingShow(!filterRatingShow)}/>
                                }
                            </div>
                            <div className={`${filterRatingShow ? 'rating__show' : 'rating__hide'}`}>
                                <Form
                                    initialValues={{
                                        ratingMin,
                                        ratingMax
                                    }}
                                >
                                    <div className="rating__input">
                                            <Form.Item
                                                name="ratingMin"
                                            >
                                                <Input
                                                    className="rating__input-circle" 
                                                    placeholder="от" 
                                                    value={ratingMin}
                                                    onChange={(e) => setRatingMin(Number(e.target.value))}
                                                    min={1}
                                                    max={5}
                                                    maxLength={1}
                                                />
                                            </Form.Item>
                                            <LineOutlined className="rating__line"/>
                                            <Form.Item
                                                name="ratingMax"
                                            >
                                                <Input 
                                                    className="rating__input-circle" 
                                                    placeholder="до"
                                                    value={priceMax}
                                                    onChange={(e) => setRatingMax(Number(e.target.value))}
                                                    min={1}
                                                    max={5}
                                                    maxLength={1}
                                                />
                                            </Form.Item>
                                    
                                    </div>
                                    <div className="rating__btn">
                                        <Button onClick={filterRatingRangeHandler}>Применить</Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div className="brand">
                            <div className="brand__block">
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
                </Col>
                <Col md={18} className="device__right" style={{height: '85vh'}}>
                    {
                        devices?.length > 0 ?
                        <div className="device__block">
                            <div className="block__header">
                                <span>
                                    <h3>Устройство</h3>
                                    <p>Всего {devices?.length} устройств</p>
                                </span>
                                <div className="sort">
                                    Сортировать: <Select defaultValue="По дате создания" style={{marginLeft: '0.5rem'}} onChange={sortHandleChange}>
                                        <Option value="asc_name">По имени <ArrowUpOutlined /></Option>
                                        <Option value="desc_name">По имени <ArrowDownOutlined /></Option>
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
                            </div>
                            <div className="cards device__cards device__cards-4">
                                {devices?.map(({id, img, name, rating, price}) => 
                                    <div key={id} className="device__card">
                                        <div className="device__header">
                                            <div className="add-to-heart">
                                                <Button 
                                                    icon={heartFilled ? <HeartFilled className="heart heart-filled"/> : <HeartOutlined className="heart heart-outlined"/>} 
                                                    onClick={wishListClickHandler}
                                                >
                                                </Button>
                                            </div>
                                            <div className="device__img" onClick={() => {
                                                setPageTranstitonProgressBar(0)
                                                history.push(`${PUBLIC_DEVICE_PAGE_ROUTE}/${id}`)
                                                setPageTranstitonProgressBar(100)
                                            }} >
                                                {img ? <Image src={`${process.env.REACT_APP_API_URL}/${img}`} preview={false}/> : <Skeleton.Image />}
                                            </div>
                                            <div className="device__title">
                                                <h3>{name}</h3>
                                                <Rate allowHalf value={rating} disabled/>
                                            </div>
                                        </div>
                                        <div className="device__footer">
                                            <div className="device__price">
                                                <p>
                                                    $ {price}
                                                </p>
                                            </div>
                                            <Button 
                                                icon={<EyeOutlined onClick={() => history.push(`${PUBLIC_DEVICE_PAGE_ROUTE}/${id}`)}/>} 
                                                onClick={(e) => addToCartHandler(e, id, 1)}
                                                loading={loadingCartBtn}
                                            >
                                            </Button>                                       
                                        </div>
                                </div>)}
                            </div>
                        </div> : <Empty className="no-data"/>
                    }
                    <Pagination 
                        style={{marginTop: '2rem'}}
                        defaultCurrent={1}
                        showQuickJumper 
                        showTotal={total => `Total ${total} items`}
                        current={page}
                        pageSize={limit}
                        total={totalCount}
                        onChange={pageChangeHandler}
                        className="pagination"
                    />
                </Col>
            </Row>
        </section>
    </>
}

export default PublicDevice;
