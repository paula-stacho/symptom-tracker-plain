import { ISymptom, IEntry } from './../utils/types';
import { getAll, saveOne } from "./firebase/firebaseStorage";
import { Collection } from './firebase/types';

export async function addSymptom(symptom: ISymptom) {
	return await saveOne<ISymptom>(Collection.SYMPTOMS, symptom);
}

export async function getSymptoms() {
	return await getAll<ISymptom>(Collection.SYMPTOMS);
}

export async function addEntry(entry: IEntry) {
	return await saveOne<IEntry>(Collection.ENTRIES, entry);
}

export async function getEntries() {
	return await getAll<IEntry>(Collection.ENTRIES);
}