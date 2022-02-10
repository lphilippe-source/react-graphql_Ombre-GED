/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { FC } from "react"
import { Form, Input, Button } from 'antd'
import { Controller, useForm } from "react-hook-form"
import { Credentials } from "../LoginLogic"

interface IFormComponentProps {
    onFinish: (value: any) => void,
    onFinishFailed: (value: any) => void
}

export const FormComponent: FC<IFormComponentProps> = ({ onFinish, onFinishFailed }) => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = (data: Credentials) => {

        onFinish(data)
    }
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
            <Controller

                name="email"
                control={control}
                rules={{
                    maxLength: 100,
                    required: true,
                    pattern: {
                        value: /\w+/,
                        message: "todo  password check"
                    }
                }}
                render={({ field }) =>
                    <Input
                        {...field}
                        placeholder="entrez votre email"
                        css={css`border-radius: 4px;
                    box-sizing: border-box;
                    display: block;
                    font-size: .9rem;
                    margin-bottom: 10px;
                    padding: 6px 10px;
                    width: 100%;
                    animation: 0.3s linear 0s 1 normal none running RSI-ty8uw43tj;
                    background-color:#252829;
                    color: rgb(255, 255, 255);
                    &:hover {
                        border: 1px solid #e22063;
                        padding: 6px 10px;
                    }
                    `} htmlSize={50} />
                }
            />
            <Controller
                name="password"
                control={control}
                rules={{
                    maxLength: 100,
                    required: true,
                    pattern: {
                        value: /\w+/,
                        message: "todo  password check"
                    }
                }}
                render={({ field }) => <Input

                    placeholder="entrez votre email"
                    type={"password"}
                    {...field}
                    css={css`border-radius: 4px;
                    box-sizing: border-box;
                    display: block;
                    font-size: .9rem;
                    margin-bottom: 10px;
                    padding: 6px 10px;
                    width: 100%;
                    background-color:#252829;
                    animation: 0.3s linear 0s 1 normal none running RSI-ty8uw43tj;
                    color: rgb(255, 255, 255);
                    &:hover {
                        border: 1px solid #e22063;
                        padding: 6px 10px;
                    }
                    `}
                    htmlSize={50} />
                }
            />
                    <Button
                        onClick={handleSubmit(onSubmit)}
                        css={css`
                        letter-spacing: .5rem;
                        text-transform: uppercase;
                        width: 100%;
                        color: rgb(255, 255, 255);
                        background: #c01c5a;
                        border: 1px solid #c01c5a;
                        padding: 6px 10px;
                        &:hover {
                            border: 1px solid #e22063;
                            padding: 6px 10px;
                        }
                    `}
                        type="primary" htmlType="submit">
                        Submit
                    </Button>
        </Form>
    )
}
