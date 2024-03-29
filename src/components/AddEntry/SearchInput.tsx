import React, { FC } from 'react';
import Color from '../../utils/colorScheme';
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

const SearchInput: FC<ISearchInputProps> = ({ value, onChange }) => {
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
};

const InputStyle = {
	border: `1px ${Color.PRIMARY} solid`,
	...softBox, 
};

export default SearchInput;