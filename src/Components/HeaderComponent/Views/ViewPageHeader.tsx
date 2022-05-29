import { FC } from "react"

import { PageHeader, Button, Tag } from 'antd'
import { NavigateFunction } from "react-router-dom"
import { ViewDropDownMenu } from "./ViewDropDownMenu"
import { BreadCrumb } from "../HeaderComponent"
import { ViewMenu } from "./ViewMenu"

interface IViewPageHeaderProps {
    navigate: NavigateFunction,
    routes: BreadCrumb[],
    toggleLogin: () => void,
    isLoginToken: string | null,
    pseudo:string|null,
    mail:string|null
    
}

export const ViewPageHeader: FC<IViewPageHeaderProps> = ({ navigate, routes, isLoginToken,toggleLogin,pseudo,mail}) => {
    return (
        <PageHeader
            title={pseudo}
            className="site-page-header"
            subTitle={mail}
            tags={isLoginToken?<Tag color="blue">Connected</Tag>:<Tag color="orange">Disconnected</Tag>}
            extra={[
                <Button onClick={() => toggleLogin()} key="3">{isLoginToken ? 'Logout' : 'Login'}</Button>,
                <Button onClick={() => navigate("/")} key="2">Home</Button>,
                <ViewDropDownMenu ViewMenu={<ViewMenu />} key="more" />,
            ]}
            avatar={{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }}
            breadcrumb={{ routes }}
        >
        </PageHeader>
    )
}
