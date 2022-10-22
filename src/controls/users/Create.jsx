import React, {Component} from 'react';
import { Button } from "baseui/button";
import { withRouter } from "react-router";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { StyledLink } from "baseui/link";
import { MinKeys } from './authentication'
import LnAuth from '../common/LnAuth'
import LinkingKeys from './authentication/LinkingKeys'
import Spinner from '../common/Spinner';
import { Error } from '../common/Notifications'
import { server, User } from '../../api';
import Routes from '../../routes'

const regExStr = '^(?=[a-zA-Z])[a-zA-Z0-9]{3,20}$' // todo consolidate in backend
const userIdRegEx =  new RegExp(regExStr)

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      form: {
      	userId: '',
        linkingKeys: [],
        minKeys: 1,
        email: '',
        autoPay: false,
        destinationPubKey: null
      },
      userId: {
        isChecked: false,
        error: null
      }
    };
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.addKey = this.addKey.bind(this);
    this.updateKeys = this.updateKeys.bind(this);
    this.updateMinKey = this.updateMinKey.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleUserIdChange(event) {
    const updatedId = event.target.value
    if (this.timer) clearTimeout(this.timer)
    if (updatedId && updatedId !== '') {
      this.timer = setTimeout(() => {
        if (!userIdRegEx.test(updatedId)) {
          this.setState({ userId: { isChecked: true, error: 'Not a valid ID (' + regExStr + ')' }})
        } else {
          server.getUserProfile(updatedId)
          .then(result => {
            if (this.state.form.userId === updatedId) {
              this.setState({ userId: {isChecked: true, error: result.isAvailable ? false : "ID is not available" }})
            }
          })
        }
      }, 1000)
    }
    
  	this.setState({
  		form: {
  			...this.state.form,
  			userId: updatedId
  		},
      userId: {
        isChecked: false,
        error: null
      }
  	});
  }

  addKey(key) {
      const { linkingKeys } = this.state.form
      if (!linkingKeys.map(lk => lk).includes(key)) {
        const updatedKeySet = [...linkingKeys]
        updatedKeySet.push(key)
        this.updateKeys(updatedKeySet)
      }
  }

  updateKeys(updatedKeySet) {
    const { minKeys } = this.state.form
    const updatedMinKeys = minKeys > updatedKeySet.length ? updatedKeySet.length : minKeys
    this.setState({ form: { 
      ...this.state.form, 
      minKeys: updatedMinKeys,
      linkingKeys: updatedKeySet 
    }})
  }

  updateMinKey(val) {
    this.setState({ form: {
      ...this.state.form,
      minKeys: val
    }})
  }

  submitForm() {
  	this.setState({ isLoading: true })
    server.postUser(this.state.form)
      .then(res => {
        if (res.status === 200) {
          res.json().then(r => {
            const [_, setUserId] = this.context
            setUserId(r.userId)
            const returnUrl = this.props.history.location.state && this.props.history.location.state.returnUrl
            this.props.history.push(Routes.root)
          })
        } else {
          this.setState({ isLoading: false, error: "Error creating user" })
        }
      });
  }

  render() {
  	return (
      <Spinner isActive={this.state.isLoading}>
        <Error message={this.state.error} />
        <table>
          <tbody>
            <tr>
              <td>
                <FormControl
                  label="Create an ID"
                  caption="Must be unique"
                  positive={this.state.userId.isChecked && !this.state.userId.error ? "ID is available" : false}
                  error={this.state.userId.isChecked && this.state.userId.error}
                >
                  <Input
                    value={this.state.form.userId}
                    onChange={this.handleUserIdChange}
                    placeholder="Required"
                    clearOnEscape
                  />
                </FormControl>
              </td>
              <td>
                <p>Or, <StyledLink style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/login')}>sign in </StyledLink>to an existing user</p>
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <FormControl label={<p>Sign the Lnurl. Learn more <StyledLink href={'https://wordform.space/articles/6349d5c338bc7e719edb9162'} target="_blank">here</StyledLink></p>}>
                  <LnAuth onSignature={(signerStr) => {
                    this.addKey(JSON.parse(signerStr).signedBy)
                  }} />
                </FormControl>
              </td>
              <td>&nbsp;</td>
            </tr>
          </tbody>
        </table>
        { this.state.form.linkingKeys.length ? 
          <FormControl label="Linked Keys:">
            <LinkingKeys keys={this.state.form.linkingKeys} onUpdate={this.updateKeys} />
          </FormControl> : null }
        { this.state.form.linkingKeys.length ?
          <FormControl label="Keys required for log in:">
            <MinKeys selected={this.state.form.minKeys}
                    max={this.state.form.linkingKeys.length || 1}
                    onChange={this.updateMinKey} />
          </FormControl> : null }
        <Button onClick={this.submitForm} color='primary'>Create User</Button>
        </Spinner>
  	)
  }
}

CreateUser.contextType = User 

export default withRouter(CreateUser)
