import { Breadcrumb } from 'antd';
import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { MONITOR_ROUTE } from '../../utils/consts';

const BreadCrumb = () => {
    const {pathname} = useLocation();
    const pathnames = pathname.split("/").filter((item) => item);
    const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
    return <>
         <Breadcrumb>
            {
                pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <Breadcrumb.Item key={index}>{capitalize(name)}</Breadcrumb.Item>
                    ) : (
                        <Breadcrumb.Item key={index}>
                            <NavLink to={routeTo}>{capitalize(name)}</NavLink>
                        </Breadcrumb.Item>
                    )
                })
            }
        </Breadcrumb>
    </>
};

export default BreadCrumb;
