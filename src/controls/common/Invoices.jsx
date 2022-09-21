import React, {useEffect} from 'react';
import WalletPort from './WalletPort'
import { StyledLink } from "baseui/link";
import { requestProvider } from 'webln';

const detailsStyle = {border: '1px solid', margin: '10px', padding: '10px'}

// TODO - remove this manual bs
const Refresh = () => {
  return (
    <label>
      After payment, <StyledLink href="#" onClick={() => {
        window.location.reload()
      }}>
        Refresh the page
      </StyledLink>
      
      </label>
    )
}

const ReadDetails = ({ title, author, price }) => {
  return <div style={detailsStyle}>
      <h3>{title}</h3>
      <p>Author: {author}</p>
      <p>Price: {price.amount} {price.currency}</p>
    </div>
}

const PublishDetails = ({ title, price }) => {
  return <div style={detailsStyle}>
      <h3>Publish: {title}</h3>
      <p>Price: {price.amount} {price.currency}</p>
    </div>
}

//type K = keyof Interface;

// const TYPES = [
//   { type: 'READ', renderDetails: (details) => return (<ReadDetails {...details} />) },
//   { type: 'WRITE', renderDetails: (details) => <PublishDetails {...details} /> }
// ]

// const weblnPayment = 
const Invoice = ({ type, paymentDetails, paymentRequest }) => {
  useEffect(() => {
    const weblnPayment = async () => {
      let webln;
      try {
          webln = await requestProvider();
          const resp = await webln.sendPayment(paymentRequest);
          window.location.reload()
        } catch (err) {
          console.log(err)
          return
        }
    }
    weblnPayment()
  }, [paymentRequest])
    
  let details;
  switch(type) {
    case 'read':
      details = <ReadDetails {...paymentDetails} />;
      break;
    case 'publish':
      details = <PublishDetails {...paymentDetails} />;
      break;
    default:
      details = null;
  }
  return (<div style={{width: '50%'}}>
    { details }
    <WalletPort type='invoice' connection={paymentRequest} />
    <Refresh />
</div>)
}

export default Invoice

