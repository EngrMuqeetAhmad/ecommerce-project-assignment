import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, Button } from 'react-bootstrap';
import { TYPE } from '../../../types/toast.types';
import { ToastComponent } from '../../Toast/Toast';
import { z } from 'zod';
import { VariationServices } from '../../../services/variation.service';

// Define Zod schema for validation
const schema = z.object({
  variationTypeValue: z.string(),
  typeId: z.string(),
});

type Types = z.infer<typeof schema>;
export const VariationTypeValueForm = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    VariationServices.getAllVariationTypes()
      .then((response: any) => {
        setData(response?.data?.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

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
    const processedData = {
      ...data,
      typeId: Number(data.typeId),
    };

    VariationServices.AddVariationTypeValue(processedData)
      .then((response) => {
        setToast({
          message: `varitaion type value Added`,
          open: true,
          type: TYPE.SUCCESS,
        });
        
      })
      .then((error: any) => {
        if (error?.response) {
          setToast({
            message: `${error?.response?.data?.error}`,
            open: true,
            type: TYPE.DANGER,
          });
        } else if (error?.request) {
          setToast({
            message: `${error?.response}`,
            open: true,
            type: TYPE.DANGER,
          });
        }
      });
    // Process form data
    console.log(processedData);
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
        <Form.Group controlId="category">
          <Form.Label>Variation Type:</Form.Label>

          <Form.Select {...register('typeId')} aria-label="">
            <option>select Variation Type</option>
            {data?.map((item: any) => (
              <option key={item?.id} value={item?.id}>
                {item?.variationType}
              </option>
            ))}
          </Form.Select>
          {/* <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>Type Value:</Form.Label>
          <Form.Control
            type="text"
            isValid={
              touchedFields.variationTypeValue && !errors.variationTypeValue
            }
            isInvalid={
              touchedFields.variationTypeValue && !!errors.variationTypeValue
            }
            {...register('variationTypeValue')}
            className="border-black "
          />
          {errors.variationTypeValue && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.variationTypeValue.message}
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
