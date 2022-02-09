/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react"
import { FC } from "react"
import { Col, Grid, Row } from "../css/style"
import { HeaderComponent } from "../HeaderComponent/HeaderComponent"
import { MainComponent } from "../MainComponent/MainComponent"
interface IMainProps {
    route: string
}
export const Main: FC<IMainProps> = ({ route }) => {
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
                    <MainComponent />
                </Row>
            </Row>
        </Grid>
    )
}
