
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
            <Row grow={1}>
                <Row size={0}>
                    <LoginComponent />
                </Row>
            </Row>

        </Grid>
    )
}
