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

const SecondaryNavigationBar = (props) => {
  const currentPath = '/browse'
  const navItems = [
      {text: 'Browse', href: '/browse'},
      {text: 'Create', href: '/articles/new'}
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
    </HeaderNavigation>
  );
}

export default SecondaryNavigationBar
