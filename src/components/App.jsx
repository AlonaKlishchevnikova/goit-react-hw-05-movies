
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import UserRoute from './UserRoute'

export const App = () => {
  return (
 
    <BrowserRouter  basename="/goit-react-hw-05-movies">
      <Layout/>
      <UserRoute />
        </BrowserRouter>
  );
};
