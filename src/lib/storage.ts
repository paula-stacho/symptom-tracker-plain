import { ISymptom, IEntry, INewSymptom, INewEntry } from './../utils/types';
import { getAll, saveOne } from "./firebase/firebaseStorage";
import { Collection } from './firebase/types';

interface IStorage {
	addSymptom: (symptom: INewSymptom) => Promise<string>;
	getSymptoms: () => Promise<ISymptom[]>;
	addEntry: (entry: INewEntry) => Promise<string>;
	getEntries: () => Promise<IEntry[]>;
}

async function addSymptom(symptom: ISymptom) {
	return await saveOne<ISymptom>(Collection.SYMPTOMS, symptom);
}

async function getSymptoms() {
	return await getAll<ISymptom>(Collection.SYMPTOMS);
}

async function addEntry(entry: IEntry): Promise<string> {
	return await saveOne<IEntry>(Collection.ENTRIES, entry);
}

async function getEntries() {
	return await getAll<IEntry>(Collection.ENTRIES);
}

const firebaseStorage: IStorage = {
	addSymptom,
	getSymptoms,
	addEntry,
	getEntries,
};

export default firebaseStorage;