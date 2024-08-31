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
const NavBar = () => {
  return (
    <Navbar expand="md" bg="light" variant="light" fixed="top" className='shadow-sm'>
      <Container fluid className='ps-4 pe-4 pt-3 pb-3' >
        <Col sm={6} md={4} className="d-flex justify-content-start">
          <NavbarBrand className='fw-semibold'>Ecommerce</NavbarBrand>
        </Col>

        <Col sm={6} md={4} className="">
          <NavbarToggle aria-controls="offcanvasNavbar-expand" />
          <NavbarOffcanvas placement="end" id="offcanvasNavbar-expand">
            <OffcanvasHeader closeButton>
              <OffcanvasTitle >Ecommerce - Menu</OffcanvasTitle>
            </OffcanvasHeader>

            <OffcanvasBody>
              <Nav className="fw-semibold text-uppercase text-primary d-flex w-100 justify-content-start align-items-center">
                <NavLink href="/home" className=" w-20  ms-4">
                  Home
                </NavLink>
                <NavLink href="/home" className="w-20 ms-4">
                  Cart
                </NavLink>
                <NavLink
                  href="/login"
                  className="d-block d-md-none w-auto ms-4"
                >
                  Login
                </NavLink>
              </Nav>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Col>

        <Col md={4} className="d-none d-md-flex">
          <Container className='w-75 d-flex justify-content-end gap-3 text-uppercase'>
            <Button href='/register' variant="link">
              Register
            </Button>
           <div className='vr' >

           </div>
            <Button href='/login' className="ms-1 text-uppercase" variant="outline-primary">
              Login
            </Button>
          </Container>

        </Col>
      </Container>
    </Navbar>
  );
};

export { NavBar };
