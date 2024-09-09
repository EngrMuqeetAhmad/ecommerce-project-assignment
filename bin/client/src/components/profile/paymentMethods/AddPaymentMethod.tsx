import { FC, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PaymentMethodTypes } from '../../../types/paymentMethod.types';
import { PaymentMethodSchema } from '../../../schema/paymentMethod';
import { TYPE } from '../../../types/toast.types';
import { PaymentMethodServices } from '../../../services/paymentMethod.service';
import { ToastComponent } from '../../Toast/Toast';

export const AddPaymentMethod: FC = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<PaymentMethodTypes>({
    resolver: zodResolver(PaymentMethodSchema),
    mode: 'all',
  });

  const onSubmit = (data: PaymentMethodTypes) => {
    const processedData = {
      ...data,
      expMonth: Number(data.expMonth),
      expYear: Number(data.expYear),
      cvc: Number(data.cvc),
    };
    console.log(processedData);
    PaymentMethodServices.CreatePaymentMethod(processedData)
      .then(async () => {
        setToast({
          message: `Payment Method Added`,
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
  };

  return (
    <>
      <ToastComponent
        isOpen={toast.open}
        setIsOpen={setToast}
        type={toast.type}
        message={toast.message}
      />
      <Container>
        <Form
          noValidate
          className="d-grid gap-5 text-capitalize"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="position-relative">
            <Form.Label>Card Number:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.cardNumber && !errors.cardNumber}
              isInvalid={touchedFields.cardNumber && !!errors.cardNumber}
              {...register('cardNumber')}
              className="border-black text-capitalize"
              placeholder="---- ---- ---- ----"
            />
            {errors.cardNumber && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.cardNumber.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.fullName && !errors.fullName}
              isInvalid={touchedFields.fullName && !!errors.fullName}
              {...register('fullName')}
              className="border-black text-capitalize"
            />
            {errors.fullName && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.fullName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>expiry month (format: 01-12)</Form.Label>
            <Form.Control
              type="number"
              isValid={touchedFields.expMonth && !errors.expMonth}
              isInvalid={touchedFields.expMonth && !!errors.expMonth}
              {...register('expMonth')}
              className="border-black text-capitalize"
            />
            {errors.expMonth && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.expMonth.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>expYear: (format: 2025)</Form.Label>
            <Form.Control
              type="number"
              isValid={touchedFields.expYear && !errors.expYear}
              isInvalid={touchedFields.expYear && !!errors.expYear}
              {...register('expYear')}
              className="border-black text-capitalize"
            />
            {errors.expYear && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.expYear.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>cvc</Form.Label>
            <Form.Control
              type="number"
              isValid={touchedFields.cvc && !errors.cvc}
              isInvalid={touchedFields.cvc && !!errors.cvc}
              {...register('cvc')}
              className="border-black text-capitalize"
            />
            {errors.cvc && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.cvc.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Edit and Save Buttons */}
          <div className="d-grid gap-3">
            <Button variant="success" type="submit">
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};
