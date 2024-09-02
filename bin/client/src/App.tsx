import { BrowserRouter } from 'react-router-dom';
import { Layout } from './layouts/layout';

import AppRoutes from './routes/main.routes';
import { initialUserState, UserContext } from './state/user/user.context';
import { useReducer } from 'react';
import { userReducer } from './state/user/user.reducer';

function App() {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
