import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import './index.css';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminHomeScreen from './screens/AdminHomeScreen.jsx';
import AdminLoginScreen from './screens/AdminLoginScreen.jsx';
import UsersListScreen from './screens/UsersListScreen.jsx';
import AdminUserUpdate from './screens/AdminUserUpdate.jsx';
import AdminAddUser from './screens/AdminAddUser.jsx';
import AdminPrivateRoute from './components/AdminPrivateRoute.jsx';
import NotFound from './components/NotFound.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* -----User Routes----- */}
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>

      {/* -----Admin Routes----- */}
      <Route path='/admin/login' element={<AdminLoginScreen />} />

      <Route path='' element={<AdminPrivateRoute />}>
        <Route path='/admin' element={<AdminHomeScreen />} />
        <Route path='/admin/users' element={<UsersListScreen />} />
        <Route path='/admin/users/update/:id' element={<AdminUserUpdate />} />
        <Route path='/admin/users/add' element={<AdminAddUser />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
