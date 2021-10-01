import React from 'react';
import LnUrlDisplay from './LnUrlDisplay'

export const ReadArticle = ({ title, author, price, paymentRequest }) => {
  return (<div style={{width: '25%'}}>
    <h2>This article requires a payment to the author</h2>
      <div style={{border: '1px solid', padding: '10px'}}>
        <h3>Read Article: {title}</h3>
        <p>Author: {author}</p>
        <p>Price: {price} Sats</p>
      </div>
    <LnUrlDisplay lnurl={paymentRequest} />
{/*    <Button onClick={this.checkPayment} color="primary">Check</Button>
*/}  </div>)
}

export const PublishInvoice = ({ title, author, price, paymentRequest }) => {
  return (<div style={{width: '25%'}}>
    <div style={{border: '1px solid', padding: '10px'}}>
      <h3>Publish Article: {title}</h3>
      <p>Price: {price} Sats</p>
    </div>
    <LnUrlDisplay lnurl={paymentRequest} />
{/*    <Button onClick={this.checkPayment} color="primary">Check</Button>
*/}  </div>)
}

