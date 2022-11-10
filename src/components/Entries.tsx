import React from 'react';
import { IEntry, ISymptom } from '../utils/types';

interface IEntriesProps {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
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
			<tbody>
				{
					entries.map(({ symptomId, id, timestamp }) => 
						<tr key={id}>
							<td>{formatTimestamp(timestamp)}</td>
							<td>{knownSymptoms.find(({ id: knownSymptomId }: ISymptom) => knownSymptomId === symptomId)?.label}</td>
						</tr>
					)
				}
			</tbody>
		</table>
	);
}