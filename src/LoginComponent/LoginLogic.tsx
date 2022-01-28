import { FC } from "react"
interface ILoginProps {
    children?:(onFinish:(value:any)=>void,onFinishFailed:(value:any)=>void)=>JSX.Element
 }

export const LoginLogic: FC<ILoginProps> = ({children}) => {

    console.log(children)
    const onFinish = (values: any):void => {
        console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any):void => {
        console.log('Failed:', errorInfo)
    }

    return (
        <>
        {children && children(onFinish,onFinishFailed)}
        </>
    )
}

