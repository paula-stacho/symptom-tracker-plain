import React from 'react';
import { IEntry, ISymptomOption } from '../utils/types';

interface IEntriesProps {
	entries: IEntry[];
	knownSymptoms: ISymptomOption[];
}

const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
};

export default function Entries({ entries, knownSymptoms }: IEntriesProps) {
	if (!entries.length) {
		return <>Start adding entries</>;
	}
	
	return (
		<table>
			{
				entries.map(({ symptomKey, timestamp }) => 
					<tr key={symptomKey}>
						<td>{formatTimestamp(timestamp)}</td>
						<td>{knownSymptoms.find(({ key }: ISymptomOption) => key === symptomKey).label}</td>
					</tr>
				)
			}
		</table>
	);
}