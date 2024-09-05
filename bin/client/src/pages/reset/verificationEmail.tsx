import { FC, useState } from 'react';
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormGroup,
  Stack,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { EmailType } from '../../types';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailSchema } from '../../schema';
import Feedback from 'react-bootstrap/Feedback';
import { TYPE } from '../../types/toast.types';
import { AxiosResponse } from 'axios';
import { UserServices } from '../../services/user.service';
import { ToastComponent } from '../../components/Toast/Toast';

export const VerificationEmail: FC = () => {
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
  } = useForm<EmailType>({
    resolver: zodResolver(EmailSchema),
    mode: 'all',
  });

  const onSubmit = async (data: EmailType): Promise<void> => {
    if (data.email != '') {
      const res: AxiosResponse = await UserServices.EmailVerification(
        data.email
      );
      if (res.status == 200) {
        setToast({
          message: 'Check your mail box',
          open: true,
          type: TYPE.SUCCESS,
          
        });
        reset();
      } else {
        setToast({
          message: 'error',
          open: true,
          type: TYPE.DANGER,
          
        });
      }
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
        <Stack className="gap-0 align-items-center justify-content-center mb-4 mt-3">
          <h1 className="display-6">Enter Your Email</h1>
          <small className="">We will send you verification link</small>
        </Stack>
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

            <div className="d-grid gap-3">
              <Button
                variant={'dark'}
                type="submit"
                size="lg"
                className="mt-2"
                disabled={!isValid}
              >
                Send Link
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
    </>
  );
};
