import React, {Component} from 'react';
import { Button } from "baseui/button";
import { Textarea } from "baseui/textarea";
import { SIZE } from "baseui/input";
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
  } catch (err) {
    console.error('Unable to copy', err);
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
      this.setState({copied: true})
      setTimeout(() => this.setState({copied: false}) , 2000)
    } else {
      navigator.clipboard.writeText(text).then(() => { 
        this.setState({copied: true})
        setTimeout(() => this.setState({copied: false}) , 2000)
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  }



  render () {
    const label = () => {
      if (this.state.copied) return 'Copied'
      else if (this.props.type == 'invoice') return 'Copy invoice'
      else return 'Copy'
    }

    if (!this.props.connection) return null
    const qrLink = `lightning:${this.props.connection}`
  	return (
        <FlexGrid>
          <FlexGridItem {...itemProps}>
            <a style={{  marginTop: '10px', cursor: 'pointer', textDecoration: 'none' }} href={qrLink}>
              <QRCode title="Scan" value={qrLink} />
            </a>
          </FlexGridItem>
          <FlexGridItem {...itemProps}>
            <Button color='primary' style={{margin: '10px'}} endEnhancer={() => this.state.copied ? <Check size={28} /> : null} onClick={() => this.copyTextToClipboard(this.props.connection)}>{label()}</Button>
          </FlexGridItem>
          <FlexGridItem {...wideItemProps}>
              <Textarea disabled size={SIZE.mini} value={this.props.connection} />
          </FlexGridItem>
          <FlexGridItem {...itemProps} display="none" />
        </FlexGrid>
      )
  }
}

export default WalletPort

