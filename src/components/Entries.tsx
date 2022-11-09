import React from 'react';
import { IEntry, ISymptom } from '../utils/types';

interface IEntriesProps {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
}

const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp);
	console.log({ timestamp });
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
};

export default function Entries({ entries, knownSymptoms }: IEntriesProps) {
	if (!entries.length) {
		return <>Start adding entries</>;
	}

	console.log({ knownSymptoms });
	
	return (
		<table>
			<tbody>
				{
					entries.map(({ symptomKey, timestamp }) => 
						<tr key={symptomKey}>
							<td>{formatTimestamp(timestamp)}</td>
							<td>{knownSymptoms.find(({ key }: ISymptom) => key === symptomKey)?.label}</td>
						</tr>
					)
				}
			</tbody>
		</table>
	);
}