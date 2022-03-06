import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import {
  ApolloProvider
} from "@apollo/client"

import { Login } from "../pages/Login"
import { Main } from "../pages/Main"
import { SignUp } from "../pages/SignUp"
import { ForgotPass } from "../pages/ForgotPass"
import { client } from "./appConfig"

interface UserConnectedDTO {
  __typename: string,
  id: number,
  email: string,
  token: string
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login route="Login" />} />
          <Route path="/forgotpass" element={<ForgotPass route="ForgotPass" />} />
          <Route path="/" element={<Main route="Home" />} />
          <Route path="/signup" element={<SignUp route="Signup" />} />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
