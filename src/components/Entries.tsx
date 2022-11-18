import React, { FC } from 'react';
import Color from '../utils/colorScheme';
import { softBox } from '../utils/styles';
import { IEntry, ISymptom } from '../utils/types';

interface IEntriesProps {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
}

const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp);
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

const Entries: FC<IEntriesProps> = ({ entries, knownSymptoms }) => {
	if (!entries.length) {
		return <>Start adding entries</>;
	}

	return (
		<table style={ContainerStyle}>
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
};

const ContainerStyle = {
	backgroundColor: Color.PRIMARY_SOFT,
	...softBox,
};

export default Entries;