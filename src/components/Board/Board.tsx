import React, { FC } from 'react';
import { IEntry, ISymptom } from '../../utils/types';
import Entries from './Entries';
import Heatmap from './Heatmap';

interface IBoardProps {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
}

const Board: FC<IBoardProps> = ({ entries, knownSymptoms }) => {
	return (
		<div style={ContainerStyle}>
			<Entries entries={entries} knownSymptoms={knownSymptoms} />
			<Heatmap entries={entries} knownSymptoms={knownSymptoms} />
		</div>
	)
};

const ContainerStyle = {
	display: 'grid',
	gridAutoFlow: 'column',
	gridColumnGap: '1em',
};

export default Board;