import { ISymptom } from './types';
export const timestampToDateAndTime = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export const timestampToDate = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export const getSymptomLabels = (symptoms: ISymptom[]) => 
	symptoms.reduce((collection, { id, label }) => {
		collection[id] = label;
		return collection;
	}, {} as Record<string, string>);