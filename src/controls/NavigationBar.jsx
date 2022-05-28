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
import { localStorage } from "../api"


// const NavigationItem = ({ text, href }) => {
//   return (<StyledNavigationItem key=>
//           <StyledLink href={href}>
//             {text}
//           </StyledLink>
//         </StyledNavigationItem>)
// }

const NavigationBar = (props) => {
  // const userId = localStorage.getUserId()
  const userId = props.userId
  const currentPath = props.history.location.pathname
  // const userId = localStorage.getUserId()

  console.log('Navigation bar user = ' + userId)
  const navItems = userId ? 
    [
      {text: 'Browse', href: '/browse'},
      {text: 'Publish Article', href: '/articles/new'},
      {text: 'User Profile', href: `/users/${userId}`},
      {text: 'Logout', href: '/logout'}
    ] :
    [
      {text: 'Browse', href: '/browse'},
      {text: 'Create User', href: '/users/new'},
      {text: 'Login', href: '/login', historyState: {returnUrl: currentPath}}
    ]

  return (
    <HeaderNavigation>
      <StyledNavigationList $align={ALIGN.left}>
        {
          navItems.map((i, idx) => {
            const styling = (i.href === currentPath) ? {backgroundColor: '#A9A9A9'} : null
            return (
              <StyledNavigationItem key={idx} style={styling}>
                <StyledLink onClick={() => props.history.push(i.href, i.historyState)}>
                  {i.text}
                </StyledLink>
              </StyledNavigationItem>
            )
          })
        }
      </StyledNavigationList>
      <StyledNavigationList $align={ALIGN.center} />
      <StyledNavigationList $align={ALIGN.right}>
        <StyledNavigationItem>🌱</StyledNavigationItem>
      </StyledNavigationList>
    </HeaderNavigation>
  );
}

export default withRouter(NavigationBar)
