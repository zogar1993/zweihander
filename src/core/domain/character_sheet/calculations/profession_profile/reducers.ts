
export const reduceExpenditures = ({
															expenditures,
															results: { bought, missing }
														}: { expenditures: Array<string>, results: AdvancesDistinction }, current: string) => {

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

export type AdvancesDistinction = { bought: Array<string>, missing: Array<string> }
type ProfessionExpenduturesAccumulator = {
	expenditures: Array<string>
	results: Array<AdvancesDistinction>
}
export  const PROFESSION_EXPENDITURE_DEFAULT: ProfessionExpenduturesAccumulator = Object.freeze({
	expenditures: [],
	results: []
})
export const classifyExpendituresReducer = (accumulator: ProfessionExpenduturesAccumulator, current: Array<string>) => {

	const catalogued = current.reduce(reduceExpenditures
		, { expenditures: accumulator.expenditures, results: { bought: [], missing: [] } as AdvancesDistinction })

	return {
		expenditures: catalogued.expenditures,
		results: [...accumulator.results, catalogued.results]
	}
}
export  const removeRepeatedReducer = (accumulator: Array<Array<string>>, current: Array<string>) => {
	const excepted = accumulator.flatMap(x => x)
	const remaining = current.filter(x => !excepted.includes(x))
	return [...accumulator, remaining]
}