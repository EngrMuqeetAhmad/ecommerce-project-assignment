import React, { FC } from 'react';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export const CategoryAndSubCateList: FC<{ data: any }> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <>
      <Row
        xs={1}
        md={3}
        xl={4}
        className="g-2 mb-4 justify-content-center align-items-center"
      >
        {data?.map((categories: any) => (
          <Col key={categories.id}>
            <Card>
              <Card.Header>{categories.category}</Card.Header>
              <Card.Body>
                <ListGroup>
                  {categories.SubCategories.map((subCategories: any) => (
                    <ListGroup.Item
                      onClick={() => {
                        navigate(
                          `/${categories.category}/${subCategories.subCategory}/p`
                        );
                      }}
                      key={subCategories.id}
                      style={{ cursor: 'pointer' }}
                    >
                      {subCategories.subCategory}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
