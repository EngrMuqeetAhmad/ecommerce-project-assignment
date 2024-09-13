import { FC, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { CategorySchema } from '../../../schema/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastComponent } from '../../Toast/Toast';
import { CategoryServices } from '../../../services/category.service';
import { CategoryTypes } from '../../../types/category';
import { TYPE } from '../../../types/toast.types';

export const AddCategory: FC = () => {
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
  } = useForm<CategoryTypes>({
    resolver: zodResolver(CategorySchema),
    mode: 'all',
  });

  const onSubmit = (data: CategoryTypes) => {
    CategoryServices.AddCategory(data)
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
          className="d-grid gap-5 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="position-relative">
            <Form.Label>Category Name:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.category && !errors.category}
              isInvalid={touchedFields.category && !!errors.category}
              {...register('category')}
              className="border-black "
             
            />
            {errors.category && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.category.message}
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
