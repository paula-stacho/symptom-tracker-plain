import React from 'react';
import { softBox } from '../../utils/styles';
import { TOnSearchFn } from '../../utils/types';
import { suggestionsId } from './Suggestions';

export const searchInputId = 'addEntryInput';

interface ISearchInputProps {
	value: string;
	onChange: TOnSearchFn;
}

const enum Text {
  PLACEHOLDER = 'What\'s bothering you?',
}

export default function SearchInput({ value, onChange }: ISearchInputProps) {
	return (
		<input
			type="search"
			aria-owns={suggestionsId}
			id={searchInputId}
			value={value}
			onChange={({ currentTarget: { value } }) => onChange(value)} 
			placeholder={Text.PLACEHOLDER}
			style={InputStyle}
			/>
	);
}

const InputStyle = {
	border: 'none',
	...softBox, 
};