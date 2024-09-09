import { FC, ReactNode } from 'react';
import { Modal } from 'react-bootstrap';


export const FullScreenModal: FC<{
  children: ReactNode;
  title: string;
  show: boolean;
  setShow: any;
}> = ({ title, children, show, setShow }) => {
  return (
    <>
      <Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};
