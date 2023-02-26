import React, { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Color from '../../../utils/colorScheme';
import { softBox } from '../../../utils/styles';
import { IEntry, ISymptom } from '../../../utils/types';
import { getSymptomLabels, timestampToDate } from '../../../utils/helpers';

interface IHeatmapProps {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
}

interface IHeatmapDataPoint {
	date: string;
	symptom: string;
	count: number;
}

const height = 200;
const width = 400;
const margin = {
	left: 80,
	right: 20,
	top: 20,
	bottom: 20,
}

const getData = ({ 
	entries,
	knownSymptoms,
}: {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
}) => {
	const yLabels = knownSymptoms.map(({ label }) => label);
	const xLabels: string[] = [];

	const indexedData = entries.reduce((collection, { timestamp, symptomId }) => {
		const date = timestampToDate(timestamp);
		if (!xLabels.includes(date)) xLabels.push(date);
		if (!collection[date]) collection[date] = {};
		if (!collection[date][symptomId]) collection[date][symptomId] = 0;
		collection[date][symptomId]++;
		return collection;
	}, {} as Record<string, Record<string, number>>);

	let maxCount = 0;
	const symptomLabels = getSymptomLabels(knownSymptoms);
	const heatmapData: IHeatmapDataPoint[] = [];
	for (let date of Object.keys(indexedData)) {
		for (let symptomId of Object.keys(indexedData[date])) {
			const count = indexedData[date][symptomId];
			if (count > maxCount) maxCount = count;
			const point = { date, symptom: symptomLabels[symptomId], count };
			heatmapData.push(point);
		}
	}

	return { heatmapData, yLabels, xLabels, maxCount };
}

const Heatmap: FC<IHeatmapProps> = ({ entries, knownSymptoms }) => {
	const d3Container = useRef(null);

	useEffect(() => {
		if (!knownSymptoms || !knownSymptoms.length) { return; }

		const svg = d3.select(d3Container.current).selectChild('g');

		const { yLabels, xLabels, heatmapData, maxCount } = getData({ entries, knownSymptoms });

		const x = d3.scaleBand()
			.range([ 0, width ])
			.domain(xLabels)
			.padding(0.01);
		svg.append('g')
			.attr('transform', `translate(0, ${height})`)
			.call(d3.axisBottom(x));

		const y = d3.scaleBand()
		.range([ height, 0 ])
		.domain(yLabels)
		.padding(0.01);
		svg.append('g')
			.call(d3.axisLeft(y));

		const color = d3.scaleLinear<string, string>()
			.range(['white', Color.SECONDARY])
			.domain([0, maxCount]);

		svg.selectAll()
      .data(heatmapData, ({ date, symptom }) => `${date}:${symptom}`)
      .enter()
      .append('rect')
      .attr('x', ({ date }) => x(date))
      .attr('y', ({ symptom }) => y(symptom))
      .attr('width', x.bandwidth() )
      .attr('height', y.bandwidth() )
      .style('fill', ({ count }) => color(count) )
	}, [entries, knownSymptoms]);

		return (
			<div style={ContainerStyle}>
				<svg
					width={width + margin.left + margin.right}
					height={height + margin.top + margin.bottom}
					ref={d3Container}
				>
					<g transform={`translate(${margin.left}, ${margin.top})`} />
				</svg>
			</div>
		)
};

const ContainerStyle = {
	...softBox,
};

export default Heatmap;