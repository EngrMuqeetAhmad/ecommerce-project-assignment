import { FC, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPE } from '../../../types/toast.types';
import { ShippingAddressInput } from '../../../types/shippingAddress';
import { ShippingAddressInputSchema } from '../../../schema/shippingAddress';
import { ShippingAddressServices } from '../../../services/shippingAddress.service';
import { ToastComponent } from '../../Toast/Toast';

export const AddShippingAddress: FC = () => {
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
  } = useForm<ShippingAddressInput>({
    resolver: zodResolver(ShippingAddressInputSchema),
    mode: 'all',
  });

  const onSubmit = (data: ShippingAddressInput) => {
    const { addressLine1, addressLine2, postalCode, region, country, city } =
      data;

    if (
      addressLine1 != '' &&
      addressLine2 != '' &&
      postalCode != '' &&
      region != '' &&
      country != '' &&
      city != ''
    ) {
      ShippingAddressServices.CreateShippingAddress(data)
        .then(async () => {
          setToast({
            message: `Shipping Address Added`,
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
    // else {
    //   setToast({
    //     message: `Nothing to Update`,
    //     open: true,
    //     type: TYPE.DANGER,
    //   });
    // }
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
            <Form.Label>Address Line 1:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.addressLine1 && !errors.addressLine1}
              isInvalid={touchedFields.addressLine1 && !!errors.addressLine1}
              {...register('addressLine1')}
              className="border-black text-capitalize"
            />
            {errors.addressLine1 && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.addressLine1.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="position-relative">
            <Form.Label>Address Line 2:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.addressLine2 && !errors.addressLine2}
              isInvalid={touchedFields.addressLine2 && !!errors.addressLine2}
              {...register('addressLine2')}
              className="border-black text-capitalize"
            />
            {errors.addressLine2 && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.addressLine2.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.city && !errors.city}
              isInvalid={touchedFields.city && !!errors.city}
              {...register('city')}
              className="border-black text-capitalize"
            />
            {errors.city && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.city.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>Region:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.region && !errors.region}
              isInvalid={touchedFields.region && !!errors.region}
              {...register('region')}
              className="border-black text-capitalize"
            />
            {errors.region && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.region.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.country && !errors.country}
              isInvalid={touchedFields.country && !!errors.country}
              {...register('country')}
              className="border-black text-capitalize"
            />
            {errors.country && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.country.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="position-relative">
            <Form.Label>Postal Code:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.postalCode && !errors.postalCode}
              isInvalid={touchedFields.postalCode && !!errors.postalCode}
              {...register('postalCode')}
              className="border-black text-capitalize"
            />
            {errors.postalCode && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.postalCode.message}
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
