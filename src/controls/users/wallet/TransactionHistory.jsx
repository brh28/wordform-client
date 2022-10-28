import React from 'react';
import { Table, SIZE, DIVIDER } from "baseui/table-semantic";
import { FormControl } from "baseui/form-control";

const TransactionHistory = ({ withdrawals }) => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };   
	const withdrawalsSortedArr = withdrawals && withdrawals.map(w => {
		return [
			w.settle_timestamp ? new Date(w.settle_timestamp).toLocaleDateString('en-US', options) : '',
			w.type || '',
			w.value_sat || '',
			w.destination || '',
			w.payment_hash || ''
		]
	})

	if (!withdrawals || withdrawals.length === 0) return null
	return (
		<FormControl label="Withdrawal History">
			<Table columns={["Date", "Type", "Amount (sats)", "Destination", "Payment Hash"]}
				data={withdrawalsSortedArr}
				size={SIZE.compact}
	      		divider={DIVIDER.grid} />
	    </FormControl>
	)
}

export default TransactionHistory