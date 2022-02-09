/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Col, Grid, Row } from "../css/style"
import { FC } from "react";
import { LoginComponent } from "../LoginComponent/LoginComponent";
import { HeaderComponent } from "../HeaderComponent/HeaderComponent";
interface ILoginProps {
    route: string
}

export const Login: FC<ILoginProps> = ({ route }) => {
    return (
        <Grid>
            <Row size={0}>
                <HeaderComponent route={{
                    path: '/login',
                    breadcrumbName: route,
                }} />
            </Row>
            <Row size={4} css={css`
                    background-color:#252829;
                    align-items: center;
                    justify-content: center;
                    margin:auto;
                    `}>
                <Row size={1}
                >
                    <LoginComponent />
                </Row>
            </Row>

        </Grid>
    )
}
