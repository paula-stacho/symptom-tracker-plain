import React from 'react';
import { ISymptomSuggestion, TOnSymptomSuggestionSelectFn } from '../../utils/types';

export const suggestionsId = 'entry-search-suggestions';

interface ISuggestionsProps {
	onSelect: TOnSymptomSuggestionSelectFn;
	items: ISymptomSuggestion[];
}

export default function Suggestions({ items, onSelect }: ISuggestionsProps) {
	function handleSelect(suggestion: ISymptomSuggestion) {
		onSelect(suggestion).catch(error => console.error(error));
	}

	return (
		<ul id={suggestionsId} style={{ position: 'fixed', padding: '0px', marginTop: '0px', border: '1px solid #ccc' }}>
			{
				items.map((suggestion) => 
					<li key={suggestion.id}>
						<button 
							style={{ width: '100%', listStyle: 'none', background: '#fff', border: 'none', borderBottom: '1px solid #ccc', padding: '0.3em' }}
							onClick={() => handleSelect(suggestion)}
							>
							{suggestion.toBeAdded ? `New Symptom: ${suggestion.label}` : suggestion.label}
						</button>
					</li>
				)
			}
		</ul>
	);
}