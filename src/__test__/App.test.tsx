import React from 'react';
import { render, act } from '@testing-library/react';
import App from '../App';

describe('App', () => {

	it('renders', async () => {
		await act(async () => {
			await render(<App />);
		});
	});

});