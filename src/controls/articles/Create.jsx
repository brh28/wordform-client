import React, {Component} from 'react';
import { Button } from "baseui/button";
import { withRouter } from "react-router";
import { Textarea } from "baseui/textarea";
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import Spinner from '../common/Spinner';
import { articles } from "../../data/api"

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      form: {
      	title: '',
        content: '',
        price: {
          amount: 1,
          currency: 'SAT'
        }
      }
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
    const { form } = this.state
  	this.setState({
  		form: {
        ...form,
  			price: {
          ...form.price,
          amount: event.target.valueAsNumber
        },
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
    articles.post(this.state.form)
      .then(res => {
        if (res.status === 200) {
          res.json().then(r => {
            this.props.history.push(`/publish/article/${r.articleId}/invoice`)
          })
        } else {
          this.setState({ isLoading: false, error: 'Generic error'})
        }
      });
  }

  render() {
    console.log(this.state)
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
  			<label>Price: <input type="number" name="price" value={this.state.form.price.amount} onChange={this.handlePriceChange} /></label>
  			<select value={this.state.form.price.currency} onChange={this.handleCurrencyChange}>
  {/*				<option value="USD">USD</option>
  */}				<option value="SAT">Satoshi(s)</option>
  			</select>
  			<br />
        <Button style={{marginTop: '10px'}} onClick={this.submitForm} color="primary">Save & Continue</Button>
        {this.state.error ? <p>{this.state.error}</p> : null}
  		</div>
  	)
  }
}

export default withRouter(CreateArticle)
