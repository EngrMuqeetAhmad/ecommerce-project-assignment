import React, { FC } from "react";
import { Container } from "react-bootstrap";
import { Product } from "./porduct";


export const ProductPage: FC = () => {
    return (
        <>
            <Container className="p-2" >
                <br />
                <br />
                <Product />
            </Container>
        </>
    )
}