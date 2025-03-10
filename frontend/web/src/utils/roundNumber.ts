type RoundFunction = (num: number, factor: number) => number;

export const roundNumberByDecimalPlace: RoundFunction = (
	num,
	decimalPlaces,
) => {
	const factor = 10 ** decimalPlaces;
	return Math.round(num * factor) / factor;
};

export const roundNumberToFactor: RoundFunction = (num, factor) => {
	return Math.round(num / factor) * factor;
};
