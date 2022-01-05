import React, {Component} from 'react';
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import QRCode from 'qrcode.react'
import {Grid, Cell} from 'baseui/layout-grid';
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import { FormControl } from "baseui/form-control";
import Check from 'baseui/icon/check'

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

const wideItemProps = {
  ...itemProps,
  overrides: {
    Block: {
      style: ({$theme}) => ({
        width: `calc((200% - ${$theme.sizing.scale800}) / 3)`,
      }),
    },
  },
};

// A port hosts the connection to external devices
class WalletPort extends Component {

  constructor(props) { 
    super(props);
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
    setTimeout(() => this.setState({copied: false}) , 2000)
  }

  render () {
    if (!this.props.connection) return null
  	return (
    	<div style={{marginTop: '10px'}}>
        <FlexGrid
          flexGridColumnCount={2}
        >
          <FlexGridItem {...itemProps}>
            <Button color='primary' style={{margin: '10px'}} endEnhancer={() => this.state.copied ? <Check size={28} /> : null} onClick={() => this.copyTextToClipboard(this.props.connection)}>{this.state.copied ? "Copied" : "Copy"}</Button>
          </FlexGridItem>
          <FlexGridItem {...itemProps}>
            <QRCode title="Scan" value={this.props.connection} />
          </FlexGridItem>
          <FlexGridItem {...wideItemProps}>
{/*            <FormControl caption="Connect">
*/}              <Textarea disabled value={this.props.connection} />
            {/*</FormControl>*/}
          </FlexGridItem>
          <FlexGridItem {...itemProps} display="none" />
        </FlexGrid>
      	<br />
    	</div>
      )
  }
}

export default WalletPort

