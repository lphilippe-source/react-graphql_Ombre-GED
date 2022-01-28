import {  Col, Grid, Row } from "./css/style"
import { LoginComponent } from "./LoginComponent/LoginComponent";

function App() {
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
        <Col size={0}>
          <LoginComponent/>
        </Col>
      </Row>
    </Grid>
  )
}

export default App;
