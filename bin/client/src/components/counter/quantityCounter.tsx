import { FC } from "react";
import { Button } from "react-bootstrap";


export const QuantityCounter: FC<{
    quantity: number;
    setQuantity: any
}> = ({ quantity, setQuantity }) => {
  
    const handleIncrease = () => {
        setQuantity(quantity += 1)
    }
    const handleDecrease = () => {
        setQuantity(quantity -= 1)
    }
    return (
        <>
            <span className="fw-semibold" >Quantity:</span>
            <div className="d-flex justify-content-start align-items-center" >
                <Button variant="outline-dark" disabled={quantity <= 1} onClick={handleDecrease} >
                    -
                </Button>
                <span className="bg-light rounded-sm ps-2 pe-2 p-1" >{quantity}</span>
                <Button variant="outline-dark" onClick={handleIncrease} >
                    +
                </Button>
            </div>

        </>
    )
}