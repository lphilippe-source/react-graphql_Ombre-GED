/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { FC } from "react";
import { Col, Row } from "../../../css/style";
interface IViewTitleProps { };

export const ViewTitle: FC = () => {
    return (
        <Col grow={1} size={1} ><strong>
            <h1 css={css`text-align:center;
            margin-top:5em;

            margin-bottom:5em;
        letter-spacing: .5rem;
        text-transform: uppercase;
        width: 100%;
        color: #777673;
        padding: 6px 10px;`}>Generation du mot de passe</h1>
        </strong>
        </Col>
    );
}
