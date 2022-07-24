import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import type { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import type { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export default function calculateProfessionProfile({
	character,
	professions
}: CalculateProfessionProfileProps): ProfessionProfile {
	const result: ProfessionProfile = {
		profession1: null,
		profession2: null,
		profession3: null,
		spending_outside_profession: [],
		missing_for_profession1: [],
		missing_for_profession2: []
	}

	let expenditures = getCharacterExpenditures(character)

	if (professions.length === 0) {
		if (temporaryHackConcatForLenght(expenditures))
			result.spending_outside_profession =
				temporaryHackConcatForResult(expenditures)

		return result
	}
	const profession1 = getProfessionTierTemplate(professions[0])
	const result1 = markExpenditures(expenditures, profession1)
	expenditures = result1.remaining

	result.profession1 = result1.profile

	if (professions.length === 1) {
		if (temporaryHackConcatForLenght(expenditures))
			result.spending_outside_profession =
				temporaryHackConcatForResult(expenditures)

		return result
	}

	result.missing_for_profession1 = temporaryConcatProfessionTier(profession1)

	const profession2 = getProfessionTierTemplate(professions[1])
	const result2 = markExpenditures(expenditures, profession2)
	expenditures = result2.remaining

	result.profession2 = result2.profile

	if (professions.length === 2) {
		if (temporaryHackConcatForLenght(expenditures))
			result.spending_outside_profession =
				temporaryHackConcatForResult(expenditures)

		return result
	}

	result.missing_for_profession2 = temporaryConcatProfessionTier(profession2)

	const profession3 = getProfessionTierTemplate(professions[2])
	const result3 = markExpenditures(expenditures, profession3)
	expenditures = result3.remaining

	result.profession3 = result3.profile

	if (temporaryHackConcatForLenght(expenditures))
		result.spending_outside_profession =
			temporaryHackConcatForResult(expenditures)

	return result
}

function markExpenditures(
	expenditures: CharacterExpenditures,
	profession: CharacterTier
) {
	const remaining: Record<string, Array<string>> = {
		attributes: [],
		skills: [],
		talents: []
	}

	;(["attributes", "skills", "talents"] as const).forEach(key => {
		const items = expenditures[key]
		items.forEach(expenditure => {
			const match = profession[key].find(
				x => x.code === expenditure && !x.checked
			)
			if (match) match.checked = true
			else remaining[key].push(expenditure)
		})
	})
	return { remaining, profile: profession }
}

function getCharacterExpenditures(
	character: CharacterSheet
): CharacterExpenditures {
	return {
		attributes: Object.entries(character.attributes).flatMap(([code, value]) =>
			Array.from(Array(value.advances), () => code)
		),
		skills: Object.entries(character.skills).flatMap(([code, value]) =>
			Array.from(Array(value.ranks), () => code)
		),
		talents: [...character.talents]
	}
}

type CharacterExpenditures = Record<string, Array<string>>
export type Expenditure = { type: string; code: string }

function getProfessionTierTemplate(profession: Profession): CharacterTier {
	const { bonus_advances, skill_ranks, talents } = profession.advances
	return {
		profession: { name: profession.name, code: profession.code },
		attributes: Object.entries(bonus_advances).flatMap(([code, value]) =>
			Array.from(Array(value), () => ({ code, checked: false }))
		),
		skills: skill_ranks.map(code => ({ code, checked: false })),
		talents: talents.map(code => ({ code, checked: false }))
	}
}

export type CalculateProfessionProfileProps = {
	character: CharacterSheet
	professions: Array<Profession>
}
type Profession = Pick<ProfessionTech, "advances" | "code" | "name">
type CharacterSheet = {
	attributes: Record<AttributeCode, { advances: number }>
	skills: SanitizedCharacterSheet["skills"]
	talents: SanitizedCharacterSheet["talents"]
}

export type ProfessionProfile = {
	profession1: null | CharacterTier
	profession2: null | CharacterTier
	profession3: null | CharacterTier
	spending_outside_profession: Array<Expenditure>
	missing_for_profession1: Array<Expenditure>
	missing_for_profession2: Array<Expenditure>
}

export type CharacterTier = {
	profession: { name: string; code: string }
	attributes: Array<CharacterTierItem>
	skills: Array<CharacterTierItem>
	talents: Array<CharacterTierItem>
}

type CharacterTierItem = {
	code: string
	checked: boolean
}

function temporaryHackConcatForResult(wea: CharacterExpenditures) {
	return wea.attributes
		.map(x => ({ code: x, type: "attribute" }))
		.concat(wea.skills.map(x => ({ code: x, type: "skill" })))
		.concat(wea.talents.map(x => ({ code: x, type: "talent" })))
}

function temporaryHackConcatForLenght(wea: CharacterExpenditures) {
	return wea.talents.length + wea.attributes.length + wea.skills.length
}

function temporaryConcatProfessionTier(wea: CharacterTier) {
	return wea.attributes
		.map(x => ({ code: x.code, type: "attribute" }))
		.concat(wea.skills.map(x => ({ code: x.code, type: "skill" })))
		.concat(wea.talents.map(x => ({ code: x.code, type: "talent" })))
}
