import { render, screen } from '@testing-library/react';
import React from 'react';
import ErrorMessage from '../ErrorMessage';

describe('<ErrorMessage/>', () => {

	it('Renders the message', () => {
		const message = 'This is an error';
		render(<ErrorMessage>{message}</ErrorMessage>);
		expect(screen.getByText(message)).toBeInTheDocument();
	});

});