import { FC, useContext, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserLoginTypes } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseProduct, UserLoginSchema } from '../../schema';
import Feedback from 'react-bootstrap/Feedback';
import { UserContext } from '../../state/user/user.context';
import { UserServices } from '../../services/user.service';
import { ActionType } from '../../state/user/user.actions';

import { useNavigate } from 'react-router-dom';

import { ToastComponent } from '../../components/Toast/Toast';
import { TYPE } from '../../types/toast.types';
import { BaseProductTypes } from '../../types/product.types';
import { DasboardServices } from '../../services/dashboard.service';

export const CreateBaseProduct = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<BaseProductTypes>({
    resolver: zodResolver(BaseProduct),
    mode: 'all',
  });

  const onSubmit = async (data: BaseProductTypes) => {
    const { title, description, basePrice, subCategory, brand } = data;
    let price = Number(basePrice);

    if (
      title != '' &&
      description != '' &&
      price > 0 &&
      subCategory != '' &&
      brand != ''
    ) {
      await DasboardServices.CreateBaseProduct(data)
        .then(async (response) => {
          setToast({
            message: `${response?.status}`,
            open: true,
            type: TYPE.SUCCESS,
          });
        })
        .catch((error) => {
          console.log('erro', error);
          if (error.response) {
            setToast({
              message: `${error?.response?.data?.error}`,
              open: true,
              type: TYPE.DANGER,
            });
          } else if (error.request) {
            setToast({
              message: `${error?.response}`,
              open: true,
              type: TYPE.DANGER,
            });
          }
        });
    } else {
      console.log('hello there');
    }
  };
  return (
    <>
      <ToastComponent
        isOpen={toast.open}
        setIsOpen={setToast}
        type={toast.type}
        message={toast.message}
      />
      <Container fluid>
        <Row className="justify-content-center mb-4 mt-3">
          <Col xs="auto">
            <h1 className="display-6">create base product</h1>
          </Col>
        </Row>
        <Col
          xs={12}
          md={{ span: 6, offset: 3 }}
          className="shadow p-5 border border-light rounded-4"
        >
          <Form
            noValidate
            className="d-grid gap-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup className="position-relative">
              <FloatingLabel label="title">
                <FormControl
                  type="text"
                  isValid={touchedFields.title && !errors.title}
                  isInvalid={touchedFields.title && !!errors.title}
                  {...register('title')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.title?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="position-relative">
              <FloatingLabel label="description">
                <FormControl
                  type="text"
                  isValid={touchedFields.description && !errors.description}
                  isInvalid={touchedFields.description && !!errors.description}
                  {...register('description')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.description?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="position-relative">
              <FloatingLabel label="basePrice">
                <FormControl
                  type="number"
                  isValid={touchedFields.basePrice && !errors.basePrice}
                  isInvalid={touchedFields.basePrice && !!errors.basePrice}
                  {...register('basePrice')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.basePrice?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="position-relative">
              <FloatingLabel label="subCategory">
                <FormControl
                  type="text"
                  isValid={touchedFields.subCategory && !errors.subCategory}
                  isInvalid={touchedFields.subCategory && !!errors.subCategory}
                  {...register('subCategory')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.subCategory?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="position-relative">
              <FloatingLabel label="rband">
                <FormControl
                  type="text"
                  isValid={touchedFields.brand && !errors.brand}
                  isInvalid={touchedFields.brand && !!errors.brand}
                  {...register('brand')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.brand?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>
            <div className="d-grid gap-3">
              <Button
                variant="dark"
                type="submit"
                size="lg"
                className="mt-2"
                // disabled={!isValid}
              >
                create BaseProduct
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
    </>
  );
};
