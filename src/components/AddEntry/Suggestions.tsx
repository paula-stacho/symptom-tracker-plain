import React from 'react';
import { softBox } from '../../utils/styles';
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
		<ul id={suggestionsId} style={ContainerStyle}>
			{
				items.map((suggestion) => 
					<li key={suggestion.id} style={SuggestionStyle}>
						<button 
							style={ButtonStyle}
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

const ContainerStyle = {
	border: '1px solid #ccc',
	columnGap: '0.5em',
	display: 'grid',
	gridAutoFlow: 'column',
	justifyContent: 'start',
	marginTop: '0px',
	padding: '0px',
};

const SuggestionStyle = {
	listStyle: 'none',
	padding: '0px',
};

const ButtonStyle = {
	background: '#fff',
	border: 'none',
	cursor: 'pointer',
	padding: '0.3em',
	width: '100%',
	...softBox,
};