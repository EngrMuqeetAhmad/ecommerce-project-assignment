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
import { useParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { UserServices } from '../../services/user.service';

export const ChangePassword: FC = () => {
  const { token = '' } = useParams();

  const [toast, setToast] = useState({
    message: '',
    open: false,
    setOpen: () => !open,
    type: TYPE.ERROR,
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
    if (token != '' && data.password != '') {
      console.log('rest token', token);
      const response: AxiosResponse = await UserServices.resetPassword(
        token,
        data.password
      );

      if (response.status == 200) {
        setToast({
          message: 'Password Updated Successffully',
          open: true,
          type: TYPE.SUCCESS,
          setOpen: () => !open,
        });

        return;
      } else {
        setToast({
          message: 'unable to update password',
          open: true,
          type: TYPE.ERROR,
          setOpen: () => !open,
        });
      }
    }
  };
  return (
    <>
      <ToastComponent
        isOpen={toast.open}
        setIsOpen={toast.setOpen}
        type={toast.type}
        message={toast.message}
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
                  isInvalid={touchedFields.password && !!errors.password}
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
                    touchedFields.confirmPassword && !errors.confirmPassword
                  }
                  isInvalid={
                    touchedFields.confirmPassword && !!errors.confirmPassword
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
        </Col>
      </Container>
    </>
  );
};
