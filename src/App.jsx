import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Router, Route, Switch } from "react-router";
import './css/App.css';
import Browse from './components/Browse.jsx'
import Paywall from './components/Paywall.jsx'
import NewArticleForm from './components/NewArticleForm.jsx'
import PublishArticle from './components/PublishArticle'
import UserLogin from './components/UserLogin'
import UserLogout from './components/UserLogout'
import CreateUser from './components/CreateUser'
import { createBrowserHistory } from "history";

import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import NavigationBar from "./components/NavigationBar"
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

const checkUserSession = () => {
  const headers = new Headers();
  headers.append('pragma', 'no-cache');
  headers.append('cache-control', 'no-cache')
  fetch('/api/sessions/user', {
    headers: headers
  })
  .then(resp => {
    console.log(resp)
    if (resp.status === 403) {
      localStorage.removeItem('userId')
      window.location.reload(false)
    }
  })
}

const onLogin = (userId, history) => {
  // console.log('onLogin')
  // localStorage.setItem( 'userId', userId );
  //history.push('/browse')
}

const App = (props) => {
  const userId = localStorage.getItem('userId')
  console.log('App userId = ' + userId)
  if (userId) checkUserSession()
  return (
      <Router history={history}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <NavigationBar userId={userId} />
            <Switch>
              <Route exact path="/browse">
                <Browse />
              </Route>
              <Route exact path="/articles/:id">
                <Paywall />
              </Route>
              <Route exact path="/publish/article">
                <NewArticleForm />
              </Route>
              <Route exact path="/publish/article/:id/invoice">
                <PublishArticle />
              </Route>
              <Route exact path="/users/new">
                <CreateUser onLogin={onLogin} />
              </Route>
              <Route exact path="/login">
                <UserLogin onLogin={onLogin} />
              </Route>
              <Route exact path="/logout">
                <UserLogout />
              </Route>
            </Switch>
          </BaseProvider>
        </StyletronProvider>
      </Router>
  );
}

export default hot(module)(App);
