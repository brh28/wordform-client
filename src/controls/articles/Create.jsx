import React, {Component} from 'react';
import { Button } from "baseui/button";
import { withRouter } from "react-router";
import { Textarea } from "baseui/textarea";
import { Select } from "baseui/select";
import { Input } from "baseui/input";
import { FormControl } from "baseui/form-control"
import Spinner from '../common/Spinner';
import { Error } from "../common/Notifications";
import { server } from "../../api"

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
          amount: 0,
        }
      }
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
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
    const newAmount = event.target.valueAsNumber
    if (newAmount < 0) return
    const { form } = this.state
  	this.setState({
  		form: {
        ...form,
  			price: {
          ...form.price,
          amount: event.target.valueAsNumber
        }
  		}
  	})
  }

  submitForm() {
  	this.setState({ isLoading: true })
    server.postArticle(this.state.form)
      .then(res => {
        if (res.status === 200) {
          res.json().then(r => this.props.history.push(`/articles/${r.articleId}`))
        } else {
          this.setState({ isLoading: false, error: 'Generic error'})
        }
      });
  }

  render() {
  	return (
  		<Spinner isActive={this.state.isLoading}>
        <Error message={this.state.error} />
        <FormControl label='Title'>
          <Input
            value={this.state.form.title}
            onChange={this.handleTitleChange}
            placeholder="Title"
            clearOnEscape
          />
        </FormControl>
  			<FormControl label='Content'>
          <Textarea
            value={this.state.form.content}
            onChange={this.handleContentChange}
            placeholder="Content"
            clearOnEscape
          />     
        </FormControl>
        <FormControl label='Price (sats)'>

  			   <input type="number" name="price" value={this.state.form.price.amount} onChange={this.handlePriceChange} />

  			</FormControl>
        <Button style={{marginTop: '10px'}} onClick={this.submitForm} color="primary">Save & Continue</Button>
  		</Spinner>
  	)
  }
}

export default withRouter(CreateArticle)
