import React from 'react';
import '../../assets/scss/admin/Monitor.scss';
import MonitorImg from '../../assets/img/auth/login.svg';
import { useHistory } from 'react-router';
const PrivateMonitor = ({monitorData}) => {
    const history = useHistory();
    return <>
        <section className="monitor">
            <div className="monitor__block">
                <div className="monitor__overview">
                    <img src={MonitorImg} alt="Monitor" className="monitor__img"/>
                    <span>
                        <h2>Hello Store</h2>
                        <p>Welcome to your admin dashboard</p>
                    </span>
                </div>
                <div className="cards monitor__cards">
                    {monitorData.map(({id, name, count, icon, path}) => <div className="card monitor__card" key={id} onClick={() => history.push(path)}>
                        <span className="monitor__card__img">
                            {icon}
                        </span>
                        <span className="monitor__card__content">
                            <p>{name}</p>
                            <span>{count}</span>
                        </span>
                    </div>)}
                </div>
            </div>
        </section>
    </>
};

export default PrivateMonitor;
