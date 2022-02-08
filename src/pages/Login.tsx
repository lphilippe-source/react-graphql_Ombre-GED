/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { Col, Grid, Row } from "../css/style"
import { FC } from "react";
import { LoginComponent } from "../LoginComponent/LoginComponent";
interface ILoginProps { };

export const Login: FC<ILoginProps> = (props) => {
    return (
        <Grid>
            <Row>
                <Col size={1}>
                    "coucou"
                </Col>
            </Row>
            <Row>
                <Col size={1}>
                    "hello world"
                </Col>
                <Col size={2}>
                    "bien bien"
                </Col>
            </Row>
            <Row grow={1} css={css`
                    background-color:#252829;`}>
                <Row size={0}>
                    <LoginComponent />
                </Row>
            </Row>

        </Grid>
    )
}
