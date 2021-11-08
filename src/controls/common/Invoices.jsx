import React from 'react';
import WalletPort from './WalletPort'
import { StyledLink } from "baseui/link";


const Refresh = () => {

  return (<label>
      After payment, <StyledLink href="#" onClick={() => {
        console.log('reloading')
        window.location.reload()
      }}>
        Refresh the page
      </StyledLink>
      
      </label>
    )
}
export const ReadInvoice = ({ title, author, price, paymentRequest }) => {
  return (<div style={{width: '25%'}}>
    <h2>🌧 Article is behind a paywall 🌧</h2>
      <div style={{border: '1px solid', padding: '10px'}}>
        <h3>Read Article: {title}</h3>
        <p>Author: {author}</p>
        <p>Price: {price.amount} {price.currency}</p>
      </div>
    <WalletPort connection={paymentRequest} />
    <Refresh />
  </div>)
}

export const PublishInvoice = ({ title, author, price, paymentRequest }) => {
  return (<div style={{width: '25%'}}>
    <h2>🌧 Pay to post 🌧</h2>
    <div style={{border: '1px solid', padding: '10px'}}>
      <h3>Publish Article: {title}</h3>
      <p>Price: {price.amount} {price.currency}</p>
    </div>
    <WalletPort connection={paymentRequest} />
    <Refresh />
</div>)
}

