import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import type { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import type { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export default function calculateProfessionProfile({
																										 character,
																										 professions
																									 }: CalculateProfessionProfileProps): ProfessionProfile {

	//Expenditures are to be consumed as they are encountered
	const expenditures = getCharacterExpenditures(character)

	const tiers: Array<CharacterTier> = []

	professions.forEach(profession => {
		const tier = getProfessionTierTemplate(profession)
		;(["attributes", "skills", "talents"] as const).forEach(key => {
			markExpenditures(expenditures[key], tier[key])
		})
		tiers.push(tier)
	})

	return {
		profession1: tiers[0] ? tiers[0] : null,
		profession2: tiers[1] ? tiers[1] : null,
		profession3: tiers[2] ? tiers[2] : null,
		spending_outside_profession: temporaryHackConcatForResult(expenditures)
	}
}

function markExpenditures(
	expenditures: Array<string>,
	items: Array<CharacterTierItem>
) {
	for (let i = expenditures.length; i >= 0; i--) {
		const match = items.find(x => x.code === expenditures[i] && !x.checked)
		if (match) {
			match.checked = true
			expenditures.splice(i, 1)
		}
	}
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