import { FC } from "react"
import { Form, Input, Button, Checkbox } from 'antd'
import { ApolloClient, makeVar } from "@apollo/client"
import { UserDto } from "../LoginLogic"
import { LOGIN_USER } from "../../Services/GraphQl/mutation"

 interface IFormComponentProps {
    onFinish: (value: any) => void,
    onFinishFailed: (value: any) => void
    client: ApolloClient<object>
}
interface IToken{
    user:UserDto,
    token:string

}

export const FormComponent: FC<IFormComponentProps> = ({client,onFinish,onFinishFailed}) => {
    // console.log(client.cache)
    // const userToken:IToken = makeVar<IToken>()
    // const { token } = client.readQuery({  query: LOGIN_USER,  variables: { 
        // Provide any required variables here
            // email:1,  },})
    return (
        <Form
            size="large"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input htmlSize={30}/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password htmlSize={30}/>
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}
