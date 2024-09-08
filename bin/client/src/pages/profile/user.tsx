import { FC, useContext, useState } from 'react';
import { Button, Container, Form, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UserOutput, UserUpdate } from '../../types';
import { UserUpdateSchema } from '../../schema';
import { UserServices } from '../../services/user.service';
import { UserContext } from '../../state/user/user.context';
import { ActionType } from '../../state/user/user.actions';
import { TYPE } from '../../types/toast.types';
import { ToastComponent } from '../../components/Toast/Toast';

export const UserContent: FC = () => {
  const [toast, setToast] = useState({
    message: '',
    open: false,

    type: TYPE.DANGER,
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  const user: UserOutput = JSON.parse(`${localStorage.getItem('user')}`);

  const {
    register,
    handleSubmit,

    formState: { errors, touchedFields },
  } = useForm<UserUpdate>({
    resolver: zodResolver(UserUpdateSchema),
    mode: 'all',
  });
  const { dispatch } = useContext(UserContext);
  const onSubmit = (data: UserUpdate) => {
    const { firstName, secondName, role } = data;
    if (
      firstName != user.firstName ||
      secondName != user.secondName ||
      role != user.role
    ) {
      UserServices.UpdateUser(data)
        .then(async () => {
          UserServices.GetUser().then((response) => {
            dispatch({
              type: ActionType.SetUser,
              payload: {
                user: response?.data?.data,
              },
            });
            localStorage.setItem('user', JSON.stringify(response?.data?.data));
            setToast({
              message: `User Updated`,
              open: true,
              type: TYPE.SUCCESS,
            });
          });
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

      setIsReadOnly(true); // Disable edit mode after save
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
          className="d-grid gap-5 text-capitalize"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="position-relative">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.firstName && !errors.firstName}
              isInvalid={touchedFields.firstName && !!errors.firstName}
              {...register('firstName')}
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={user.firstName}
            />
            {errors.firstName && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.firstName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="position-relative">
          <Form.Label>Second Name:</Form.Label>
            <Form.Control
              type="text"
              isValid={touchedFields.secondName && !errors.secondName}
              isInvalid={touchedFields.secondName && !!errors.secondName}
              {...register('secondName')}
              readOnly={isReadOnly}
              className="border-black text-capitalize"
              defaultValue={user.secondName}
            />
            {errors.secondName && (
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.secondName.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="position-relative">
          <Form.Label>Role:</Form.Label>
            <Form.Select
              {...register('role')}
              disabled={isReadOnly}
              className="border-black"
              defaultValue={user.role}
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
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
                  <Button variant="success" type="submit">
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
