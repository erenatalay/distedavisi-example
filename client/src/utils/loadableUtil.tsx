import loadable, { DefaultComponent } from '@loadable/component';
import { RouteProps } from 'react-router-dom';

export default (Loader: (props: unknown) => Promise<DefaultComponent<RouteProps>>) => loadable(Loader);