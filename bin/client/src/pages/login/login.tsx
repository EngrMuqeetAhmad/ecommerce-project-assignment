import { FC } from 'react';
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

export const LogIn: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<UserLoginTypes>({
    resolver: zodResolver(UserLoginSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: UserLoginTypes) => {
    // if (data.firstName != "" || data.secondName != "" || data.email != "" || data.password != "") {
    //     //
    // }
    console.log('success', data);
    reset();
  };
  return (
    <>
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
                href="/reset"
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
