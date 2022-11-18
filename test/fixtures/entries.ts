import { headacheId, otherPainId } from './symptoms';

export const formattedTimestamp1 = '2022-11-5 19:12';

const entries = [
	{
		timestamp: 1668190351231,
		symptomId: headacheId,
		id: "111"
	},
	{
		timestamp: 1668174979510,
		symptomId: headacheId,
		id: "222",
	},
	{
		timestamp: 1668188188461,
		symptomId: otherPainId,
		id: "333",
	}
];

export default entries;