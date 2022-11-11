import React, { useState, FocusEvent } from 'react';
import { ISymptom, ISymptomSuggestion, TNewEntryFn, TNewSymptomFn, TOnSymptomSuggestionSelectFn } from '../../utils/types';
import SearchInput, { searchInputId } from './SearchInput';
import Suggestions, { suggestionsId } from './Suggestions';

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
  const handleSearch = (term: string) => {
    setValue(term);

    if (!term) { 
      setSuggestions([]);
      return; 
    }

    const lowCaseTerm = term.toLocaleLowerCase();
    const suggestions = knownSymptoms.filter(({ label }) => label.toLocaleLowerCase().includes(lowCaseTerm));
    const hasExactMatch = !!suggestions.find(({ label }) => label.toLocaleLowerCase() === lowCaseTerm);
    if (!hasExactMatch) suggestions.push(getOptionToAdd(term));
    setSuggestions(suggestions);
  };

  const handleSelect: TOnSymptomSuggestionSelectFn = async ({ label, id: symptomId, toBeAdded }: ISymptomSuggestion) => {
    let newId: string;
    if (toBeAdded) {
      newId = await onNewSymptom({ label });
    }
    await onNewEntry({ symptomId: newId || symptomId, timestamp: Date.now() });
    setSuggestions([]);
  };

  return (
    <div style={{ marginBottom: '1em' }}>
      <div><label htmlFor={searchInputId as string}>What&apos;s bothering you?</label></div>
      <SearchInput
        value={value}
        onChange={handleSearch}
        dataList={suggestionsId}
        />
      <Suggestions items={suggestions} onSelect={handleSelect} />
    </div>
  );
}
