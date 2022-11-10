import React, { ChangeEvent, useState } from 'react';
import { ISymptom, ISymptomSuggestion, TNewEntryFn, TNewSymptomFn, TOnSymptomSuggestionSelectFn } from '../utils/types';
import Suggestions from './Suggestions';

const inputId = 'addEntryInput';
interface IAddEntryProps {
  onNewEntry: TNewEntryFn;
  onNewSymptom: TNewSymptomFn;
  knownSymptoms: ISymptom[];
}

const getOptionToAdd = (label: string): ISymptomSuggestion => ({
  id: '',
  label,
  toBeAdded: true,
});

export default function addEntry({ onNewEntry, onNewSymptom, knownSymptoms }: IAddEntryProps) {
  const [value, setValue] = useState<string | undefined>('');
  const [suggestions, setSuggestions] = useState<ISymptomSuggestion[] | undefined>(undefined);

  const handleChange = ({ currentTarget: { value: term } }: ChangeEvent<HTMLInputElement>) => {
    setValue(term);
    const lowCaseTerm = term.toLocaleLowerCase();
    const suggestions = knownSymptoms.filter(({ label }) => label.toLocaleLowerCase().includes(lowCaseTerm));
    const hasExactMatch = !!suggestions.find(({ label }) => label === term);
    if (!hasExactMatch) suggestions.push(getOptionToAdd(term));
    setSuggestions(suggestions);
  };

  const handleSelect: TOnSymptomSuggestionSelectFn = async ({ label, id: symptomId, toBeAdded }: ISymptomSuggestion) => {
    if (toBeAdded) {
      await onNewSymptom({ label });
    } else {
      await onNewEntry({ symptomId, timestamp: Date.now() });
    }
  };

  return (
    <div>
      <label htmlFor={inputId}>
        What&apos;s bothering you?
        <input type="text" id={inputId} value={value} onChange={handleChange} />
      </label>
      {suggestions && <Suggestions items={suggestions} onSelect={handleSelect} />}
    </div>
  );
}
