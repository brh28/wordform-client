import React, {Component} from 'react';
import { Button } from "baseui/button";
import LnUrlDisplay from './LnUrlDisplay'
import { withRouter } from "react-router";
import { Textarea } from "baseui/textarea";
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { PublishArticle as Invoice } from "./Invoices";
import Spinner from './Spinner';

class NewArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      form: {
      	title: '',
        content: '',
        price: 1,
        currency: 'SAT'
      },
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleTitleChange(event) {
  	this.setState({
  		form: {
  			...this.state.form,
  			title: event.target.value
  		}
  	});
  }

  handleContentChange(event) {
  	this.setState({
  		form: {
  			...this.state.form,
  			content: event.target.value
  		}
  	});
  }

  handlePriceChange(event) {
  	this.setState({
  		form: {
  			...this.state.form,
  			price: event.target.value
  		}
  	})
  }

  handleCurrencyChange(params) {
    console.log(params)
  	this.setState({
  		form: {
  			...this.state.form,
  			currency: params.value.id
  		}
  	})
  }

  submitForm() {
  	this.setState({ isLoading: true })
    fetch("/api/article", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(this.state.form)
      })
      .then(res => res.json())
      .then(res => {
        this.props.history.push(`/publish/article/${res.articleId}/invoice`)
      });
  }

  render() {
    console.log('NewArticleForm')
    if (this.state.isLoading) return <Spinner />
	return (
		<div style={{width: '25%', margin: '10px'}}>
			<label>Title: </label>
      <Input
        value={this.state.form.title}
        onChange={this.handleTitleChange}
        placeholder="Title"
        clearOnEscape
      />
			<br />
			<label>Content: </label>
      <Textarea
        value={this.state.form.content}
        onChange={this.handleContentChange}
        placeholder="Content"
        clearOnEscape
      />     
			<br />
			<label>Price: <input type="number" name="price" value={this.state.form.price} onChange={this.handlePriceChange} /></label>
{/*      <Select
        options={[
          {label:"USD", id: "usd"},
          {label:"SAT", id: "sat"}
          ]}
        value={this.state.form.currency}
        onChange={this.handleCurrencyChange}
      /> */}
			<select value={this.state.form.currency} onChange={this.handleCurrencyChange}>
{/*				<option value="USD">USD</option>
*/}				<option value="SAT">Satoshi(s)</option>
			</select>
			<br />
      <Button style={{marginTop: '10px'}} onClick={this.submitForm} color="primary">Save & Continue</Button>
{/*			{this.state.invoice 
				? <LnUrlDisplay lnurl={this.state.invoice} onPaymentCheck={this.handlePaymentCheck} /> 
				: <Button style={{marginTop: '10px'}} onClick={this.showInvoice} color="primary">Publish</Button>
			}*/}
		</div>
	)
  }
}

export default withRouter(NewArticleForm)
