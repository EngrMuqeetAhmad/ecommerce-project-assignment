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
    <Navbar expand="md" bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Col sm={6} md={4} className="d-flex justify-content-start">
          <NavbarBrand>Ecommerce</NavbarBrand>
        </Col>

        <Col sm={6} md={4} className="d-flex justify-content-end">
          <NavbarToggle aria-controls="offcanvasNavbar-expand" />
          <NavbarOffcanvas placement="end" id="offcanvasNavbar-expand">
            <OffcanvasHeader closeButton>
              <OffcanvasTitle>Ecommerce - Menu</OffcanvasTitle>
            </OffcanvasHeader>

            <OffcanvasBody>
              <Nav className="fw-semibold text-uppercase d-flex w-100 justify-content-start align-items-center">
                <NavLink href="/home" className=" w-20  ms-3">
                  Home
                </NavLink>
                <NavLink href="/home" className="w-20 ms-4">
                  Cart
                </NavLink>
                <NavLink
                  href="/login"
                  className="d-block d-md-none w-auto text-primary ms-3"
                >
                  Login
                </NavLink>
              </Nav>
            </OffcanvasBody>
          </NavbarOffcanvas>
        </Col>

        <Col md={4} className="d-none d-md-flex justify-content-end pe-4">
          <Button className="text-uppercase " variant="primary">
            Login
          </Button>
        </Col>
      </Container>
    </Navbar>
  );
};

export { NavBar };
