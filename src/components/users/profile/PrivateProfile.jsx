import React, { Component } from "react";
import { Tabs, Tab } from "baseui/tabs";
import { server } from '../../../api';

import Spinner from '../../common/Spinner';
import BrowseArticles from '../../articles/Browse.jsx'
import { Logout, UpdateAuthentication } from '../authentication'
import AuthorTag from '../../common/AuthorTag.jsx'
import UserWallet from '../wallet/UserWallet'
import PublicProfile from './PublicProfile'
import UserNotifications from '../UserNotifications'

import { withRouter, Switch, Route } from "react-router";

class PrivateProfile extends Component {
  constructor(props) {
    super(props);
    const { pathname } = props.history.location
    const { url } = props.match;
    const path = pathname.replace(url, '')
    this.state = {
      activeKey: ['/notifications', '/profile', '/wallet', '/authentication', '/logout'].find(el => path.includes(el)) || '/notifications'
    };
    this.setActiveKey = this.setActiveKey.bind(this);
  }

  setActiveKey(k) {
    this.setState({ activeKey: k })
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.activeKey}
        onChange={({ activeKey }) => {
          this.props.history.push(`${this.props.match.url}${activeKey}`)
          this.setActiveKey(activeKey);
        }}
      >
        <Tab key="/notifications" title={this.props.notificationCount && this.props.notificationCount > 0 ? `Notifications (${this.props.notificationCount })` : "Notifications"}>
          <UserNotifications user={this.props.id} 
                    notificationCount={this.props.notificationCount} 
                    setNotificationCount={this.props.setNotificationCount} />
        </Tab>
        <Tab key="/profile" title="Profile">
          <PublicProfile id={this.props.id} editable />
        </Tab>
        <Tab key="/wallet" title="Wallet">      
          <UserWallet userId={this.props.id} />
        </Tab>
        <Tab key="/authentication" title="Authentication">
          <UpdateAuthentication id={this.props.id} />
        </Tab>
        <Tab key="/logout" title="Logout">      
          <Logout />
        </Tab>
      </Tabs>
    );
  }
}

export default withRouter(PrivateProfile)