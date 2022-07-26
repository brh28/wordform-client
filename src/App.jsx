import React, { Component, useState } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from "react-router";
import './css/App.css';
import Browse from './controls/articles/Browse'
import ArticleController from './controls/ArticleController'
import ArticleCreate from './controls/articles/Create'
import PublishArticle from './controls/articles/Publish'
import CreateUser from './controls/users/Create'
import PublishInvoice from './controls/articles/Publish'
import UserController from './controls/users/index.jsx'
import NavigationBar from "./controls/NavigationBar"
import { withRouter } from "react-router";
import { Login } from './controls/users/authentication'
import { server, useLocalStorage, localStorage, User } from "./api"

const App = (props) => {
  const [userId, setUserId] = React.useState(localStorage.getUserId());
  React.useEffect(() => localStorage.setUserId(userId), [userId]);
  return (
      <User.Provider value={ [userId, setUserId] }>
            <NavigationBar userId={userId} />
            <Switch>
              <Route exact path="/browse">
                <Browse userId={userId} />
              </Route>
              <Route exact path="/articles/new">
                <ArticleCreate />
              </Route>
              <Route exact path="/articles/:id">
                <ArticleController viewerId={userId} />
              </Route>
              <Route exact path="/articles/:id/publish">
                <PublishArticle />
              </Route>
              <Route exact path="/users/new">
                <CreateUser />
              </Route>
              <Route path="/users/:id">
                <UserController viewerId={userId} />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
      </User.Provider>
  );
}

export default hot(module)(withRouter(App));
