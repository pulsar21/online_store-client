import React, { useState } from 'react';
import PrivateSidebar from '../components/sidebar/PrivateSidebar';
import PrivateNavbar from '../components/navbar/PrivateNavbar';
import '../assets/scss/layout/PrivateLayout.scss';
import { motion } from 'framer-motion';
import BreadCrumb from '../components/breadcrumb/BreadCrumb';
import { useSelector } from 'react-redux';
import { useTypeAction } from '../hooks/useTypeAction';

const PrivateLayout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const user = useSelector(state => state.user.user);
    const progress = useSelector(state => state.app.progress);
    const { setPageTranstitonProgressBar } = useTypeAction();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);  
    };

    const motionOptions = {
        initial: {
            scale: 0
        },
        animate: {
            scale: 1
        },
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 20
        }
    }
    return <>
        <div className="private-wrapper">
            <PrivateNavbar 
                sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} user={user} 
                progress={progress} setPageTranstitonProgressBar={setPageTranstitonProgressBar}
            />
            <main className="private-main">
                <motion.div
                    {...motionOptions}
                >
                    <BreadCrumb />
                    <article className="private-article">
                        {props.children}
                    </article>
                </motion.div>
            </main>
            <PrivateSidebar 
                sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} user={user}
                progress={progress} setPageTranstitonProgressBar={setPageTranstitonProgressBar}
            />
        </div>
    </>
}

export default PrivateLayout
