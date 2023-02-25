import React, { FC, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Color from '../../utils/colorScheme';
import { softBox } from '../../utils/styles';
import { IEntry, ISymptom } from '../../utils/types';
import { timestampToDate } from '../../utils/helpers';

interface IHeatmapProps {
	entries: IEntry[];
	knownSymptoms: ISymptom[];
}

const height = 200;
const width = 400;

const Heatmap: FC<IHeatmapProps> = ({ entries, knownSymptoms }) => {
	const d3Container = useRef(null);

	useEffect(() => {
		if (!knownSymptoms || !knownSymptoms.length) { return; }

		const svg = d3.select(d3Container.current);

		const yLabels = knownSymptoms.map(({ id }) => id);
		const xLabels: string[] = [];

		const indexedData = entries.reduce((collection, { timestamp, symptomId }) => {
			const date = timestampToDate(timestamp);
			if (!xLabels.includes(date)) xLabels.push(date);
			if (!collection[date]) collection[date] = {};
			if (!collection[date][symptomId]) collection[date][symptomId] = 0;
			collection[date][symptomId]++;
			return collection;
		}, {} as Record<string, Record<string, number>>);

		console.log(indexedData);

		let maxCount = 0;
		const heatmapData: [string, string, number][] = [];
		for (let date of Object.keys(indexedData)) {
			for (let symptomId of Object.keys(indexedData[date])) {
				const count = indexedData[date][symptomId];
				if (count > maxCount) maxCount = count;
				const item: [string, string, number] = [date, symptomId, count];
				heatmapData.push(item);
			}
		}

		const data: [string, string, number][] = [
			[
				"2023-2-25",
				"l8GT0T0qH7pZOTuoKzp1",
				1
			],
			[
				"2023-2-25",
				"FtU1pUO5W7BxR5Gtx5tx",
				1
			],
			[
				"2023-2-25",
				"GE7vEqq6c2pbBoIGjmB0",
				2
			],
			[
				"2023-2-26",
				"l8GT0T0qH7pZOTuoKzp1",
				2
			],
			[
				"2023-2-26",
				"FtU1pUO5W7BxR5Gtx5tx",
				1
			],
			[
				"2023-2-26",
				"GE7vEqq6c2pbBoIGjmB0",
				3
			],
			[
				"2023-2-27",
				"l8GT0T0qH7pZOTuoKzp1",
				3
			],
			[
				"2023-2-27",
				"FtU1pUO5W7BxR5Gtx5tx",
				2
			],
			[
				"2023-2-27",
				"GE7vEqq6c2pbBoIGjmB0",
				2
			]
		];

		xLabels.push('2023-2-26', '2023-2-27');

		const x = d3.scaleBand()
			.range([ 0, width ])
			.domain(xLabels)
			.padding(0.01);
		svg.append('g')
			.attr('transform', 'translate(0,' + height + ')')
			.call(d3.axisBottom(x));

		const y = d3.scaleBand()
		.range([ height, 0 ])
		.domain(yLabels)
		.padding(0.01);
		svg.append('g')
		.call(d3.axisLeft(y));

		console.log('GET X', x('2023-2-25'), 'GET Y', y('l8GT0T0qH7pZOTuoKzp1'));

		const color = d3.scaleLinear<string, string>()
			.range(['white', Color.SECONDARY])
			.domain([1, maxCount]);

		console.log({ heatmapData });

		

			console.log('bandwitdhs', x.bandwidth(), y.bandwidth());

		svg.selectAll()
      .data(data, function([date, symptom, count]) {return date + ':' + symptom;})
      .enter()
      .append('rect')
      .attr('x', function([date, symptom, count]) { return x(date) })
      .attr('y', function([date, symptom, count]) { return y(symptom) })
      .attr('width', x.bandwidth() )
      .attr('height', y.bandwidth() )
      .style('fill', function([date, symptom, count]) { return color(count)} )

	}, [entries, knownSymptoms]);

		return (
			<div style={ContainerStyle}>
				<svg
					width={width}
					height={height}
					ref={d3Container}
				/>
			</div>
		)
};

const ContainerStyle = {
	...softBox,
};

export default Heatmap;