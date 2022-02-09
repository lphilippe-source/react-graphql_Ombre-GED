/** @jsxRuntime classic */
/** @jsx jsx */
import { css,jsx } from "@emotion/react"
import { FC } from "react"
import { Col, Row } from "../../css/style"
import { UsersDTO } from "../MainLogic"

interface IToken {
    token: string,
    data: UsersDTO
}

export const ViewMainComponent: FC<IToken> = ({ token, data }) => {
    console.log(data.users)
    return (
        <Row size={1} direction="column">{
            data.users.map((user) =>

                <Row size={1} css={css`border-radius: 4px;
                                font-size: 14px;
                                margin: 20px 0;
                                border: 1px solid #e22063;
                                text-align: center;
                                padding: 10px 0;`}
                    key={user.id}>
                    <Col grow={1}>{user.pseudo}</Col>
                    <Col size={1}>{user.email}</Col>
                </Row>
            )}
        </Row>
    )
}
