import { FC } from 'react';
import Test from '../../assets/images/test2.jpg';
import { Carousel } from 'react-bootstrap';

export const Crousel: FC = () => {
  return (
    <>
      <Carousel variant="dark" className="d-none d-md-block ">
        {Array.from({ length: 4 }).map(() => (
          <Carousel.Item interval={1500}>
            <img src={Test} className="d-block w-100" alt="" />
            <Carousel.Caption
              className="text-white rounded"
              style={{ backgroundColor: ' rgba(0, 0, 0, 0.4)' }}
            >
              <h3>Shir</h3>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Aspernatur, obcaecati nostrum necessitatibus dolorem quis
                repellendus dignissimos ipsam doloremque quas! Dolorem commodi,
                quas minima aperiam dolores quibusdam maiores provident adipisci
                ea.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};
