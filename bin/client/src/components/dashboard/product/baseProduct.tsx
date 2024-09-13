import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, Button } from 'react-bootstrap';
import { ProductServices } from '../../../services/product.service';
import { CategoryServices } from '../../../services/category.service';
import { TYPE } from '../../../types/toast.types';
import { ToastComponent } from '../../Toast/Toast';

// Define Zod schema for validation
const schema = z.object({
  title: z.string(),
  description: z.string(),
  basePrice: z.string(),
  category: z.string(),
  subCategoryId: z.string(),
  brand: z.string(),
});

type Types = z.infer<typeof schema>;
const BaseProductForm = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });
  const [data, setData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (selectedCategory == '') {
      CategoryServices.GetCategoriesNSubCategories()
        .then((response: any) => {
          setData(response?.data?.data);
        })
        .catch((error) => {
          console.log('error', error);
        });
    } else {
      const d: any = data.filter(
        (item: any) => item?.category == selectedCategory
      );
      console.log(d[0]?.SubCategories);
      setSubCategories(d[0]?.SubCategories);
    }
  }, [selectedCategory]);

  const {
    handleSubmit,
    register,
    
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
      basePrice: Number(data.basePrice),
      subCategoryId: Number(data.subCategoryId),
    };
    delete processedData.category;
    console.log(processedData);
    ProductServices.AddBaseProduct(processedData)
      .then(() => {
        setToast({
          message: `sub Caategory Added`,
          open: true,
          type: TYPE.SUCCESS,
        });
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
    console.log(processedData);
  };

  const handleCategoryChange = (e: any) => {
    e.preventDefault();
    setSelectedCategory(e.target.value);
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
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.title && !errors.title}
            isInvalid={touchedFields.title && !!errors.title}
            {...register('title')}
            className="border-black "
          />
          {errors.title && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.title.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.description && !errors.description}
            isInvalid={touchedFields.description && !!errors.description}
            {...register('description')}
            className="border-black "
          />
          {errors.description && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.description.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>basePrice:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.basePrice && !errors.basePrice}
            isInvalid={touchedFields.basePrice && !!errors.basePrice}
            {...register('basePrice')}
            className="border-black "
          />
          {errors.basePrice && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.basePrice.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>

          <Form.Select
            {...register('category')}
            aria-label=""
            onChange={handleCategoryChange}
          >
            <option>select Category</option>
            {data.map((item: any) => (
              <option key={item?.id} value={item?.category}>
                {item?.category}
              </option>
            ))}
          </Form.Select>
          {/* <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback> */}
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Sub Category</Form.Label>

          <Form.Select {...register('subCategoryId')} aria-label="">
            <option>select subCategory</option>
            {subCategories.map((item: any) => (
              <option key={item?.id} value={item?.id}>
                {item?.subCategory}
              </option>
            ))}
          </Form.Select>
          {/* <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>brand:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.brand && !errors.brand}
            isInvalid={touchedFields.brand && !!errors.brand}
            {...register('brand')}
            className="border-black "
          />
          {errors.brand && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.brand.message}
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

export default BaseProductForm;
