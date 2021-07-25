import { ArrowRightOutlined } from '@ant-design/icons';
import { Skeleton } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../assets/scss/main/Home.scss';
import ListDevice from '../../components/public/ListDevice';
import PopularDevice from '../../components/public/PopularDevice';
import { PUBLIC_DEVICE_ROUTE } from '../../utils/consts';

const Home = (props) => {
    let { devices, history, loading } = props;

    // let laptops = [...devices];
    // laptops.filter(device => device.typeId === 'aded2db8-242f-4846-814c-88e0ba835611' && device)
    // const smartphones = [...devices];
    // const tablets = [...devices];
    let laptops = devices?.filter(device => device.typeId === '86e84d53-9d21-44b3-b619-69b504aaf47f' && device);
    let smartphones = devices?.filter(device => device.typeId === 'e12a30ed-ea78-4613-8b82-6fbd08f2491c' && device);
    let tablets = devices?.filter(device => device.typeId === '80d62bb5-43ae-4750-8cd8-3471d7a0f158' && device);
    return <>
        <section className="home">
            <div className="home__block">
                <Skeleton loading={loading} active>
                    <div className="slider home__slider">
                        <h3 className="title home__title">Online Store</h3>
                        <p className="desc home__desc">Lorem ipsum dolor sit amet consectetur<br />  adipisicing elit. Odio, et?</p>
                        <button className="btn btn-light btn-circle home__btn" onClick={() => history.push(PUBLIC_DEVICE_ROUTE)}>View all</button>
                    </div>
                </Skeleton>
                <Skeleton loading={loading} active>
                    <div className="device__popular">
                        <h3 className="title home__title">Popular Now</h3>
                        <NavLink to={PUBLIC_DEVICE_ROUTE}>View All <ArrowRightOutlined /></NavLink>
                    </div>
                </Skeleton>
                <PopularDevice history={history} devices={devices} loading={loading} />
                <Skeleton loading={loading} active>
                    <div className="device__popular">
                        <h3 className="title home__title">Laptops</h3>
                        <NavLink to={PUBLIC_DEVICE_ROUTE}>View All <ArrowRightOutlined /></NavLink>
                    </div>
                </Skeleton>
                <ListDevice history={history} devices={laptops} loading={loading} />
                <Skeleton loading={loading} active>
                    <div className="device__popular">
                        <h3 className="title home__title">Smartphones</h3>
                        <NavLink to={PUBLIC_DEVICE_ROUTE}>View All <ArrowRightOutlined /></NavLink>
                    </div>
                </Skeleton>
                <ListDevice history={history} devices={smartphones} loading={loading} />
                <Skeleton loading={loading} active>
                    <div className="device__popular">
                        <h3 className="title home__title">Tablets</h3>
                        <NavLink to={PUBLIC_DEVICE_ROUTE}>View All <ArrowRightOutlined /></NavLink>
                    </div>
                </Skeleton>
                <ListDevice history={history} devices={tablets} loading={loading} />
            </div>
        </section>
    </>
};

export default Home;
