/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Button, Form, Input } from "antd"
import { FC } from "react"
import { Controller, useForm, SubmitHandler } from "react-hook-form"
import { Col } from "../../../css/style"
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'


interface IViewSignUpComponent {
    onFinish: (value: any) => void,
    onFinishFailed: (value: any) => void
}
type UserForm = {
    email: string,
    password: string,
    password2: string,
    firstname: string,
    lastname: string,
    pseudo: string
}

export const ViewSignUpComponent: FC<IViewSignUpComponent> = ({ onFinish, onFinishFailed }) => {
    // console.log(data.users)
    //TODO add info user on backend model
    const { register, formState: { errors }, control, handleSubmit } = useForm({
        defaultValues: {
            form: '',
            email: '',
            password: '',
            password2: '',
            firstname: '',
            lastname: '',
            pseudo: ''
        }
    })
    const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {

        data.password === data.password2 ? onFinish(data) : onFinishFailed('les deux mots de passe doivent être les mêmes! ')
        onFinish(data)
    }
    return (


        <Form
            // onSubmit={handleSubmit(onSubmit)}
            size="large"
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit(onSubmit)}
            onFinishFailed={onFinishFailed}
            autoComplete="off"

        >
            <Col ><strong>
                <h1 css={css`text-align:center;
                letter-spacing: .5rem;
                text-transform: uppercase;
                width: 100%;
                color: #777673;
                padding: 6px 10px;`}>Inscription</h1>
            </strong>
            </Col>
            <label htmlFor="email" css={css`padding-left:10px;`}>
                {/* <strong>votre email :</strong> */}
                {errors.email && "L'Email Est Requis!"}
            </label>
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
                        {...register("email", { required: true })}
                        {...field}
                        placeholder="entrez votre email"
                        css={css`border-radius: 4px;
                    box-sizing: border-box;
                    display: block;
                    font-size: .9rem;
                    margin-bottom: 30px;
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
            <label htmlFor="firstname" css={css`padding-left:10px;`}>
                <strong>votre prénom :</strong>
            </label>
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
                    margin-bottom: 30px;
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
            <label htmlFor="lastname" css={css`padding-left:10px;`}>
                <strong>votre nom :</strong>
            </label>
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
                        margin-bottom: 30px;
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
            <label htmlFor="pseudo" css={css`padding-left:10px;`}>
                <strong>votre Pseudonyme :</strong>
            </label>
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
                        margin-bottom: 30px;
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
            <label htmlFor="password" css={css`padding-left:10px;`}>
                <strong>Votre mot de passe :</strong>
                {errors.password && "Le Mot De Passe Est Requis!"}
            </label>
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
                render={({ field }) => <Input.Password

                    {...register("password", { required: true })}
                    placeholder="Entrez Votre Mot De Passe"
                    type={"password"}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    {...field}
                    css={css`border-radius: 4px;
                    box-sizing: border-box;
                    display: flex;
                    font-size: .9rem;
                    margin-bottom: 30px;
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
            <label htmlFor="password2" css={css`padding-left:10px;`}>
                <strong> Entrez-le une seconde fois :</strong>
                {errors.password2 && "Le 2me Mot De Passe Est Requis!"}
            </label>
            <Controller
                name="password2"
                control={control}
                render={({ field }) =>
                    <Input.Password
                        {...register("password2", { required: true })}
                        placeholder="Vérification De Votre Mot De Passe"
                        type={"password"}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        {...field}
                        css={css`border-radius: 4px;
                    box-sizing: border-box;
                    display: flex;
                    font-size: .9rem;
                    margin-bottom: 30px;
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
                Valider
            </Button>
        </Form>

    )
}
