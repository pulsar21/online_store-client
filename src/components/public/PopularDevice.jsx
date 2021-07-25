import { ArrowRightOutlined, EyeOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PUBLIC_DEVICE_ROUTE, PUBLIC_DEVICE_PAGE_ROUTE } from '../../utils/consts'
import { Button, Empty, Image, List, Rate, Skeleton, Space } from 'antd';
import { AnimateSharedLayout, AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';

const PopularDevice = ({devices, history, loading }) => {

    const sliderSettings = {
        className: "center",
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 6,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return <>
        <Skeleton loading={loading} active>
            <section className="popular-device">
                {devices?.filter(device => device.rating >= 4.5 && device).length < 5 ? 
                    <div className="cards device__cards device__cards-gap">
                        { devices?.filter(device => device.rating >= 4.5 && device).map(({id, img, name, rating, price}) => 
                        <div key={id} onClick={() => history.push(`${PUBLIC_DEVICE_ROUTE}/${id}`)} className="device__card">
                            <div className="device__header">
                                <div className="add-to-heart">
                                    <Button icon={<HeartOutlined />}></Button>
                                </div>
                                <div className="device__img">
                                    <Image src={`${process.env.REACT_APP_API_URL}/${img}`} preview={false}/>
                                </div>
                                <div className="device__title">
                                    <h3>{name}</h3>
                                    <Rate allowHalf value={rating} disabled/>
                                </div>
                                <div className="device__footer">               
                                    <div className="device__price">
                                        <p>
                                            $ {price}
                                        </p>
                                    </div>
                                    <Button icon={<ShoppingCartOutlined />}></Button>  
                                </div>
                            </div>
                        </div>)}
                    </div> : devices?.length >= 5 ? 
                    <Slider {...sliderSettings}>
                        {devices?.filter(device => device.rating >= 4.5 && device).map(({id, img, name, rating, price}) => 
                            <div key={id} onClick={() => history.push(`${PUBLIC_DEVICE_ROUTE}/${id}`)} className="device__card">
                                <div className="device__header">
                                    <div className="add-to-heart">
                                        <Button icon={<HeartOutlined />}></Button>
                                    </div>
                                    <div className="device__img">
                                        <Image src={`${process.env.REACT_APP_API_URL}/${img}`} preview={false}/>
                                    </div>
                                    <div className="device__title">
                                        <h3>{name}</h3>
                                        <Rate allowHalf value={rating} disabled/>
                                    </div>
                                    <div className="device__footer">               
                                        <div className="device__price">
                                            <p>
                                                $ {price}
                                            </p>
                                        </div>
                                        <Button icon={<ShoppingCartOutlined />}></Button>  
                                    </div>
                                </div>
                            </div>
                        )}
                    </Slider> : 
                    <Empty description={"No data devices"} style={{margin: '5rem 0'}}/>
                }     
            </section>
        </Skeleton>
    </>
}

export default PopularDevice
