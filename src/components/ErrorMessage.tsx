import React, { FC, ReactNode } from 'react';
import Color from '../utils/colorScheme';

const ErrorMessage: FC<{ children: ReactNode }> = ({ children }) => {
	return (<div style={ErrorMessageStyle}>{children}</div>);
};

const ErrorMessageStyle = {
	color: Color.RED,
};

export default ErrorMessage;