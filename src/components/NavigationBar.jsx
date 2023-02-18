import React from "react";
import { withRouter } from "react-router";
import { User } from '../contexts'
import { Tabs, Tab } from "baseui/tabs";
import Home from './Home'
import ArticleController from './articles/ArticleController';
import UserController from './users'
import { SignIn } from './users/authentication'

const NavigationBar = (props) => {
  const { notificationCount } = props
  const [userId, _] = React.useContext(User);
  const navItems = userId ?
    [
      {
        key: '0',
        text: 'Browse',
        href: Home.PATH,
        exact: true
      },
      {
        key: '1',
        text: 'Create Article',
        href: ArticleController.CREATE_ARTICLE_URL,
        exact: false
      },
      {
        key: '2',
        text: notificationCount && notificationCount > 0 ? `${userId} (${notificationCount})` : userId,
        href: UserController.href(userId),
        exact: false
      },
    ] :
    [
      { 
        key: '0', 
        text: 'Browse', 
        href: Home.PATH, 
        exact: true 
      },
      { 
        key: '1', 
        text: 'Sign In', 
        href: SignIn.PATH, 
        exact: false, 
        state: { returnUrl: props.history.location.pathname } 
      }
    ]

  const currentItem = navItems.find(el => {
    return el.exact ? props.history.location.pathname === el.href : (props.history.location.pathname.indexOf(el.href) !== -1)
  })
  const activeKey = currentItem && currentItem.key


  const navigate = (key) => {
    const dest = navItems[key]
    props.history.push(dest.href, { ...props.history.location.state, ...dest.state })
  }

  return (
    <Tabs
      activeKey={activeKey}
      onChange={({ activeKey }) => navigate(activeKey)}

    >
      {navItems.map((i, idx) => <Tab key={idx} title={i.text} />)}
    </Tabs>
  )
}

export default withRouter(NavigationBar)
