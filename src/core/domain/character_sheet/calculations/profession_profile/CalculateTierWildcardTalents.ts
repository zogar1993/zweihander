import calculateTierTalents from "@core/domain/character_sheet/calculations/profession_profile/CalculateTierTalents"

export default function calculateTierWildcardTalents({ talents }: {
	talents: ReturnType<typeof calculateTierTalents>
}): {
	expenditures: Array<string>
	results: Results
} {
	const { results, expenditures } = talents
	return results.reduce((accumulator, current) => {
		const amount = 3 - current.bought.length - current.missing.length
		const remaining = accumulator.expenditures.filter((_, i) => i >= amount)
		const used = accumulator.expenditures.filter((_, i) => i < amount)
		const wildcards = [...used, ...Array.from(Array(amount - used.length), () => null)]
		return {
			expenditures: remaining,
			results: [...accumulator.results, wildcards]
		}
	}, { expenditures, results: [] as Results })
}

type Results = Array<Array<string | null>>