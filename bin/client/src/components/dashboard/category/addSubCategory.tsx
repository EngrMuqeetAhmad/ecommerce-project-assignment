import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, Button } from 'react-bootstrap';
import { CategoryServices } from '../../../services/category.service';
import { ToastComponent } from '../../Toast/Toast';
import { TYPE } from '../../../types/toast.types';

// Define Zod schema for validation
const schema = z.object({
  categoryId: z.string(),
  subCategory: z.string(),
});

type Types = z.infer<typeof schema>;
// Define predefined categories

const AddSubCategory = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    CategoryServices.GetCategoriesNSubCategories()
      .then((response: any) => {
        console.log('respone', response);
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
  });

  // Handle form submission
  const onSubmit = (data: Types) => {
    console.log(data);
    CategoryServices.AddSubCategory(Number(data.categoryId), data.subCategory)
      .then(async () => {
        setToast({
          message: `sub Caategory Added`,
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
    <div className="container mt-4">
      <ToastComponent
        isOpen={toast.open}
        setIsOpen={setToast}
        type={toast.type}
        message={toast.message}
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>

          <Form.Select
            {...register('categoryId')}
            aria-label="Default select example"
          >
            {data.map((item: any) => (
              <option key={item?.id} value={item?.id}>
                {item?.category}
              </option>
            ))}
          </Form.Select>
          {/* <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>sub Category Name:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.subCategory && !errors.subCategory}
            isInvalid={touchedFields.subCategory && !!errors.subCategory}
            {...register('subCategory')}
            className="border-black "
          />
          {errors.subCategory && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.subCategory.message}
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

export default AddSubCategory;
