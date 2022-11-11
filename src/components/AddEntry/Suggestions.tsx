import React from 'react';
import { ISymptomSuggestion, TOnSymptomSuggestionSelectFn } from '../../utils/types';

export const suggestionsId = 'entry-search-suggestions';

interface ISuggestionsProps {
	onSelect: TOnSymptomSuggestionSelectFn;
	items?: ISymptomSuggestion[];
}

export default function Suggestions({ items = [], onSelect }: ISuggestionsProps) {
	function handleSelect(suggestion: ISymptomSuggestion) {
		onSelect(suggestion).catch(error => console.error(error));
	}

	return (
		<datalist id={suggestionsId}>
			{
				items.map((suggestion) => 
					<option
						key={suggestion.id}
						onClick={() => handleSelect(suggestion)}
						value={suggestion.label}
					>
						{suggestion.toBeAdded ? `New Symptom: ${suggestion.label}` : suggestion.label}
					</option>
				)
			}
		</datalist>
	);
}