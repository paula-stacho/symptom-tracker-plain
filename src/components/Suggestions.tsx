import React from 'react';
import { ISymptomSuggestion, TOnSymptomSuggestionSelectFn } from '../utils/types';

interface ISuggestionsProps {
	onSelect: TOnSymptomSuggestionSelectFn;
	items: ISymptomSuggestion[];
}

export default function Suggestions({ items, onSelect }: ISuggestionsProps) {
	function handleSelect(suggestion: ISymptomSuggestion) {
		onSelect(suggestion).catch(error => console.error(error));
	}

	return (
		<>
			{
				items.map((suggestion) => 
					<button key={suggestion.id} onClick={() => handleSelect(suggestion)}>
						{suggestion.toBeAdded ? `Add ${suggestion.label}` : suggestion.label}
					</button>
				)
			}
		</>
	);
}