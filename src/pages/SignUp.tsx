/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { FC } from "react"
import { Col, Grid, Row } from "../css/style"
import { HeaderComponent } from "../HeaderComponent/HeaderComponent"
import { SignUpComponent } from "../SignUpComponent/SignUpComponent"
interface ISignUpProps {
    route: string
}
export const SignUp: FC<ISignUpProps> = ({ route }) => {
    return (
        <Grid>
            <Row size={0}>
                <HeaderComponent route={{
                    path: '/',
                    breadcrumbName: route,
                }} />
            </Row>
            <Row size={4} css={css`
                    background-color:#252829;`}>
                <Row direction="column" size={1}>
                <SignUpComponent/>
                </Row>
            </Row>
        </Grid>
    )
}
