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
import { UserLoginSchema } from '../../schema';
import Feedback from 'react-bootstrap/Feedback';
import { UserContext } from '../../state/user/user.context';
import { UserServices } from '../../services/user.service';
import { ActionType } from '../../state/user/user.actions';

import { useNavigate } from 'react-router-dom';

import { ToastComponent } from '../../components/Toast/Toast';
import { TYPE } from '../../types/toast.types';

export const LogIn: FC = () => {
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
  } = useForm<UserLoginTypes>({
    resolver: zodResolver(UserLoginSchema),
    mode: 'all',
  });

  const onSubmit = async (data: UserLoginTypes) => {
    const { email, password } = data;

    if (email != '' && password != '') {
      await UserServices.Login(email, password)
        .then(async () => {
          await UserServices.GetUser()
            .then((response) => {
              dispatch({
                type: ActionType.SetUser,
                payload: {
                  user: response?.data?.data,
                },
              });
              localStorage.setItem(
                'user',
                JSON.stringify(response?.data?.data)
              );
              setToast({
                message: `User logged in`,
                open: true,
                type: TYPE.SUCCESS,
              });
              reset();
              navigate('/');
            })
            .catch((error) => {
              if (error.response) {
                setToast({
                  message: `${error?.response?.data?.error + error?.status}`,
                  open: true,
                  type: TYPE.DANGER,
                });
              } else if (error.request) {
                setToast({
                  message: `${error?.statusText + error.state}`,
                  open: true,
                  type: TYPE.DANGER,
                });
              }
            });
        })
        .catch((error) => {
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
            <h1 className="display-6">LogIn</h1>
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
              <FloatingLabel label="Email">
                <FormControl
                  type="email"
                  isValid={touchedFields.email && !errors.email}
                  isInvalid={touchedFields.email && !!errors.email}
                  {...register('email')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.email?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>
            <FormGroup className="position-relative">
              <FloatingLabel label="Password">
                <FormControl
                  type="password"
                  isValid={touchedFields.password && !errors.password}
                  isInvalid={touchedFields.password && !!errors.password}
                  {...register('password')}
                  className="border-black"
                />
                <Feedback type="invalid" tooltip>
                  {errors.password?.message}
                </Feedback>
              </FloatingLabel>
            </FormGroup>

            <div className="d-grid gap-3">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="mt-2"
                disabled={!isValid}
              >
                LogIn
              </Button>
              <hr />

              <Button
                variant="link"
                onClick={() => navigate('/reset')}
                type="button"
                className="p-0"
              >
                forgot password?
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
    </>
  );
};
