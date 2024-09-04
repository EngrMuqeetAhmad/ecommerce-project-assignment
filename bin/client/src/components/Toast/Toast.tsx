import { FC } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { ToastTypes } from '../../types/toast.types';

export const ToastComponent: FC<ToastTypes> = ({
  message,
  isOpen,
  setIsOpen,
  type,
}) => {
  return (
    <>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={isOpen}
          onClose={() => setIsOpen({ open: false, type: 'danger' })}
          bg={type.toLowerCase()}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="me-auto text-capitalize">{type}</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
