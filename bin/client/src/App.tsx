import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/layout';

import AppRoutes from './routes/main.routes';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
