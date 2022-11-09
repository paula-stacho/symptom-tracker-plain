import React, { useState } from 'react';
import AddEntry from './components/AddEntry';
import Entries from './components/Entries';
import ErrorMessage from './components/ErrorMessage';
import useStorage from './hooks/useStorage';
import { IEntry, ISymptom, TNewEntryFn, TSearchSymptomFn } from './utils/types';

export default function App() {
  const [addEntrySuggestions, setAddEntrySuggestions] = useState<ISymptom[] | undefined>(undefined);
  const { entries, addEntry, symptoms, addSymptom, storageError, isLoading } = useStorage();

  const handleSearch: TSearchSymptomFn = (term: string) => {
    if (!term) return setAddEntrySuggestions(undefined);

    const results = symptoms.filter(({ label }) => label.includes(term));
    setAddEntrySuggestions(results);
  };

  return (
    <>
      <AddEntry onSearch={handleSearch} searchResults={addEntrySuggestions} onNewEntry={addEntry} />
      <Entries entries={entries} knownSymptoms={symptoms} />
      {storageError && <ErrorMessage>{storageError}</ErrorMessage>}
    </>
  );
}
