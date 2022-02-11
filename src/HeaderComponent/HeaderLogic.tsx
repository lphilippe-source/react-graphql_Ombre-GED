import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { ViewPageHeader } from "./Views/ViewPageHeader";
interface IHeaderLogicProps {
    route: BreadCrumb,
    children: (navigate: any, routes: any) => JSX.Element
}
export interface BreadCrumb {
    path: string,
    breadcrumbName: string
}
export const HeaderLogic: FC<IHeaderLogicProps> = ({ children, route }) => {
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
            {children && children(navigate, routes)}
        </>
    )
}
