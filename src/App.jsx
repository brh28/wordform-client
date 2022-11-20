import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from "react-router";
// import './css/App.css';
import { NavigationBar, Home, ArticleController } from './controls'
import ArticleCreate from './controls/articles/Create'
import UserController from './controls/users/index.jsx'
import { withRouter } from "react-router";
import { SignIn } from './controls/users/authentication'
import { server, useLocalStorage, localStorage, User } from "./api"
import Routes from './routes'

const App = (props) => {
  const [userId, setUserId] = React.useState(localStorage.getUserId());
  const [userChecked, setUserChecked] = React.useState(false);
  React.useEffect(() => {
    if (!userChecked) {
      server.getUserSession()
        .then(r => {
          const userId = r && r.id
          setUserChecked(true)
          setUserId(userId)
        })
    }
  });
  React.useEffect(() => localStorage.setUserId(userId), [userId]);
  return (
      <User.Provider value={ [userId, setUserId] }>
            <NavigationBar userId={userId} />
            <Switch>
              <Route exact path={Routes.root}>
                <Home userId={userId} />
              </Route>
              <Route exact path='/articles/new'>
                <ArticleCreate />
              </Route>
              <Route path='/articles/:id'>
                <ArticleController user={userId} />
              </Route>
              <Route path={Routes.users.controller.match}>
                <UserController viewerId={userId} />
              </Route>
              <Route path={Routes.users.login}>
                <SignIn onSignIn={u => setUserId(u)} />
              </Route>
            </Switch>
      </User.Provider>
  );
}

export default hot(module)(withRouter(App));
