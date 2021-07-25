import { faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { Avatar, Badge, Button, Empty, Image, Popover, Space } from 'antd';
import '../../assets/scss/notification/Notification.scss';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../../hooks/useTypeAction';
import TheAvatar from '../avatar/TheAvatar';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons';
import { PRIVATE_NOTIFICATION_ROUTE } from '../../utils/consts';
import { useHistory } from 'react-router';

const Notification = () => {
    const {notifications, page, limit, totalCount, sort} = useSelector(state => state.notification);
    const user = useSelector(state => state.user.user);
    const history = useHistory();
    let full_name = user && user.full_name.split(' ').map(name => name[0].toUpperCase()).join('')
    const { getNotification, deletAllNotification } = useTypeAction()
    
    const text = <div className="notification-badge">
        <h3 className="notification-badge__title">Notifications</h3>
        {notifications?.length > 0 ? <span className="notification-badge__count">{notifications?.length}</span> : null}
    </div>;
    const content = (   
    <div className="notification-badge__content">
        {
            notifications?.length > 0 ? <>
                <ul>
                    {notifications?.map((notification, index) => <li key={index}>
                        <div className="avatar">
                            <Avatar>
                                {notifications ? notification?.full_name.split(' ').map(name => name[0].toUpperCase()).join('') : 'US'}
                            </Avatar>
                            <span className="avatar__full-name">{notification?.full_name}</span>
                        </div>
                        <span>{notification.title}</span>
                    </li>)}
                </ul>
                <div className="notification-badge__footer">
                    <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button className="delete" size="small" onClick={() => deletAllNotification()}>
                            Delete all
                            <DeleteOutlined />
                        </Button>
                        <Button className="view" size="small" onClick={() => history.push(PRIVATE_NOTIFICATION_ROUTE)}>
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
    useEffect(() => {
        getNotification(page, limit, sort);
    }, [page, sort])
    return <>
        <div className="notification">
            <Badge count={notifications?.length} size="small" overflowCount={7} offset={[-1,-3]}>
                <Popover title={text} content={content} trigger="click" placement="bottom">
                    <FontAwesomeIcon icon={faBell} size={"lg"}/>
                </Popover>
            </Badge>
        </div>
    </>
}

export default Notification
