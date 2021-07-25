import { MonitorOutlined, ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router';
import '../../assets/scss/main/PublicType.scss';
import { PUBLIC_DEVICE_ROUTE } from '../../utils/consts';
import { Skeleton } from 'antd';

const PublicType = (props) => {
    const { 
        types, setSelectedType, loading
     } = props;
    const history = useHistory();
    return <>
        <section className="type">
            <Skeleton loading={loading}>
                <h2 className="title">Типы</h2>
                <div className="cards type__cards">
                    {types?.map(type => <div key={type.id} className="card type__card" onClick={() => {
                        setSelectedType(type);
                    }}>
                        <a href={PUBLIC_DEVICE_ROUTE}>
                            <ShoppingOutlined />
                            <h4>{type.name}</h4>
                        </a>
                    </div>)}
                </div>
            </Skeleton>
        </section>
    </>
}

export default PublicType
