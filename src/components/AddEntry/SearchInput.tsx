import React from 'react';
import { TOnSearchFn } from '../../utils/types';
import { suggestionsId } from './Suggestions';

export const searchInputId = 'addEntryInput';

interface ISearchInputProps {
	value: string;
	onChange: TOnSearchFn;
}

export default function SearchInput({ value, onChange }: ISearchInputProps) {
	return (
		<input
			type="search"
			aria-owns={suggestionsId}
			id={searchInputId}
			value={value}
			onChange={({ currentTarget: { value } }) => onChange(value)} 
			/>
	);
}