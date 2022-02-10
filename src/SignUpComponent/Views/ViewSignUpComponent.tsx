/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Button, Form, Input } from "antd"
import { FC } from "react"
import { Controller, useForm } from "react-hook-form"
import { Col, Row } from "../../css/style"
import { UserModel, UsersDTO } from "../SignUpLogic"


interface IViewSignUpComponent {
    onFinish: (value: any) => void,
    onFinishFailed: (value: any) => void
}

export const ViewSignUpComponent: FC<IViewSignUpComponent> = ({ onFinish, onFinishFailed }) => {
    // console.log(data.users)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            pseudo: ''
        }
    })
    const onSubmit = (data: UserModel) => {

        console.log('formdata : ',data)
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
                name="firstname"
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
                        placeholder="entrez votre prénom"
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
                name="lastname"
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
                        placeholder="entrez votre nom"
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
                name="pseudo"
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
                        placeholder="entrez votre pseudo"
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

                    placeholder="Entrez Votre Mot De Passe"
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
            <Controller
                name="password"
                control={control}
                render={({ field }) =>
                    <Input
                    type={"password"}
                        placeholder="Entrer De Nouveau Votre Mot De Passe"
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

                    />
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
