import React, { useState } from 'react';
import { Route, Switch, withRouter } from "react-router";
import { hot } from 'react-hot-loader';
import { 
  NavigationBar, 
  Home, 
  ArticleController, 
  ErrorBoundary,
  UserController,
  SignIn
} from './components'
import { server, localStorage } from "./api"
import { User } from './contexts'

const App = () => {
  const [userId, setUserId] = React.useState(localStorage.getUserId());
  const [userChecked, setUserChecked] = React.useState(false);
  const [notificationCount, setNotificationCount] = useState(null);
  const [notificationsCheck, setNotificationsCheck] = useState(false);

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
  React.useEffect(() => {
    if (userId && !notificationsCheck) {
      server.getUnreadNotificationsCount()
        .then(r => {
          setNotificationsCheck(true)
          setNotificationCount(r.unreadCount)
        })
    }
  });

  return (
    <ErrorBoundary>
      <User.Provider value={[userId, setUserId]}>
        <NavigationBar userId={userId} notificationCount={notificationCount} />
        <Switch>
          <Route exact path={Home.PATH}>
            <Home userId={userId} />
          </Route>
          <Route path={ArticleController.PATH}>
            <ArticleController user={userId} />
          </Route>
          <Route path={UserController.PATH}>
            <UserController viewerId={userId} notificationCount={notificationCount} setNotificationCount={setNotificationCount} />
          </Route>
          <Route path={SignIn.PATH}>
            <SignIn onSignIn={u => setUserId(u)} />
          </Route>
        </Switch>
      </User.Provider>
    </ErrorBoundary>
  );
}

export default hot(module)(withRouter(App));
