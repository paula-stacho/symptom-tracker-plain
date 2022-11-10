export interface INewSymptom {
	label: string;
}
export interface ISymptom extends INewSymptom {
	id: string;
}
export interface INewEntry {
	timestamp: number;
	symptomId: string;
}

export interface IEntry extends INewEntry {
	id: string;
}

export interface ISymptomSuggestion extends ISymptom {
  toBeAdded?: boolean;
}

export type TOnSymptomSuggestionSelectFn = (symptomSuggestion: ISymptomSuggestion) => Promise<void>;

export type TNewEntryFn = (entry: INewEntry) => Promise<void>;

export type TNewSymptomFn = (symptom: INewSymptom) => Promise<void>;
