import React, { ChangeEvent, useState } from 'react';
import { ISymptom, TNewEntryFn, TOnSymptomSelectFn, TSearchSymptomFn, TSymptomKey } from '../utils/types';
import Suggestions from './Suggestions';

const inputId = 'addEntryInput';


interface IAddEntryProps {
	onSearch: TSearchSymptomFn;
  onNewEntry: TNewEntryFn;
  searchResults?: ISymptom[];
}

export default function addEntry({ onSearch, searchResults, onNewEntry }: IAddEntryProps) {
  const [value, setValue] = useState<string>('');
  const handleChange = ({ currentTarget: { value: term } }: ChangeEvent<HTMLInputElement>) => {
    setValue(term);
    onSearch(term);
  };
  const handleSelect: TOnSymptomSelectFn = (symptomKey: TSymptomKey) => {
    onNewEntry({ symptomKey, timestamp: Date.now() });
  };
  return (
    <div>
      <label htmlFor={inputId}>
        What&apos;s bothering you?
        <input type="text" id={inputId} value={value} onChange={handleChange} />
      </label>
      {searchResults && <Suggestions items={searchResults} onSelect={handleSelect} />}
    </div>
  );
}
