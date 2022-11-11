import React, { useState, FC } from 'react';
import Color from '../../utils/colorScheme';
import { softBox } from '../../utils/styles';
import { ISymptom, ISymptomSuggestion, TNewEntryFn, TNewSymptomFn, TOnSymptomSuggestionSelectFn } from '../../utils/types';
import SearchInput from './SearchInput';
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

const AddEntry: FC<IAddEntryProps> = ({ onNewEntry, onNewSymptom, knownSymptoms }) => {
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
    const hasExactMatch = !!suggestions.find(({ label }) => label === term);
    if (!!term && !hasExactMatch) suggestions.push(getOptionToAdd(term));
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
    <div style={ContainerStyle}>
      <SearchInput value={value} onChange={handleSearch} />
      {suggestions && <Suggestions items={suggestions} onSelect={handleSelect} />}
    </div>
  );
};

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

export default AddEntry;
