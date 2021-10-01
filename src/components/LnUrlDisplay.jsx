import React, {Component} from 'react';
import { Button } from "baseui/button";
import QRCode from 'qrcode.react'
import {Grid, Cell} from 'baseui/layout-grid';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';

const fallbackCopyTextToClipboard = (text) => {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}



const CopiedToClipboardMessage = () => <p>Copied to clipboard!</p>

const itemProps = {
  backgroundColor: 'mono300',
  height: 'scale2000',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

class LnUrlDisplay extends Component {

  constructor(props) { 
    super(props);
    // if (this.props.urlType === 'INVOICE') {
    //   const copyMessage = 'Copy Invoice' 
    //   const checkMessage = 'Check Payment'
    // } else {

    // }
    this.state = { copied: false };
    this.copyTextToClipboard = this.copyTextToClipboard.bind(this)
  }

  copyTextToClipboard(text) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text);
      return;
    }
    navigator.clipboard.writeText(text).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
    this.setState({copied: true})
  }

  render () {
    if (!this.props.lnurl) return null
  	return (
    	<div style={{marginTop: '10px'}}>
        <FlexGrid
          flexGridColumnCount={2}
          flexGridColumnGap="scale800"
          flexGridRowGap="scale800"
        >
          <FlexGridItem {...itemProps}>
      		  <Button color='primary' style={{margin: '10px'}} onClick={() => this.copyTextToClipboard(this.props.lnurl)}>Copy LNURL</Button>
        	</FlexGridItem>
          <FlexGridItem {...itemProps}>
            <QRCode value={this.props.lnurl} />
          </FlexGridItem>
        </FlexGrid>
      	<br />
      	<span style={{fontSize: '10px'}}>{this.props.lnurl}</span>
        { this.state.copied ? CopiedToClipboardMessage() : null }
    	</div>
      )
  }
}

export default LnUrlDisplay

