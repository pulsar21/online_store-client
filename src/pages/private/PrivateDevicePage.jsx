import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTypeAction } from '../../hooks/useTypeAction';
import { useParams } from 'react-router-dom';
import DataLoader from '../../components/loader/DataLoader';
import DevicePageImg from '../../assets/img/auth/avatar.jpg';
import { Image, Rate } from 'antd';

const PrivateDevicePage = () => {
    const {device, loading} = useSelector(state => state.device);
    const { getOneDevice } = useTypeAction();
    const { id } = useParams();
    console.log(device?.info);
    useEffect(() => {
        try {
            getOneDevice(id);
        } catch (error) {
            console.log(error);
        }
    }, [])
    if (loading) {
        return <DataLoader />
    }
    return <>
         <section className="admin-profile">
            <div className="admin-profile__block">
                <h3 className="title">
                    Profile
                </h3>
                <div className="admin-profile__info">
                    <div className="admin-profile__thumb img-square">
                        <Image src={`${process.env.REACT_APP_API_URL}${device?.img}`} className="admin-profile__img" preview={false}/>
                    </div>
                    <div className="admin-profile__content">
                        <div className="cards">
                            <div className="card">
                                <h3 className="card__title">Name</h3>
                                <p className="card__desc">{device?.name}</p>
                            </div>
                            <div className="card">
                                <h3 className="card__title">Price</h3>
                                <p className="card__desc">{device?.price}</p>
                            </div>
                            <div className="card">
                                <h3 className="card__title">Rating</h3>
                                <Rate allowHalf value={device?.rating} disabled/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="admin-profile__settings">
                    Access Settings
                </div>
                <div className="cards access__cards">
                    
                    {device?.info.map(info =>  <div className="card" key={info.id}>
                        <h3 className="card__title">{info.title}</h3>
                        <p className="card__desc">{info.description}</p>
                    </div>)}
                       
                </div>
            </div>
        </section>
    </>
}

export default PrivateDevicePage;
