import React, { Component, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from "react-router";
import './css/App.css';
import Browse from './controls/articles/Browse'
import ArticleController from './controls/ArticleController'
import ArticleCreate from './controls/articles/Create'
import EditArticle from './controls/articles/EditArticle'
import CreateUser from './controls/users/Create'
import PublishInvoice from './controls/articles/Publish'
import UserController from './controls/users/index.jsx'
import NavigationBar from "./controls/NavigationBar"
import { withRouter } from "react-router";
import { Login } from './controls/users/authentication'
import { server, useLocalStorage, localStorage, User } from "./api"
import Routes from './routes'
import { Warning } from './controls/common/Notifications'

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
                <Browse userId={userId} />
              </Route>
              <Route exact path='/articles/new'>
                <ArticleCreate />
              </Route>
              <Route path='/articles/:id'>
                <ArticleController user={userId} />
              </Route>
              <Route exact path={Routes.users.create}>
                <CreateUser />
              </Route>
              <Route path={Routes.users.controller.match}>
                <UserController viewerId={userId} />
              </Route>
              <Route path={Routes.users.login}>
                <Login />
              </Route>
            </Switch>
      </User.Provider>
  );
}

export default hot(module)(withRouter(App));
