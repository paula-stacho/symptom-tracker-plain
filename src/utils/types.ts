export type TSymptomKey = string;

export interface ISymptomOption {
	key: TSymptomKey;
	label: string;
}
export interface IEntry {
	timestamp: number;
	symptomKey: TSymptomKey;
}

export type TSearchSymptomFn = (term: string) => void;

export type TOnSymptomSelectFn = (key: string) => void;

export type TNewEntryFn = (entry: IEntry) => void;
