import { CalculatedCharacterSheet, ProfessionTech, TalentTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

//TODO add same profession free talents
export default function calculateTalents({
	character,
	talents,
	professions
}: {
	character: Pick<SanitizedCharacterSheet, "talents">
	talents: Array<TalentTech>
	professions: Array<{
		advances: { talents: ProfessionTech["advances"]["talents"] }
	}>
}): CalculatedCharacterSheet["talents"] {
	let profession1Talents =
		professions.length > 0 ? professions[0].advances.talents : []
	let profession2Talents =
		professions.length > 1 ? professions[1].advances.talents : []
	let profession3Talents =
		professions.length > 2 ? professions[2].advances.talents : []

	profession2Talents = profession2Talents.filter(
		x => !profession1Talents.includes(x)
	)
	let profession2Wildcards =
		professions.length > 1 ? 3 - profession2Talents.length : 0

	profession3Talents = profession3Talents.filter(
		x => ![...profession1Talents, ...profession2Talents].includes(x)
	)
	let profession3Wildcards =
		professions.length > 2 ? 3 - profession3Talents.length : 0

	const profession1Results: CalculatedCharacterSheet["talents"][0] = {
		name: `Profession 1`,
		code: `profession1`,
		items: []
	}
	const profession2Results: CalculatedCharacterSheet["talents"][0] = {
		name: `Profession 2`,
		code: `profession2`,
		items: []
	}
	const profession3Results: CalculatedCharacterSheet["talents"][0] = {
		name: `Profession 3`,
		code: `profession3`,
		items: []
	}
	const houseRuled: CalculatedCharacterSheet["talents"][0] = {
		name: `House Ruled`,
		code: `house_ruled`,
		items: []
	}

	const secondPass: Array<string> = []
	character.talents.forEach(value => {
		if (profession1Talents.includes(value)) {
			profession1Results.items.push(getByCode(value, talents))
			profession1Talents = profession1Talents.filter(x => x !== value)
		} else if (profession2Talents.includes(value)) {
			profession2Results.items.push(getByCode(value, talents))
			profession2Talents = profession2Talents.filter(x => x !== value)
		} else if (!profession3Talents.includes(value)) {
			if (profession2Wildcards) {
				profession2Results.items.push(getByCode(value, talents))
				profession2Wildcards--
			} else if (profession3Wildcards) {
				profession3Results.items.push(getByCode(value, talents))
				profession3Wildcards--
			} else {
				houseRuled.items.push(getByCode(value, talents))
			}
		} else {
			secondPass.push(value)
		}
	})

	//TODO make full wildcard possible
	//This is so that you can buy profession3 talents for less experience
	//This fixes weird edge case where:
	//- buy A_TALENT (with second profession wildcard)
	//- buy A_PROFESSION (includes A_TALENT for advance)
	//- now A_TALENT has a cost of 300 instead of 200
	const availableWildcards = profession2Wildcards + profession3Wildcards > 0
	secondPass.forEach(value => {
		if (profession2Wildcards) {
			profession2Results.items.push(getByCode(value, talents))
			profession2Wildcards--
		} else {
			profession3Results.items.push(getByCode(value, talents))
			profession3Talents = profession3Talents.filter(x => x !== value)
		}
	})

	const results: CalculatedCharacterSheet["talents"] = []
	if (profession1Results.items.length) results.push(profession1Results)
	if (profession2Results.items.length) results.push(profession2Results)
	if (profession3Results.items.length) results.push(profession3Results)
	if (houseRuled.items.length) results.push(houseRuled)
	return results
}
