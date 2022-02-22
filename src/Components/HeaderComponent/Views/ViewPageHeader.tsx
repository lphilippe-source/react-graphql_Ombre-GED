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
    isLoginToken: string | null
}

export const ViewPageHeader: FC<IViewPageHeaderProps> = ({ navigate, routes, isLoginToken,toggleLogin  }) => {
console.log('toggleLogin: ',toggleLogin)
    return (
        <PageHeader
            title="Title"
            className="site-page-header"
            subTitle="This is a subtitle"
            tags={isLoginToken?<Tag color="blue">Connected</Tag>:<Tag color="orange">Disconnected</Tag>}
            extra={[
                <Button onClick={() => toggleLogin()} key="3">{isLoginToken ? 'Logout' : 'Login'}</Button>,
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
