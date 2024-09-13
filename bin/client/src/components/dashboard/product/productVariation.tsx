import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form, Button } from 'react-bootstrap';
import { ProductServices } from '../../../services/product.service';
import { TYPE } from '../../../types/toast.types';
import { ToastComponent } from '../../Toast/Toast';
import { z } from 'zod';
import { VariationServices } from '../../../services/variation.service';

// Define Zod schema for validation
const schema = z.object({
  productId: z.string(),
  stockQuantity: z.string(),
  additionPrice: z.string(),
  variationTypeValueIds: z.array(z.string()),
});

type Types = z.infer<typeof schema>;
export const ProductVariationForm = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });
  const [baseProducts, setBaseProducts] = useState([]);
  const [variationTypeAndValues, setVariationTypeAndValues] = useState([]);

  useEffect(() => {
    if (baseProducts.length == 0) {
      ProductServices.getAllBaseProducts()
        .then((response: any) => {
          setBaseProducts(response?.data?.data);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }

    VariationServices.getAllVariationTypesWithAssociated()
      .then((response: any) => {
        console.log(response);
        setVariationTypeAndValues(response?.data?.data);
        console.log(variationTypeAndValues);
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

  // Watch for category changes
  // const category = watch('category');

  const onSubmit = (data: any) => {
    const processedData = {
      ...data,
      productId: Number(data.productId),
      stockQuantity: Number(data.stockQuantity),
      additionPrice: Number(data.additionPrice),
      variationTypeValueIds: data.variationTypeValueIds.map((item: string) =>
        Number(item)
      ),
    };

    ProductServices.AddProductVariation(processedData)
      .then((response) => {
        setToast({
          message: `product varitaion Added`,
          open: true,
          type: TYPE.SUCCESS,
        });
        reset();
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
        <Form.Group>
          <Form.Label>Base Product:</Form.Label>

          <Form.Select {...register('productId')} aria-label="">
            <option>select base Product</option>
            {baseProducts?.map((item: any) => (
              <option key={item?.id} value={item?.id}>
                {item?.title}
              </option>
            ))}
          </Form.Select>
          {/* <Form.Control.Feedback type="invalid">
            {errors.categoryId?.message}
          </Form.Control.Feedback> */}
        </Form.Group>

        <Form.Group>
          <Form.Label>Select Values</Form.Label>
          <div>
            {variationTypeAndValues?.map((types: any) => (
              <>
                <div key={types.id}>{types.variationType}</div>
                {types.VariationTypeValueModels.map((value: any) => (
                  <Form.Check
                    key={value.id}
                    type="checkbox"
                    id={`checkbox-${value.id}`}
                    label={value.variationTypeValue}
                    value={value.id}
                    {...register('variationTypeValueIds')}
                  />
                ))}
              </>
            ))}
          </div>
          {errors.variationTypeValueIds && (
            <Form.Text className="text-danger">
              {errors.variationTypeValueIds.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>stockQuantity:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.stockQuantity && !errors.stockQuantity}
            isInvalid={touchedFields.stockQuantity && !!errors.stockQuantity}
            {...register('stockQuantity')}
            className="border-black "
          />
          {errors.stockQuantity && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.stockQuantity.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="position-relative">
          <Form.Label>additionPrice:</Form.Label>
          <Form.Control
            type="text"
            isValid={touchedFields.additionPrice && !errors.additionPrice}
            isInvalid={touchedFields.additionPrice && !!errors.additionPrice}
            {...register('additionPrice')}
            className="border-black "
          />
          {errors.additionPrice && (
            <Form.Control.Feedback type="invalid" tooltip>
              {errors.additionPrice.message}
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
