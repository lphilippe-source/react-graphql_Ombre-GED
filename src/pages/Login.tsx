/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Col, Grid, Row } from "../css/style"
import { FC } from "react";
import { LoginComponent } from "../Components/LoginComponent/LoginComponent";
import { HeaderComponent } from "../Components/HeaderComponent/HeaderComponent";
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
                    align-items: self-start;

                    margin:auto;
                    `}>
                <Row size={1} direction="column"
                >
                    <LoginComponent />
                </Row>
            </Row>

        </Grid>
    )
    // align-items: center;
    // justify-content: center;
}
