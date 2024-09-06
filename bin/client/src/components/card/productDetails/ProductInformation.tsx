import { FC } from 'react';
import { Col, Container, Row, Stack, Tab, Tabs } from 'react-bootstrap';
import { ProductInformation } from '../../../types/product.types';
import { VariationTable } from './VariationTable';
import { SimilarProduct } from '../similarProduct';

export const ProductInformaion: FC<ProductInformation> = ({
  description,
  variations,
}) => {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <Container
              style={{ minHeight: '50vh' }}
              className="shadow-sm border-light rounded"
            >
              <Tabs
                defaultActiveKey={'description'}
                className="mb-3 h-100 w-100"
              >
                <Tab eventKey="description" title="Description">
                  <Container>{description}</Container>
                </Tab>
                <Tab eventKey="variations" title="Variations">
                  <Container>
                    <VariationTable variations={variations} />
                  </Container>
                </Tab>
              </Tabs>
            </Container>
          </Col>
          <Col xs={12} md={4}>
            <>
              <Stack direction="vertical" gap={3}>
                {Array.from({ length: 4 }).map(() => (
                  <SimilarProduct />
                ))}
              </Stack>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
};
