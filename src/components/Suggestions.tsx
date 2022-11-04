import React from 'react';
import { ISymptomOption, TOnSymptomSelectFn } from '../utils/types';

interface ISuggestionsProps {
	onSelect: TOnSymptomSelectFn;
	items: ISymptomOption[];
}

export default function Suggestions({ items, onSelect }: ISuggestionsProps) {
	if (!items.length) {
		return <>Never heard of it!</>;
	}
	
	return (
		<>
			{
				items.map(({ key, label }) => 
					<button key={key} onClick={() => onSelect(key)}>
						{label}
					</button>
				)
			}
		</>
	);
}