import React, { Component } from "react";
import { Tabs, Tab } from "baseui/tabs";
import { server } from '../../api';

import Spinner from '../common/Spinner';
import BrowseArticles from '../articles/Browse.jsx'
import { Logout, UpdateAuthentication } from './authentication'
import AuthorTag from '../common/AuthorTag.jsx'
import UserWallet from '../UserWallet'
import PublicProfile from './PublicProfile'

class Self extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '0'
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
          this.setActiveKey(activeKey);
        }}
      >
        <Tab title="Articles">
          <PublicProfile id={this.props.id} />
        </Tab>
        <Tab title="Withdrawals">      
          <UserWallet userId={this.props.id} />
        </Tab>
        <Tab title="Authentication">
          <UpdateAuthentication id={this.props.id} />
        </Tab>
        <Tab title="Logout">      
          <Logout />
        </Tab>
      </Tabs>
    );
  }
}

export default Self