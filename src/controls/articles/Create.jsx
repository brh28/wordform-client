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
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import { StatefulTooltip } from "baseui/tooltip";


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

  handleContentChange(val) {
  	this.setState({
  		form: {
  			...this.state.form,
  			content: val
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
    server.newArticle(this.state.form)
      .then(res => {
        if (res.status === 200) {
          res.json().then(r => this.props.history.push(`/articles/${r.articleId}`))
        } else {
          this.setState({ isLoading: false, error: 'Generic error'})
        }
      });
  }

  render() {
  	const service_fee = Math.ceil(this.state.form.price.amount *.021) || 0
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
          <MDEditor value={this.state.form.content} 
                    onChange={this.handleContentChange}
                    previewOptions={{
                      rehypePlugins: [[rehypeSanitize]],
                    }}/>
        </FormControl>

        <table style={{marginBottom: '5px'}}>
          <thead style={{ textAlign: 'left'}}>
            <tr>
              <th>Price to read (sats)</th>
              <th><StatefulTooltip
                  content={() => '2.1% of price (rounded up)'}
                  returnFocus
                  autoFocus
                  showArrow
                >
                  Service fee (sats)
                </StatefulTooltip>
              </th>
            </tr>
          </thead>
          <tbody>
          <tr>
          <td>
             <input style={{ marginRight: '5px', width: '140px'}} 
                    type="number" 
                    name="price" 
                    value={this.state.form.price.amount} 
                    onChange={this.handlePriceChange} />
          </td>
          <td style={{ }}>
          <StatefulTooltip
            content={() => `ceiling(.021 * ${this.state.form.price.amount || 0})`}
            returnFocus
            autoFocus
            showArrow
          >
            {service_fee}
          </StatefulTooltip>
              
          </td>
          </tr>
          </tbody>
        </table>
        <Button style={{marginTop: '10px'}} onClick={this.submitForm} color="primary">Save & Continue</Button>
  		</Spinner>
  	)
  }
} 

export default withRouter(CreateArticle)
