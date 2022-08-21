export const reduceExpenditures = ({
																		 expenditures,
																		 results: { bought, missing }
																	 }: { expenditures: ReadonlyArray<string>, results: AdvancesDistinction }, current: string) => {

	const index = expenditures.findIndex(expenditure => expenditure === current)
	const match = index > -1
	return {
		expenditures: expenditures.filter((_, i) => i !== index),
		results: {
			bought: match ? [...bought, current] : bought,
			missing: match ? missing : [...missing, current]
		}
	}
}

export type AdvancesDistinction = { bought: ReadonlyArray<string>, missing: ReadonlyArray<string> }
type Accumulator = { expenditures: ReadonlyArray<string>, results: ReadonlyArray<AdvancesDistinction> }
export const DEFAULT_ACCUMULATOR: Accumulator = Object.freeze({ expenditures: [], results: [] })
const DEFAULT_CLASSIFIED_EXPENDITURES = { bought: [], missing: [] } as AdvancesDistinction

export const classifyExpendituresReducer = (accumulator: Accumulator, current: ReadonlyArray<string>) => {

	const catalogued = current.reduce(reduceExpenditures,
		{ expenditures: accumulator.expenditures, results: DEFAULT_CLASSIFIED_EXPENDITURES }
	)

	return {
		expenditures: catalogued.expenditures,
		results: [...accumulator.results, catalogued.results]
	}
}
export const removeRepeatedReducer = (accumulator: ReadonlyArray<ReadonlyArray<string>>, current: ReadonlyArray<string>) => {
	const excepted = accumulator.flatMap(x => x)
	const remaining = current.filter(x => !excepted.includes(x))
	return [...accumulator, remaining]
}