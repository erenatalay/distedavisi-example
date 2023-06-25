import React, { FC, HTMLProps } from 'react';
import { Route, Switch } from 'react-router-dom';
import authRoute from '../routes/AuthRoute';

type IAuthFrame = HTMLProps<HTMLDivElement>;

const AuthLayout: FC<IAuthFrame> = () => (
    <Switch>
      {authRoute.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          render={(componentProps) => <item.component {...componentProps} />}
        />
      ))}
    </Switch>
);

export default AuthLayout;