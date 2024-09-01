import { FC, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Row,
  Spinner,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ResetPasswordType } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '../../schema';
import Feedback from 'react-bootstrap/Feedback';
import { ToastComponent } from '../../components/Toast/Toast';
import { TYPE } from '../../types/toast.types';

export const ChangePassword: FC = () => {
  const [valid, setValid]: [valid: boolean | undefined, setValid: any] =
    useState(undefined);
  const [loading, setLoading]: [loading: boolean, setLoading: any] =
    useState(true);
  const [showToast, setShowToast]: [showToast: boolean, setShowToast: any] =
    useState(false);

  useEffect(() => {
    // setLoading(true);
    console.log('first', valid);
    setTimeout(() => {
      console.log('wait');
      setValid(false);
      setLoading(false);
    }, 5000);
    console.log('last', valid);
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'all',
  });

  const onSubmit = async (data: ResetPasswordType) => {
    // if (data.firstName != "" || data.secondName != "" || data.email != "" || data.confirm != "") {
    //     //
    // }

    setShowToast(true);
    console.log('success', data);
    reset();
  };
  return (
    <>
      <ToastComponent
        isOpen={showToast}
        setIsOpen={setShowToast}
        type={TYPE.SUCCESS}
        message="This is success message"
      />
      <Container fluid>
        <Row className="justify-content-center mb-4 mt-3">
          <Col xs="auto">
            <h1 className="display-6">Reset Password</h1>
          </Col>
        </Row>

        <Col
          xs={12}
          md={{ span: 6, offset: 3 }}
          className="shadow p-5 border border-light rounded-4"
        >
          {loading == true ? (
            <>
              <div className="d-flex w-100 justify-content-center align-items-center">
                <Spinner animation="grow" variant="primary" />
              </div>
            </>
          ) : (
            <>
              {valid == true ? (
                <>
                  <Form
                    noValidate
                    className="d-grid gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <FormGroup className="position-relative">
                      <FloatingLabel label="Password">
                        <FormControl
                          type="password"
                          isValid={touchedFields.password && !errors.password}
                          isInvalid={
                            touchedFields.password && !!errors.password
                          }
                          {...register('password')}
                          className="border-black"
                        />
                        <Feedback type="invalid" tooltip>
                          {errors.password?.message}
                        </Feedback>
                      </FloatingLabel>
                    </FormGroup>
                    <FormGroup className="position-relative">
                      <FloatingLabel label="Confirm Password">
                        <FormControl
                          type="password"
                          isValid={
                            touchedFields.confirmPassword &&
                            !errors.confirmPassword
                          }
                          isInvalid={
                            touchedFields.confirmPassword &&
                            !!errors.confirmPassword
                          }
                          {...register('confirmPassword')}
                          className="border-black"
                        />
                        <Feedback type="invalid" tooltip>
                          {errors.confirmPassword?.message}
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
                        Reset
                      </Button>
                    </div>
                  </Form>
                </>
              ) : (
                <>
                  <div className="d-flex w-100 justify-content-center align-items-center">
                    <span className="text-danger h4">
                      Error Validating Link
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </Col>
      </Container>
    </>
  );
};
