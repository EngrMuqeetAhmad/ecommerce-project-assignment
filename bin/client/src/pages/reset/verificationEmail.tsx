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

export const VerificationEmail: FC = () => {
  const [success, setSuccess]: [success: boolean | null, setSuccess: any] =
    useState(null);
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
      setTimeout(async () => {
        setSuccess(true);
      }, 3000);
      reset();
      return;
    }
    setSuccess(false);
    console.log('success', data);

    return;
  };
  return (
    <>
      <Container fluid>
        {success == null || success == false ? (
          <>
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
                    variant={success == null ? 'primary' : 'danger'}
                    type="submit"
                    size="lg"
                    className="mt-2"
                    disabled={!isValid}
                  >
                    {success == null && 'Send Link'}
                    {success == false && 'Error - Retry'}
                  </Button>
                </div>
              </Form>
            </Col>
          </>
        ) : (
          <></>
        )}
        {success == true && (
          <>
            <Col
              xs={12}
              md={{ span: 6, offset: 3 }}
              className="d-flex align-items-center justify-content-center shadow p-5 border border-light rounded-4"
            >
              <span className="text-success h4">
                Please check your mail box
              </span>
            </Col>
          </>
        )}
      </Container>
    </>
  );
};
