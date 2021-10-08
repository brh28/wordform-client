import React from 'react';
import { Notification, KIND } from "baseui/notification";

export const Error = ({ message }) => {
	return (
    <Notification kind={KIND.negative}>
      {message}
    </Notification>
  );
}