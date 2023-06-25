import React, { FC, HTMLProps } from 'react';
import { Route, Switch } from 'react-router-dom';
import mainRoute from '../routes/MainRoute';

type IMainFrame = HTMLProps<HTMLDivElement>;

const MainLayout: FC<IMainFrame> = () => (
    <Switch>
      {mainRoute.map((item) => (
        <Route
          key={item.path}
          path={item.path}
          exact={item.exact}
          render={(componentProps) => <item.component {...componentProps} />}
        />
      ))}
    </Switch>
);

export default MainLayout;