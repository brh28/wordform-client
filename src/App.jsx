import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from "react-router";
import './css/App.css';
import Browse from './controls/articles/Browse'
// import Paywall from './controls/articles/view/Paywall'
import ArticleController from './controls/ArticleController'
import ArticleCreate from './controls/articles/Create'
import PublishArticle from './controls/articles/Publish'
import UserLogin from './controls/users/Login'
import UserLogout from './controls/users/Logout'
import CreateUser from './controls/users/Create'
import UserProfile from './controls/users/UserProfile'
import { createBrowserHistory } from "history";

import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import NavigationBar from "./controls/NavigationBar"
import SecondaryNavigationBar from "./controls/SecondaryNavigationBar"
import Footer from "./controls/Footer"

import { localStorage, server, useLocalStorage } from "./api"
// import { CookiesProvider } from 'react-cookie';

// import * as Cookies from "js-cookie";


const engine = new Styletron();
const history = createBrowserHistory();

// export const getSessionCookie = () => {
//   // const sessionCookie = Cookies.get();
//   const sessionCookie = document.cookie
//   console.log(sessionCookie)
//   // if (sessionCookie === undefined) {
//   //   return {};
//   // } else {
//   //   return JSON.parse(sessionCookie);
//   // }
// };

const onLogin = (userId, history) => {
  // console.log('onLogin')
  // localStorage.setItem( 'userId', userId );
  //history.push('/browse')
}

const verifyUserSession = () => {
    const localUserId = localStorage.getUserId()
    const session = server.getUserSession().then(r => {
      if (r.userId !== localUserId) localStorage.removeUserId()

    })
  }

const App = (props) => {
  const [userId, toLocalStorage] = useLocalStorage()
  server.getUserSession()
    .then(r => toLocalStorage(r.userId)) // refresh user session. could also do this on page load

  return (
      <Router history={history}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <NavigationBar />
{/*            <SecondaryNavigationBar />
*/}            <Switch>
              <Route exact path="/browse">
                <Browse />
              </Route>
              <Route exact path="/articles/new">
                <ArticleCreate />
              </Route>
              <Route exact path="/articles/:id">
                <ArticleController />
              </Route>
              <Route exact path="/users/new">
                <CreateUser onLogin={onLogin} />
              </Route>
              <Route path="/users/:id">
                <UserProfile />
              </Route>
              <Route exact path="/login">
                <UserLogin onLogin={onLogin} />
              </Route>
              <Route exact path="/logout">
                <UserLogout />
              </Route>
            </Switch>
            <Footer />
          </BaseProvider>
        </StyletronProvider>
      </Router>
  );
}

export default hot(module)(App);
