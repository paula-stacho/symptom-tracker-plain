import React, { FC } from 'react';
import { softBox } from '../../utils/styles';
import { ISymptomSuggestion, TOnSymptomSuggestionSelectFn } from '../../utils/types';

export const suggestionsId = 'entry-search-suggestions';

interface ISuggestionsProps {
	onSelect: TOnSymptomSuggestionSelectFn;
	items: ISymptomSuggestion[];
}

const Suggestions: FC<ISuggestionsProps> = ({ items, onSelect }) => {
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
							{suggestion.toBeAdded ? <i>{`+ New Symptom: ${suggestion.label}`}</i> : suggestion.label}
						</button>
					</li>
				)
			}
		</ul>
	);
};

const ContainerStyle = {
	marginTop: '0px',
	padding: '0px',
};

const SuggestionStyle = {
	display: 'inline',
	listStyle: 'none',
	padding: '0px',
};

const ButtonStyle = {
	...softBox,
	background: '#fff',
	border: 'none',
	cursor: 'pointer',
	padding: '0.5em 1em',
	marginLeft: '1em',
	marginBottom: '1em',
};

export default Suggestions;