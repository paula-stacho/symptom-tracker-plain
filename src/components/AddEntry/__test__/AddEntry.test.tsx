import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import symptoms, { headacheLabel, otherPainId, otherPainLabel } from '../../../../test/fixtures/symptoms';
import AddEntry from '../AddEntry';

describe('<AddEntry/>', () => {

	const props = {
		onNewEntry: jest.fn(),
		onNewSymptom: jest.fn(),
		knownSymptoms: symptoms,
	};

	it('Provides a searchbox', () => {
		render(<AddEntry {...props} />);
		const input = screen.getByRole('searchbox');

		expect(input).toBeInTheDocument();
	});

	// TODO: https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
	it('Scenario: known symptom - other pain', async () => {
		render(<AddEntry {...props} />);
		const input = await screen.findByRole('searchbox');
		const { onNewEntry } = props;

		fireEvent.change(input, { target: { value: 'ache' } });
		const headacheSuggestion = screen.getByRole('button', { name: headacheLabel });
		const otherPainSuggestion = screen.getByRole('button', { name: otherPainLabel });

		expect(headacheSuggestion).toBeInTheDocument();
		expect(otherPainSuggestion).toBeInTheDocument();

		fireEvent.click(otherPainSuggestion);
		expect(onNewEntry).toHaveBeenCalledWith(expect.objectContaining({ symptomId: otherPainId }));
	});

	it('Scenario: unknown symptom', async () => {
		render(<AddEntry {...props} />);
		const input = await screen.findByRole('searchbox');
		const newSymptom = 'growing tentacles';
		const newSymptomId = 'abc';
		const { onNewSymptom, onNewEntry } = props;
		onNewSymptom.mockResolvedValueOnce(newSymptomId);

		fireEvent.change(input, { target: { value: newSymptom } });
		// note: search has to be regexp because the match is not exact. using `exact: false` did not work
		const addNewOption = screen.getByRole('button', { name: new RegExp(newSymptom) });

		expect(addNewOption).toBeInTheDocument();

		fireEvent.click(addNewOption);
		expect(onNewSymptom).toHaveBeenCalledWith({ label: newSymptom });
		await waitFor(() => {
			expect(onNewEntry).toHaveBeenCalledWith(expect.objectContaining({ symptomId: newSymptomId }));
		});
	});

});