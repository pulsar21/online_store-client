import React, { useEffect, useState } from 'react'
import '../../assets/scss/navbar/PublicNavbar.scss';
import { NavLink, useHistory } from 'react-router-dom';
import { ABOUT_US_ROUTE, BASKET_ROUTE, HOME_ROUTE, PUBLIC_DEVICE_ROUTE, PUBLIC_TYPE_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE } from '../../utils/consts';
import TheAvatar from '../avatar/TheAvatar';
import { Badge, Button, Divider, Dropdown, Empty, Image, Menu, Popover, Rate, Select, Skeleton, Space } from 'antd';
import { useSelector } from 'react-redux';
import { ArrowRightOutlined, DeleteOutlined, DownOutlined, HeartOutlined, MenuOutlined, PhoneOutlined, ShopOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import { useTypeAction } from '../../hooks/useTypeAction';
import LoadingBar from 'react-top-loading-bar';
import LogoImg from '../../assets/img/main/main-bg.png';

const { Option } = Select;

const PublicNavbar = ({sidebarOpen, toggleSidebar, user}) => {
    const isAuth = useSelector(state => state.user.isAuth)
    const {types, selectedType, loading} = useSelector(state => state.type);
    const { selectedBrand } = useSelector(state => state.brand);
    const { progress } = useSelector(state => state.app);
    const { loadingCart, cartItems } = useSelector(state => state.cart);
    const { loadingWishList, wishListItems } = useSelector(state => state.wishlist);
    const { getTypes, getWishList, setSelectedType, setPageTranstitonProgressBar, searchDevices, getCart } = useTypeAction();
    const history = useHistory();
    const [searchName, setSearchName] = useState('');
    const menu = (
        <Menu>
            <Menu.Item>
                <NavLink to={PUBLIC_DEVICE_ROUTE} onClick={() => {
                    setPageTranstitonProgressBar(0);
                    setPageTranstitonProgressBar(100);
                }}>Девайсы</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to={ABOUT_US_ROUTE} onClick={() => {
                    setPageTranstitonProgressBar(0);
                    setPageTranstitonProgressBar(100);
                }}>О нас</NavLink>
            </Menu.Item>
        </Menu>
    );
    const typeMenu = (
        <Menu>
            <Menu.Item onClick={() => history.push(PUBLIC_TYPE_ROUTE)} defaultValue="all">
                Все
            </Menu.Item>
            {
                types?.map(type => 
                <Menu.Item 
                    key={type.id} 
                    onClick={() => {
                        setSelectedType(type);
                    }}
                >
                    {type.name}
                </Menu.Item>)
            }
        </Menu>
    )
    console.log(wishListItems);

    const heartText = <div className="heart-badge">
        <h3 className="heart-badge__title">Heart</h3>
        {types?.length > 0 ? <span className="heart-badge__count">{types?.length}</span> : null}
    </div>;
    const heartContent = (   
    <div className="heart-badge__content">
        {
            types?.length > 0 ? <>
                <ul>
                    {types?.map((type) => <li key={type.id}>
                        <span>{type.title}</span>
                    </li>)}
                </ul>
                <div className="heart-badge__footer">
                    <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button className="delete" size="small">
                            Delete all
                            <DeleteOutlined />
                        </Button>
                        <Button className="view" size="small">
                            View all
                            <ArrowRightOutlined />
                        </Button>
                    </Space>
                </div>  
            </> :
            <Empty/>
        }
    </div>
    );

    const onFinished = () => setPageTranstitonProgressBar(0);  
    
    const searchHandler = (value) => {
        searchDevices(value, selectedType?.id, selectedBrand?.id);
        history.push(PUBLIC_DEVICE_ROUTE);
    };
    
    useEffect(() => {
        getTypes();
    }, []);

    useEffect(() => {
        try {
            getCart();
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            getWishList();
        } catch (error) {
            
        }
    }, [])

    return <>
        <Skeleton loading={loading} active>
            <header className="header">
                <LoadingBar color="#6c63ff" progress={progress} onLoaderFinished={onFinished}/>
                <nav className="nav">
                    <div className="header__logo">
                        <NavLink to={HOME_ROUTE} onClick={() => {
                            setPageTranstitonProgressBar(0);
                            setPageTranstitonProgressBar(100);
                        }}>
                            <ShopOutlined />
                            <h1 className="logo__title">SMM store</h1>
                        </NavLink>
                    </div>
                    <div className="header__search">
                        <Search placeholder="Я хочу найти ... " onSearch={searchHandler} defaultValue={localStorage.getItem('search_device_query')}/>
                    </div>
                    <div className="header__helper"> 
                        <div className="like header__like">
                            <Badge count={0} size="small" overflowCount={5} offset={[2,-6]}>
                                <Popover title={heartText} content={heartContent} trigger="click" placement="bottomRight">
                                    <HeartOutlined />   
                                </Popover>
                            </Badge>
                        </div>
                        <div className="header__basket">
                            <Badge count={cartItems?.length} size="small" overflowCount={5} offset={[1,-4]}>
                                
                                <ShoppingCartOutlined onClick={() => history.push(BASKET_ROUTE)} style={{cursor: 'pointer'}} />    
                                
                            </Badge>
                        </div>   
                        {isAuth ?  <TheAvatar user={user} setPageTranstitonProgressBar={setPageTranstitonProgressBar}/> : <div className="header__group">
                            <Button className="btn-signin" onClick={() => history.push(SIGNIN_ROUTE)}>Sign In</Button>
                            <Button className="btn-signup" onClick={() => history.push(SIGNUP_ROUTE)}>Sign Up</Button>
                        </div>}
                    </div>
                    <div className="burger-menu">
                        <MenuOutlined onClick={toggleSidebar}/>
                    </div>
                </nav>
                <Divider />
                <nav className="nav__footer">
                    <div className="category">
                        <Dropdown overlay={typeMenu} className="category__dropdown-type">
                            <Button>
                                {selectedType?.name || 'Выберите тип'}
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={menu} trigger={['hover','click']} placement="bottomCenter" className="dropdown">
                            <Button>
                                <span>Магазин</span>
                                <DownOutlined />
                            </Button>
                        </Dropdown>
                        <ul className="menu navbar-menu">
                            <li className="navbar-item">
                                <NavLink to={PUBLIC_DEVICE_ROUTE} onClick={() => {
                                    setPageTranstitonProgressBar(0);
                                    setPageTranstitonProgressBar(100);
                                }}>
                                    Девайсы
                                </NavLink>
                            </li>
                            <li className="navbar-item">
                                <NavLink to={ABOUT_US_ROUTE} onClick={() => {
                                    setPageTranstitonProgressBar(0);
                                    setPageTranstitonProgressBar(100);
                                }}>
                                    О нас
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="header__phone">
                        <div className="helper">
                            <div className="like header__like">
                                <Badge count={types?.length} size="small" overflowCount={7} offset={[2,-6]}>
                                    <Popover title={heartText} content={heartContent} trigger="click" placement="bottom">
                                        <HeartOutlined />   
                                    </Popover>
                                </Badge>
                            </div>
                            <div className="header__basket">
                                <Badge count={types?.length} size="small" overflowCount={7} offset={[1,-4]}>
                                    
                                    <ShoppingCartOutlined onClick={() => history.push(BASKET_ROUTE)} style={{cursor: 'pointer'}}/>    
                                   
                                </Badge>
                            </div>
                        </div>
                        <div className="phone">
                            <a href="tel:+77074576404"><PhoneOutlined /></a>
                            <a href="tel:+77074576404" className="phone-tel">+7(707)4576404</a>
                        </div>
                        <div className="schedule">
                            <span>
                                Пн-Пт: 09:00 - 20:00<br />
                                Сб-Вс: 10:00 - 15:00
                            </span>
                        </div>
                    </div>
                </nav>
            </header>
        </Skeleton>
    </>
}

export default PublicNavbar
