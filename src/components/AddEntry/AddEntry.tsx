import React, { useState } from 'react';
import Color from '../../utils/colorScheme';
import { softBox } from '../../utils/styles';
import { ISymptom, ISymptomSuggestion, TNewEntryFn, TNewSymptomFn, TOnSymptomSuggestionSelectFn } from '../../utils/types';
import SearchInput, { searchInputId } from './SearchInput';
import Suggestions from './Suggestions';

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
    const lowCaseTerm = term.toLocaleLowerCase();
    const suggestions = knownSymptoms.filter(({ label }) => label.toLocaleLowerCase().includes(lowCaseTerm));
    const hasExactMatch = !!suggestions.find(({ label }) => label === term);
    if (!hasExactMatch) suggestions.push(getOptionToAdd(term));
    setSuggestions(suggestions);
  };

  const handleSelect: TOnSymptomSuggestionSelectFn = async ({ label, id: symptomId, toBeAdded }: ISymptomSuggestion) => {
    let newId: string;
    if (toBeAdded) {
      newId = await onNewSymptom({ label });
    }
    await onNewEntry({ symptomId: newId || symptomId, timestamp: Date.now() });
  };

  return (
    <div style={ContainerStyle}>
      <SearchInput value={value} onChange={handleSearch} />
      {suggestions && <Suggestions items={suggestions} onSelect={handleSelect} />}
    </div>
  );
}

const ContainerStyle = {
  alignItems: 'start',
  backgroundColor: Color.PRIMARY,
  columnGap: '2em',
  display: 'grid',
  gridTemplateColumns: '20em auto',
  marginBottom: '1em',
  minHeight: '5em',
  ...softBox,
};
