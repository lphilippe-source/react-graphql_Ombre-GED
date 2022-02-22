import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { persistor } from "../../App"
// import { ViewPageHeader } from "./Views/ViewPageHeader";
interface IHeaderLogicProps {
    route: BreadCrumb,
    children: (navigate: any, routes: any, isLoginToken: any, toggleLogin: () => void) => JSX.Element,
    client: any
}
export interface BreadCrumb {
    path: string,
    breadcrumbName: string
}
export const HeaderLogic: FC<IHeaderLogicProps> = ({ children, route, client }) => {
    const [isLoginToken, setIsLoginToken] = useState<string | null>(null)
    const navigate = useNavigate()
    const routes: BreadCrumb[] = [
        {
            path: 'first',
            breadcrumbName: '/Home',
        },
        route,
    ]

    useEffect(() => {
        setIsLoginToken(localStorage.getItem('apollo-cache-persist') ?? null)
    }, [localStorage.getItem('apollo-cache-persist')])

    const toggleLogin = () => {
        isLoginToken && persistor.purge()
        client.clearStore()
        navigate("/login")
    }
    return (
        <>
            {children && children(navigate, routes,isLoginToken, toggleLogin )}
        </>
    )
}
