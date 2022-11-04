import React, { useState } from 'react';
import AddEntry from './components/AddEntry';
import Entries from './components/Entries';
import { IEntry, ISymptomOption, TNewEntryFn, TSearchSymptomFn } from './utils/types';

export default function App() {
  const existingSymptomsMock: ISymptomOption[] = [
    { key: 'headache', label: 'headache' },
    { key: 'other', label: 'something else' },
  ];
  const [addEntrySuggestions, setAddEntrySuggestions] = useState<ISymptomOption[] | undefined>(undefined);
  const [entries, setEntries] = useState<IEntry[]>([]);

  const handleSearch: TSearchSymptomFn = (term: string) => {
    if (!term) return setAddEntrySuggestions(undefined);

    const results = existingSymptomsMock.filter(({ label }) => label.includes(term));
    setAddEntrySuggestions(results);
  }

  const handleNewEntry: TNewEntryFn = (entry: IEntry) => {
    setEntries([...entries, entry]);
  }

  return (
    <>
      <AddEntry onSearch={handleSearch} searchResults={addEntrySuggestions} onNewEntry={handleNewEntry} />
      <Entries entries={entries} knownSymptoms={existingSymptomsMock} />
    </>
  );
}
