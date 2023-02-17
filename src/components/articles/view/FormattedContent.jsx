import React from 'react';

const FormattedContent = ({content, style}) => {
	return (<div style={{ ...style, maxWidth: '800px', lineHeight: '1.6', marginBottom: '10px' }} className="" dangerouslySetInnerHTML={{__html: content}}>		
	</div>)
}

export default FormattedContent