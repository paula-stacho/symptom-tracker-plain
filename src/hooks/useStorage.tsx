import React, { useState, useEffect } from "react";
import storage from "../lib/storage";
import { IEntry, INewEntry, INewSymptom, ISymptom } from "../utils/types";

export interface IStorage {
	entries: IEntry[],
	addEntry: (entry: INewEntry) => Promise<void>
	symptoms: ISymptom[],
	addSymptom: (symptom: INewSymptom) => Promise<void>,
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

				const initialEntries = await storage.getEntries();
				setEntries(initialEntries);

				const initialSymptoms = await storage.getSymptoms();
				setSymptoms(initialSymptoms);

				setIsLoading(false);
			} catch (error) {
				setStorageError(ErrorMessage.LOAD);
			}
		})();
	}, []);

	const handleAddEntry = async (entry: IEntry) => {
		try {
			const id = await storage.addEntry(entry);
			setEntries([...entries, { ...entry, id }]);
		} catch (error) {
			setStorageError(ErrorMessage.SAVE);
		}
	};

	const handleAddSymptom = async (symptom: ISymptom) => {
		try {
			const id = await storage.addSymptom(symptom);
			setSymptoms([...symptoms, { ...symptom, id }]);
		} catch (error) {
			setStorageError(ErrorMessage.SAVE);
		}
	};

	return { entries, addEntry: handleAddEntry, symptoms, addSymptom: handleAddSymptom, storageError, isLoading };
}