import { FC } from 'react';
import { NavCategoriesTypes } from '../../types/NavCategories.types';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Container,
  DropdownMenu,
  NavLink,
} from 'react-bootstrap';

export const NavCategories: FC<NavCategoriesTypes> = ({ data }) => {
  return (
    <Container fluid>
      <Accordion>
        {data &&
          data.map(({ name, subCategories }) => (
            <>
              <AccordionItem eventKey={name}>
                <AccordionHeader className="text-uppercase">
                  <span className="text-uppercase fw-semibold fs-6 opacity-80">
                    {name}
                  </span>
                </AccordionHeader>
                {subCategories &&
                  subCategories.map(({ name }) => (
                    <AccordionBody className="border-bottom border-light">
                      <NavLink className="text-capitalize lh-1">{name}</NavLink>
                    </AccordionBody>
                  ))}
              </AccordionItem>
              <DropdownMenu></DropdownMenu>
            </>
          ))}
      </Accordion>
    </Container>
  );
};
