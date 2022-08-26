
export interface ISymptomOption {
	key: string;
	label: string;
}

export type TSearchSymptomFn = (term: string) => void;

export type TOnSymptomSelectFn = (key: string) => void;