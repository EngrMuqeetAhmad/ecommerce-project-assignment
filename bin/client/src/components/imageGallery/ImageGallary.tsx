import { FC, useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { ImageType } from '../../types/product.types';

export const ImageGallery: FC<ImageType> = ({ images }) => {
    // State to keep track of the current image index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to handle next image navigation
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to handle previous image navigation
    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <Container className="mt-4">
            {/* Main Image Display */}
            <Row className="justify-content-center">
                <Col xs={12} md={10}>
                    <Image
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        fluid
                        className="mb-3"
                    />
                </Col>
            </Row>

            {/* Thumbnail and Navigation Buttons */}
            <Row>
                <Col xs={12} md={{ span: 10, offset: 1 }} >
                    <Row className="justify-content-center align-items-center">


                        <Col xs={12} md={12} >
                            <Row xs={3} sm={4} md={6} lg={8} xl={12} className="g-1 mb-4 justify-content-center align-items-center">
                                {images.map((image, index) => (
                                    <Col className='d-flex justify-content-center align-items-center' >
                                        <Image
                                            key={index}
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            rounded
                                            onClick={() => setCurrentIndex(index)}
                                            style={{
                                                width: 50,
                                                height: 50,
                                                margin: '0 5px',
                                                cursor: 'pointer',
                                                border: currentIndex === index ? '2px solid blue' : 'none',
                                            }}
                                        />
                                    </Col>

                                ))}
                            </Row>

                        </Col>


                    </Row>
                </Col>
            </Row>


        </Container>
    );
};


