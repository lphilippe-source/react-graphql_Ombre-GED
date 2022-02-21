import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ViewPageHeader } from "./Views/ViewPageHeader";
interface IHeaderLogicProps {
    route: BreadCrumb,
    children: (navigate: any, routes: any,client:any) => JSX.Element,
    client:any
}
export interface BreadCrumb {
    path: string,
    breadcrumbName: string
}
export const HeaderLogic: FC<IHeaderLogicProps> = ({ children, route, client }) => {
    const navigate = useNavigate()
    const routes: BreadCrumb[] = [
        {
            path: 'first',
            breadcrumbName: '/Home',
        },
        route,
    ]
    return (
        <>
            {children && children(navigate, routes,client )}
        </>
    )
}
