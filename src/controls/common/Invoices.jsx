import React from 'react';
import WalletPort from './WalletPort'
import { StyledLink } from "baseui/link";


const Refresh = () => {

  return (
    <label>
      After payment, <StyledLink href="#" onClick={() => {
        console.log('reloading')
        window.location.reload()
      }}>
        Refresh the page
      </StyledLink>
      
      </label>
    )
}

export const InvoiceDetails = ({ title, author, price }) => {
  return <div style={detailsStyle}>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Price: {price.amount} {price.currency}</p>
    </div>
}

const detailsStyle = {border: '1px solid', margin: '10px', padding: '10px'}

export const ReadInvoice = ({ title, author, price, paymentRequest }) => {
  return (<div style={{width: '50%'}}>
    <InvoiceDetails title={title} author={author} price={price} />
    <WalletPort type='invoice' connection={paymentRequest} />
    <Refresh />
  </div>)
}

export const PublishInvoice = ({ title, author, price, paymentRequest }) => {
  return (<div style={{width: '50%'}}>
    <div style={detailsStyle}>
      <h3>Publish Article</h3>
      <p>Price: {price.amount} {price.currency}</p>
    </div>
    <WalletPort type='invoice' connection={paymentRequest} />
    <Refresh />
</div>)
}

