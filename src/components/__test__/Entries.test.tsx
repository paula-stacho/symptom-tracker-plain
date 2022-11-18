import { render, screen } from '@testing-library/react';
import React from 'react';
import entries, { formattedTimestamp1 } from '../../../test/fixtures/entries';
import symptoms, { headacheLabel, otherPainLabel } from '../../../test/fixtures/symptoms';
import Entries from '../Entries';

describe('<Entries/>', () => {

	it('Renders all the entries - headache, headache and other ache', () => {
		render(<Entries entries={entries} knownSymptoms={symptoms} />);
		const headaches = screen.getAllByText(headacheLabel);
		expect(headaches).toHaveLength(2);
		const otherPain = screen.getAllByText(otherPainLabel);
		expect(otherPain).toHaveLength(1);
	});

	it('Renders a formatted timestamp', () => {
		render(<Entries entries={entries} knownSymptoms={symptoms} />);
		expect(screen.getByText(formattedTimestamp1)).toBeInTheDocument();
	}); // TODO: move formatting of timestamps to libs and test separately

});