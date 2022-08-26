import React, { ChangeEvent, useState } from 'react';
import { ISymptomOption, TOnSymptomSelectFn, TSearchSymptomFn } from '../utils/types';
import Suggestions from './Suggestions';

const inputId = 'addPointInput';


interface IAddPointProps {
	onSearch: TSearchSymptomFn;
  searchResults: ISymptomOption[] | undefined;
}

export default function AddPoint({ onSearch, searchResults }: IAddPointProps) {
  const [value, setValue] = useState<string>('');
  const handleChange = ({ currentTarget: { value: term } }: ChangeEvent<HTMLInputElement>) => {
    setValue(term);
    onSearch(term);
  };
  const handleSelect: TOnSymptomSelectFn = () => undefined;
  return (
    <>
      <label htmlFor={inputId}>
        What&apos;s bothering you?
        <input type="text" id={inputId} value={value} onChange={handleChange} />
      </label>
      {searchResults && <Suggestions items={searchResults} onSelect={handleSelect} />}
    </>
  );
}
