import { FC, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { persistor } from "../../MasterComponent/App"
import { isJson, returnTokenFromLocal } from "../../Services/utilsFunction/parsingTokenFunctions"

interface IHeaderLogicProps {
    route: BreadCrumb,
    children: (navigate: any, routes: any, isLoginToken: any, toggleLogin: () => void, pseudo: string | null, mail: string | null) => JSX.Element,
    client: any
}
export interface BreadCrumb {
    path: string,
    breadcrumbName: string
}
// type CachedUser = {

// }
export const HeaderLogic: FC<IHeaderLogicProps> = ({ children, route, client }) => {
    const [isLoginToken, setIsLoginToken] = useState<string | null>(null)
    const [pseudo, setPseudo] = useState<string | null>(null)
    const [mail, setMail] = useState<string | null>(null)
    const navigate = useNavigate()
    const routes: BreadCrumb[] = [
        {
            path: 'first',
            breadcrumbName: '/Home',
        },
        route,
    ]

    useEffect(() => {

        const data = window.localStorage.getItem('user-logged-in')
        // javascript <3
        console.log(data)//undefined
        console.log('data: ', typeof data === 'string')//true

        if (isJson(data)) {
            if (data && JSON.parse(data)) {
                console.log('im not undefined!')
                setPseudo(JSON.parse(data)['user:1'].pseudo)
                setMail(JSON.parse(data)['user:1'].email)
            }
        }
    }, [pseudo, mail])

    useEffect(() => {

        setIsLoginToken(returnTokenFromLocal() ?? null)
    }, [returnTokenFromLocal])

    const toggleLogin = () => {
        isLoginToken && persistor.purge()
        client.clearStore()
        navigate("/login")
    }
    return (
        <>
            {children && children(navigate, routes, isLoginToken, toggleLogin, pseudo, mail)}
        </>
    )
}
