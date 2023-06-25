
import { LoadableComponent } from '@loadable/component';
import { RouteComponentProps } from 'react-router-dom';
import loadableUtil from '../utils/loadableUtil';

export const Login = loadableUtil(() => import( '../views/auth/Login'));
export const Register = loadableUtil(() => import( '../views/auth/Register'));

export interface RouteProps {
  path: string;
  exact?: boolean;
  name: string;
  component: LoadableComponent<RouteComponentProps> | any;
}

export const authRoute: RouteProps[] = [
  {
    path: '/',
    exact: true,
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    exact: true,
    name: 'Register',
    component: Register
  }
];
export default authRoute;