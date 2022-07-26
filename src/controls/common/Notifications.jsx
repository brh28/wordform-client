import React from 'react';
import { Notification as BaseUINotification, KIND } from "baseui/notification";

export const Success = ({ message }) => <Notification message={message} kind={KIND.positive} />

export const Error = ({ message }) => <Notification message={message} kind={KIND.negative} />

export const Info = ({ message }) => <Notification message={message} />

const Notification = ({ message, kind }) => {
	if (!message)
		return null
	else {
	return (
	    <BaseUINotification kind={kind}>
	      {message}
	    </BaseUINotification>
 	 );
	}
}