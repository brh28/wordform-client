import * as React from "react";
import { withRouter } from "react-router";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import Routes from '../routes'

import { User } from '../api'


import { Tabs, Tab, StyledTab } from "baseui/tabs";


const tabContentStyle = ({$theme}) => ({
  borderLeftWidth: '2px',
  borderRightWidth: '2px',
  borderBottomWidth: '2px',
  borderTopWidth: '0',
  borderLeftStyle: 'dashed',
  borderRightStyle: 'dashed',
  borderTopStyle: 'dashed',
  borderBottomStyle: 'dashed',
  borderLeftColor: $theme.colors.mono600,
  borderRightColor: $theme.colors.mono600,
  borderTopColor: $theme.colors.mono600,
  borderBottomColor: $theme.colors.mono600,
});

const tabStyle = ({$active, $disabled, $theme}) => ({
  // color: $active ? $theme.colors.mono100 : $theme.colors.mono300
})

const NavigationBar = (props) => {
  const [userId, setUserId] = React.useContext(User);
  const navItems = userId ? 
    [
      {key: '0', text: 'Browse', href: Routes.root},
      {key: '1', text: 'Create Article', href: Routes.articles.create},
      {key: '2', text: 'My Profile', href: Routes.users.controller.go(userId)},
    ] :
    [
      {key: '0', text: 'Browse', href: Routes.root},
      {key: '1', text: 'New User', href: Routes.users.create},
      {key: '2', text: 'Login', href: Routes.users.login, state: {returnUrl: props.history.location.pathname}}
    ]

  const currentItem = navItems.find(el => el.href === props.history.location.pathname)
  const activeKey = currentItem && currentItem.key


  const navigate = (key) => {
    const dest = navItems[key]
    props.history.push(dest.href, {...props.history.location.state, ...dest.state})
  }

  return (
      <Tabs
        activeKey={activeKey}
        onChange={({ activeKey }) => navigate(activeKey)}

      >
        { navItems.map((i, idx) => <Tab key={idx} title={ i.text } />) }
      </Tabs>
  )
}

export default withRouter(NavigationBar)
