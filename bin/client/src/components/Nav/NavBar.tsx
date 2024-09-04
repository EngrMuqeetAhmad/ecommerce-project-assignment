import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {
  Button,
  Col,
  Nav,
  NavbarBrand,
  NavbarOffcanvas,
  NavbarToggle,
  NavLink,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
} from 'react-bootstrap';
import { FC, useContext, useState } from 'react';
import { UserContext } from '../../state/user/user.context';
import { UserServices } from '../../services/user.service';
import { ActionType } from '../../state/user/user.actions';
import { useNavigate } from 'react-router-dom';
import { UserOutput } from '../../types';
import { UserDropDown } from './userDropDown';

const NavBar: FC = () => {
  // State to control the Offcanvas visibility
  const [show, setShow] = useState(false);

  // Functions to open and close the Offcanvas
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);

  const user: UserOutput | null = JSON.parse(
    `${localStorage?.getItem('user')}`
  );

  const Navigate = (link: string) => {
    navigate(link);
    handleClose();
  };

  const Logout = () => {
    UserServices.Logout();
    dispatch({
      type: ActionType.LOGOUT,
    });
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
  };

  return (
    <Navbar
      expand="md"
      bg="light"
      variant="light"
      // fixed="sticky"
      className="shadow-sm"
    >
      <Container fluid className="ps-4 pe-4 pt-2 pb-2">
        <Col sm={6} md={4} className="d-flex justify-content-start">
          <NavbarBrand className="fw-semibold">Ecommerce</NavbarBrand>
        </Col>

        <Col sm={6} md={4} className="">
          <NavbarToggle
            aria-controls="offcanvasNavbar-expand"
            onClick={handleShow}
          />
          <NavbarOffcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            id="offcanvasNavbar-expand"
          >
            <OffcanvasHeader closeButton>
              <OffcanvasTitle className="text-capitalize">
                Hello {user?.firstName}
              </OffcanvasTitle>
            </OffcanvasHeader>

            <OffcanvasBody>
              <Nav className="fw-semibold text-uppercase text-primary d-flex w-100 justify-content-start align-items-center">
                <NavLink onClick={() => Navigate('/')} className=" w-20 ">
                  Home
                </NavLink>
                <NavLink onClick={() => Navigate('/cart')} className="w-20">
                  Cart
                </NavLink>
                <NavLink onClick={() => Navigate('/wishes')} className="w-20">
                  Wishes
                </NavLink>
                {user != null ? (
                  <>
                    <NavLink
                      onClick={() => {
                        Logout();
                        Navigate('/login');
                      }}
                      className="d-block d-md-none w-auto"
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      onClick={() => Navigate('/login')}
                      className="d-block d-md-none w-auto"
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </Nav>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Col>

        <Col md={4} className="d-none d-md-flex">
          <Container className="w-75 d-flex justify-content-end gap-3 text-uppercase">
            {user != null ? (
              <>
                <UserDropDown />
               
              </>
            ) : (
              <>
                <Button onClick={() => Navigate('/register')} variant="link">
                  Register
                </Button>
                <div className="vr"></div>

                <Button
                  onClick={() => Navigate('/login')}
                  className="ms-1 text-uppercase"
                  variant="outline-primary"
                >
                  Login
                </Button>
              </>
            )}
          </Container>
        </Col>
      </Container>
    </Navbar>
  );
};

export { NavBar };
