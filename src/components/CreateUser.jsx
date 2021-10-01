import React, {Component} from 'react';
import { Button } from "baseui/button";
import LnUrlDisplay from './LnUrlDisplay'
import { withRouter } from "react-router";
import { Textarea } from "baseui/textarea";
import { FormControl } from "baseui/form-control";
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { PublishArticle as Invoice } from "./Invoices";
import LnAuth from './LnAuth'
import Spinner from './Spinner';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      lnurl: undefined,
      form: {
      	userId: '',
        linkingKeys: new Set(),
        minKeys: 1,
        email: '',
        autoPay: false,
        destinationPubKey: null
      },
      userId: {
        isChecked: false,
        error: null
      }
      // userId
      // userIdCaption
    };
    this.eventSource = new EventSource("/api/users/authentication");
    this.handleUserIdChange = this.handleUserIdChange.bind(this);
    this.addLinkingKey = this.addLinkingKey.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentDidMount() {
    this.eventSource.addEventListener("newLnurl", e => {
          const { lnurl } = JSON.parse(e.data)
          this.setState({ lnurl: lnurl });
    })

    this.eventSource.addEventListener("keySign", e => {
      this.props.onKeySign(e.data)
    })

    this.eventSource.addEventListener("loggedIn", e => {
      this.props.onLogin(e.data)
    });
  }

  componentWillUnmount() {
    this.eventSource.close();
  }

  handleUserIdChange(event) {
    const updatedId = event.target.value
    if (this.timer) clearTimeout(this.timer)
    if (updatedId && updatedId !== '') {
      this.timer = setTimeout(() => {
      fetch(`/api/users/${updatedId}/info`)
        .then(resp => resp.json())
        .then(result => {
          if (this.state.form.userId === updatedId) {
            this.setState({ userId: {isChecked: true, error: result.isAvailable ? false : "ID is already taken" }})
          }
        })
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

  addLinkingKey(key) {
    const keys = {...this.state.form.linkingKeys}
    keys.add(key)
    this.setState({ 
      form: {
        ...this.state.form,
        linkingKeys: keys 
      } 
    })
  }

  submitForm() {
  	this.setState({ isLoading: true })
    fetch("/api/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(this.state.form)
      })
      .then(res => {
        if (res.status === 200) {
          this.props.onLogin(result.json().userId)
        } else {
          this.setState({ isLoading: false })
        }     
      });
  }

  render() {
    if (this.state.isLoading) return <Spinner />
  	return (
  		<div style={{width: '25%', margin: '10px'}}>
  			<FormControl
          label="User ID"
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
  			<br />
        <LnAuth lnurl={this.state.lnurl} linkingKeys={Array.from(this.state.form.linkingKeys)} onKeyRemove={this.removeKey} />
        <label>Minimum number of keys to sign in: <input type="number" name="minKeys" value={this.state.form.minKeys} onChange={()=>{}} /></label>
        <br />
        <FormControl
          label="Email"
          caption="Contact method with independent authentication"
        >
          <Input
            value={this.state.form.email}
            onChange={this.handleUserIdChange}
            placeholder="Optional"
            clearOnEscape
          />
        </FormControl>
        <Button style={{marginTop: '10px'}} onClick={this.submitForm} color="primary">Create User</Button>
  		</div>
  	)
  }
}

export default withRouter(CreateUser)
