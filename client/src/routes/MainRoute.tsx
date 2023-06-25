import { LoadableComponent } from '@loadable/component';
import { RouteComponentProps } from 'react-router-dom';
import loadableUtil from '../utils/loadableUtil';

export const Home = loadableUtil(() => import('../views/home/Home'));
export const Doctors = loadableUtil(() => import('../views/home/Doctors'));
export const Treatments = loadableUtil(() => import('../views/home/Treatments'));
export const Payment = loadableUtil(() => import('../views/home/Payments'));
export const Appointment = loadableUtil(() => import('../views/home/Appointment'));

export interface RouteProps {
  path: string;
  exact?: boolean;
  name: string;
  component: LoadableComponent<RouteComponentProps> | any;
}

export const mainRoute: RouteProps[] = [
  {
    path: '/',
    exact: true,
    name: 'Home',
    component: Home
  },
  {
    path: '/doctors/:id',
    exact: true,
    name: 'Doctors',
    component: Doctors
  },
  {
    path: '/treatments/:id',
    exact: true,
    name: 'Treatments',
    component: Treatments
  },
  {
    path: '/payment',
    exact: true,
    name: 'Payment',
    component: Payment
  },
  {
    path: '/appointment',
    exact: true,
    name: 'Appointment',
    component: Appointment
  },
 
];
export default mainRoute;