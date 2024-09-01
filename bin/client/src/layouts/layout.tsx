import { FC } from 'react';
import { Container, ThemeProvider } from 'react-bootstrap';
import { LayoutProps } from '../types/layout.types';
import { NavBar } from '../components/Nav/NavBar';

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider
      breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
      minBreakpoint="xs"
    >
      <NavBar />
      <Container fluid style={{ marginTop: '100px' }}>
        {children}
      </Container>
    </ThemeProvider>
  );
};

export { Layout };
