import { FC } from "react";

import { PageHeader, Menu, Dropdown, Button, Tag, Typography } from 'antd'
import { NavigateFunction } from "react-router-dom";
import { ViewDropDownMenu } from "./ViewDropDownMenu";
import { BreadCrumb } from "../HeaderComponent";
import { ViewMenu } from "./ViewMenu";
interface IViewPageHeaderProps {
    navigate: NavigateFunction,
    routes: BreadCrumb[]
};

export const ViewPageHeader: FC<IViewPageHeaderProps> = ({ navigate, routes }) => {
    return (
        <PageHeader
            title="Title"
            className="site-page-header"
            subTitle="This is a subtitle"
            tags={<Tag color="blue">Running</Tag>}
            extra={[
                <Button onClick={() => navigate("/login")} key="3">Login</Button>,
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
