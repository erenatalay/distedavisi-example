import React from 'react'
import AuthLayout from './layouts/AuthLayout';
import { Redirect, Route, HashRouter as Router, Switch } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { useUserInfoQuery } from './redux/api/auth';
const App = () => {
  const accessToken = localStorage.getItem("token");
  const {data} = useUserInfoQuery()
  console.log(data)
  const handleLayout = () => {
    if (accessToken != null) {
      return MainLayout;
    } else {
      <Redirect to={"/login"}/>
      return AuthLayout;
    }
  }

  return (
    <Router>
      <Switch>
        <Route component={handleLayout()} />
      </Switch>
    </Router>
  );

}

export default App;