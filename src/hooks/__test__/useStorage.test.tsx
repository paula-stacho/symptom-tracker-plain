import React, { FC, useEffect } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockSymptoms, { otherPainId } from '../../../test/fixtures/symptoms';
import mockEntries from '../../../test/fixtures/entries';
import useStorage from '../useStorage';
import storage from '../../lib/storage';

const newSymptom = {
	label: 'radiating light',
};
const newSymptomId = 'abc';
const newEntry = {
	timestamp: 1668174979510,
	symptomId: otherPainId,
}
const newEntryId = 'cba';

jest.mock('../../lib/storage', () => ({
	getEntries: jest.fn().mockResolvedValue(mockEntries),
	getSymptoms: jest.fn().mockResolvedValue(mockSymptoms),
	addEntry: jest.fn().mockResolvedValue(newSymptomId),
	addSymptom: jest.fn().mockResolvedValue(newEntryId),
}));

describe('useStorage', () => {

	const storageUpdate = jest.fn();

	const TestComponent: FC = () => {
		const { entries, addEntry, symptoms, addSymptom, storageError, isLoading } = useStorage();

		useEffect(() => {
		storageUpdate({ entries, symptoms, storageError, isLoading });
		}, [entries, symptoms, storageError, isLoading]);

		return (
			<>
				<button onClick={() => addEntry(newEntry)}>addEntry</button>
				<button onClick={() => addSymptom(newSymptom)}>addSymptom</button>
			</>
		);
	};

	it('Provides entries and symptoms', async () => {
		render(<TestComponent />);
		await waitFor(() => {
			expect(storageUpdate).toHaveBeenCalledWith(expect.objectContaining({ entries: mockEntries, symptoms: mockSymptoms }));
		});
	});

	it('Loads entries and symptoms at first render', async () => {
		render(<TestComponent />);
		await waitFor(() => {
			expect(storageUpdate).toHaveBeenNthCalledWith(1, expect.objectContaining({ entries: [], symptoms: [], isLoading: false }));
			expect(storageUpdate).toHaveBeenNthCalledWith(2, expect.objectContaining({ entries: [], symptoms: [], isLoading: true })); // starts loading
			expect(storageUpdate).toHaveBeenNthCalledWith(3, expect.objectContaining({ entries: mockEntries, symptoms: mockSymptoms, isLoading: false })); // done
		});
	});

	it('Handles addEntry', async () => {
		render(<TestComponent />);
		const addEntryBtn = screen.getByRole('button', { name: 'addEntry' });
		fireEvent.click(addEntryBtn);
		const newEntries = [...mockEntries, { ...newEntry, id: newEntryId }];
		const addEntrySpy = jest.spyOn(storage, 'addEntry').mockResolvedValue(newEntryId);

		await waitFor(() => {
			expect(addEntrySpy).toHaveBeenCalledWith(newEntry);
			// expect(storageUpdate).toHaveBeenCalledWith(expect.objectContaining({ entries: newEntries })); // TODO: fix
		});
	});

	it('Handles addSymptom', async () => {
		render(<TestComponent />);
		const addSymptomBtn = screen.getByRole('button', { name: 'addSymptom' });
		fireEvent.click(addSymptomBtn);
		const newSymptoms = [...mockSymptoms, { ...newSymptom, id: newSymptomId }];
		const addSymptomSpy = jest.spyOn(storage, 'addSymptom').mockResolvedValue(newSymptomId);

		await waitFor(() => {
			expect(addSymptomSpy).toHaveBeenCalledWith(newSymptom);
			// expect(storageUpdate).toHaveBeenCalledWith(expect.objectContaining({ symptoms: newSymptoms })); // TODO: fix
		});
	});

});