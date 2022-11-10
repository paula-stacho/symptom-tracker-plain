import React from 'react';
import AddEntry from './components/AddEntry';
import Entries from './components/Entries';
import ErrorMessage from './components/ErrorMessage';
import useStorage from './hooks/useStorage';

export default function App() {
  const { entries, addEntry, symptoms, addSymptom, storageError, isLoading } = useStorage();

  return (
    <>
      <AddEntry knownSymptoms={symptoms} onNewEntry={addEntry} onNewSymptom={addSymptom} />
      <Entries entries={entries} knownSymptoms={symptoms} />
      {storageError && <ErrorMessage>{storageError}</ErrorMessage>}
    </>
  );
}
