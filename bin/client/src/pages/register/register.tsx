import { FC, useState } from 'react';
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
import { UserRegisterTypes } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegisterSchema } from '../../schema';
import Feedback from 'react-bootstrap/Feedback';
import { UserServices } from '../../services/user.service';
import { ToastComponent } from '../../components/Toast/Toast';
import { TYPE } from '../../types/toast.types';

export const Register: FC = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,
    type: TYPE.DANGER,
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<UserRegisterTypes>({
    resolver: zodResolver(UserRegisterSchema),
    mode: 'all',
  });

  const onSubmit = async (data: UserRegisterTypes) => {
    if (
      data.firstName != '' &&
      data.secondName != '' &&
      data.email != '' &&
      data.password != ''
    ) {
      await UserServices.RegisterUser(data)
        .then(() => {
          setToast({
            message: `Verify your Email`,
            open: true,
            type: TYPE.SUCCESS,
          });
          reset();
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
            <h1 className="display-6">Create Your Account</h1>
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
            <FormGroup as={Row}>
              <Col xs={12} md={6} className="position-relative">
                <FloatingLabel label="First Name">
                  <FormControl
                    type="text"
                    isValid={touchedFields.firstName && !errors.firstName}
                    isInvalid={touchedFields.firstName && !!errors.firstName}
                    {...register('firstName')}
                    className="border-black"
                  />
                  <Feedback type="invalid" tooltip>
                    {errors.firstName?.message}
                  </Feedback>
                </FloatingLabel>
              </Col>
              <Col xs={12} md={6} className="position-relative">
                <FloatingLabel label="Second Name">
                  <FormControl
                    type="text"
                    isValid={touchedFields.secondName && !errors.secondName}
                    isInvalid={touchedFields.secondName && !!errors.secondName}
                    {...register('secondName')}
                    className="border-black"
                  />
                  <Feedback type="invalid" tooltip>
                    {errors.secondName?.message}
                  </Feedback>
                </FloatingLabel>
              </Col>
            </FormGroup>
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
            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                size="lg"
                className="mt-2"
                disabled={!isValid}
              >
                Create Account
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
    </>
  );
};
