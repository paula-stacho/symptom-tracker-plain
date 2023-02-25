import React, { FC } from 'react';
import AddEntry from './components/AddEntry';
import Board from './components/Board/Board';
import ErrorMessage from './components/ErrorMessage';
import useStorage from './hooks/useStorage';
import Color from './utils/colorScheme';

const App: FC = () => {
  const { entries, addEntry, symptoms, addSymptom, storageError, isLoading } = useStorage();

  return (
    <div style={ContainerStyle}>
      <AddEntry knownSymptoms={symptoms} onNewEntry={addEntry} onNewSymptom={addSymptom} />
      <Board entries={entries} knownSymptoms={symptoms} />
      {storageError && <ErrorMessage>{storageError}</ErrorMessage>}
    </div>
  );
};

const ContainerStyle = {
  backgroundColor: Color.PRIMARY_SOFT,
  height: '100%',
  padding: '1em',
};

export default App;
