import React, { useState } from 'react';
import AddPoint from './components/AddPoint';
import { ISymptomOption, TSearchSymptomFn } from './utils/types';

export default function App() {
  const existingSymptomsMock: ISymptomOption[] = [
    { key: 'headache', label: 'headache' },
    { key: 'other', label: 'something else' },
  ];
  const [addPointSuggestions, setAddPointSuggestions] = useState<ISymptomOption[] | undefined>(undefined);

  const handleSearch: TSearchSymptomFn = (term: string) => {
    if (!term) return setAddPointSuggestions(undefined);

    const results = existingSymptomsMock.filter(({ label }) => label.includes(term));
    setAddPointSuggestions(results);
  }

  return (
    <>
      <AddPoint onSearch={handleSearch} searchResults={addPointSuggestions} />
    </>
  );
}
