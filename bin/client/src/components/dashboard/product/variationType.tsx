import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, Button } from 'react-bootstrap';
import { TYPE } from '../../../types/toast.types';
import { ToastComponent } from '../../Toast/Toast';
import { z } from 'zod';
import { VariationServices } from '../../../services/variation.service';

// Define Zod schema for validation
const schema = z.object({
  variationType: z.string(),
});

type Types = z.infer<typeof schema>;
export const VariationTypeForm = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });

  const {
    handleSubmit,
    register,
    reset,

    formState: { errors, touchedFields },
  } = useForm<Types>({
    resolver: zodResolver(schema),
    mode: 'all',
  });

  // Watch for category changes
  // const category = watch('category');

  const onSubmit = (data: any) => {
    VariationServices.AddVariationType(data)
      .then((response) => {
        setToast({
          message: `product varitaion Added`,
          open: true,
          type: TYPE.SUCCESS,
        });
        reset();
      })
      .then((error: any) => {
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
    // Process form data
    console.log(data);
  };

  return (
    <div className="container mt-4">
      <ToastComponent
        isOpen={toast.open}
        setIsOpen={setToast}
        type={toast.type}
        message={toast.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="position-relative">
          <Form.Label>variationType:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.variationType && !errors.variationType}
            isInvalid={touchedFields.variationType && !!errors.variationType}
            {...register('variationType')}
            className="border-black "
          />
          {errors.variationType && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.variationType.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
