import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PublicNavbar from '../components/navbar/PublicNavbar';
import '../assets/scss/layout/PublicLayout.scss';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../hooks/useTypeAction';
import PublicSidebar from '../components/sidebar/PublicSidebar';
import Breadcrumb from '../components/breadcrumb/BreadCrumb';
import { BackTop, Skeleton } from 'antd';
import { UpOutlined } from '@ant-design/icons';
import Footer from '../components/footer/Footer';

const PublicLayout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [show, setShow] = useState(false); 
    const { user } = useSelector(state => state.user);
    const { signOut } = useTypeAction();
    const history= useHistory();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        window.replainSettings = { id: '6c89ed85-debb-4714-a4be-18ed37d651aa' };
        (function(u){
            const s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.id = 'chatMessenger';
            s.src = u;
            const x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s,x);
        })('https://widget.replain.cc/dist/client.js');
    }, []);
    return <>
        <div className="public-wrapper">
            <PublicNavbar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} user={user}/>
            <div className="container">
                <main className="main"> 
                    <article className="article">
                        {props.children}
                    </article>
                </main>
            </div>
            <Footer />
            <PublicSidebar 
                sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} show={show} 
                setShow={setShow} history={history} signOut={signOut} user={user}
            />
            <BackTop>
                <div className="backtop">
                    <UpOutlined />
                </div>
            </BackTop>
        </div>
    </>
}

export default PublicLayout
