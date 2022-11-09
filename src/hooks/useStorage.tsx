import React, { useState, useEffect } from "react";
import { getEntries, getSymptoms, addEntry, addSymptom } from "../lib/storage";
import { IEntry, ISymptom } from "../utils/types";

export interface IStorage {
	entries: IEntry[],
	addEntry: (entry: IEntry) => Promise<void>,
	symptoms: ISymptom[],
	addSymptom: (symptom: ISymptom) => Promise<void>,
	storageError?: string,
	isLoading: boolean,
}

const enum ErrorMessage {
	LOAD = 'I am having some trouble loading data :(',
	SAVE = 'I am having some trouble saving your changes :(',
}

export default function useStorage(): IStorage {
	const [entries, setEntries] = useState<IEntry[]>([]);
  const [symptoms, setSymptoms] = useState<ISymptom[]>([]);
	const [storageError, setStorageError] = useState<string | undefined>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		/* eslint-disable @typescript-eslint/no-floating-promises */
		(async () => {
			try {
				setIsLoading(true);

				const initialEntries = await getEntries();
				setEntries(initialEntries);

				const initialSymptoms = await getSymptoms();
				setSymptoms(initialSymptoms);

				setIsLoading(false);
			} catch (error) {
				setStorageError(ErrorMessage.LOAD);
			}
		})();
	}, []);

	const handleAddEntry = async (entry: IEntry) => {
		try {
			await addEntry(entry);
			setEntries([...entries, entry]);
		} catch (error) {
			setStorageError(ErrorMessage.SAVE);
		}
	}

	const handleAddSymptom = async (symptom: ISymptom) => {
		try {
			await addSymptom(symptom);
			setSymptoms([...symptoms, symptom]);
		} catch (error) {
			setStorageError(ErrorMessage.SAVE);
		}
	}

	return { entries, addEntry: handleAddEntry, symptoms, addSymptom: handleAddSymptom, storageError, isLoading };
}