import { FC, useEffect, useState } from "react";

import { PageHeader, Menu, Dropdown, Button, Tag, Typography } from 'antd'
import { NavigateFunction, useLocation } from "react-router-dom"
import { ViewDropDownMenu } from "./ViewDropDownMenu"
import { BreadCrumb } from "../HeaderComponent"
import { ViewMenu } from "./ViewMenu"
import { persistor } from "../../App";
interface IViewPageHeaderProps {
    navigate: NavigateFunction,
    routes: BreadCrumb[],
    client:any
};

export const ViewPageHeader: FC<IViewPageHeaderProps> = ({ navigate, routes,client }) => {
    const location = useLocation()
    const [isLogin, setIsLogin] = useState<string | null>(null)
    useEffect(() => {
        setIsLogin(localStorage.getItem('apollo-cache-persist') ?? null)

    }, [localStorage.getItem('apollo-cache-persist')])
    const toggleLogin = () => {
        isLogin && persistor.purge()
        client.clearStore()
        navigate("/login")
    }
    return (
        <PageHeader
            title="Title"
            className="site-page-header"
            subTitle="This is a subtitle"
            tags={<Tag color="blue">Running</Tag>}
            extra={[
                <Button onClick={() => toggleLogin()} key="3">{isLogin ? 'Logout' : 'Login'}</Button>,
                <Button onClick={() => navigate("/")} key="2">Home</Button>,
                <Button key="1" type="primary">
                    Primary
                </Button>,
                <ViewDropDownMenu ViewMenu={<ViewMenu />} key="more" />,
            ]}
            avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            breadcrumb={{ routes }}
        >
        </PageHeader>
    )
}
