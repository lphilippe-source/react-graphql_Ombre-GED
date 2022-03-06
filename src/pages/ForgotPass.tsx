/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Col, Grid, Row } from "../css/style"
import { FC } from "react"
import { HeaderComponent } from "../Components/HeaderComponent/HeaderComponent"
import { ForgotPassComponent } from "../Components/ForgotPassComponent/ForgotPassComponent"
interface IForgotPassProps {
    route: string
}

export const ForgotPass: FC<IForgotPassProps> = ({ route }) => {
    return (
        <Grid>
            <Row size={0}>
                <HeaderComponent route={{
                    path: '/forgotpass',
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
                    <ForgotPassComponent />
                </Row>
            </Row>
        </Grid>
    )
    // align-items: center;
    // justify-content: center;
}
