import { FC } from "react"
import { Col, Grid, Row } from "../css/style"
import { MainComponent } from "../MainComponent/MainComponent"
interface IMainProps { };

export const Main: FC<IMainProps> = (props) => {
    return (
        <Grid>

            <Row grow={1}>
                <Col size={0}>
                    <MainComponent />
                </Col>
            </Row>

        </Grid>
    )
}