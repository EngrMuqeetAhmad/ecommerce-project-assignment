import { FC } from "react";
import { Form, Stack } from "react-bootstrap";
import { VariationType } from "../../../types/product.types";


export const FormSelect: FC<VariationType> = ({ variations }) => {
    return (
        <>
            <Form>
                <Stack direction="vertical" gap={3} >
                    {
                        variations.map(({ name, values }) => (
                            <span>
                                <Form.Label className="fw-semibold" >{name}</Form.Label>
                                <Form.Select size="sm" >
                                    {
                                        values.map(value => (
                                            <option value={value} >{value}</option>
                                        ))
                                    }
                                </Form.Select>
                            </span>
                        ))
                    }
                </Stack>
            </Form>
        </>
    )
}