import { FC, useState } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TYPE } from '../../../types/toast.types';
import {
  ShippingAddressInput,
  ShippingAddressTypes,
} from '../../../types/shippingAddress';
import { ShippingAddressInputSchema } from '../../../schema/shippingAddress';
import { ShippingAddressServices } from '../../../services/shippingAddress.service';
import { ToastComponent } from '../../Toast/Toast';

export const ShippingAddress: FC<{
  data: ShippingAddressTypes;
}> = ({ data }) => {
  const {
    ID,
    addressLine1,
    addressLine2,
    region,
    country,
    city,
    postalCode,
    userID,
    createdAt,
    updatedAt,
  } = data;

  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<ShippingAddressInput>({
    resolver: zodResolver(ShippingAddressInputSchema),
    mode: 'all',
  });

  const onSubmit = (data: ShippingAddressInput) => {
    const { addressLine1, addressLine2, postalCode, region, country, city } =
      data;

    console.log(data, ID);

    if (
      addressLine1 != '' &&
      addressLine2 != '' &&
      postalCode != '' &&
      region != '' &&
      country != '' &&
      city != ''
    ) {
      ShippingAddressServices.UpdateShippingAddress(data, ID)
        .then(async () => {
          setToast({
            message: `Shipping Address Updated`,
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

      setIsReadOnly(true);
    } else {
      setToast({
        message: `Nothing to Update`,
        open: true,
        type: TYPE.DANGER,
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
      <Container>
        <Form
          noValidate
          className="d-grid gap-3 text-capitalize"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="position-relative">
            <Form.Label>Address Line 1:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.addressLine1 && !errors.addressLine1}
              isInvalid={touchedFields.addressLine1 && !!errors.addressLine1}
              {...register('addressLine1')}
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={addressLine1}
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
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={addressLine2}
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
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={city}
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
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={region}
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
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={country}
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
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={postalCode}
            />
            {errors.postalCode && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.postalCode.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {/* Edit and Save Buttons */}
          <div className="d-grid gap-3">
            {isReadOnly ? (
              <Button variant="primary" onClick={() => setIsReadOnly(false)}>
                Edit
              </Button>
            ) : (
              <>
                <Stack direction="vertical" gap={2}>
                  <Button
                    variant="oultine-dark"
                    onClick={() => setIsReadOnly(true)}
                  >
                    Cancel
                  </Button>
                  <Button variant="success" disabled={!isValid} type="submit">
                    Save
                  </Button>
                </Stack>
              </>
            )}
          </div>
        </Form>
      </Container>
    </>
  );
};
