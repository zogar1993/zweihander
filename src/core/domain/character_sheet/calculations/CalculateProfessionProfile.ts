import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import type { ProfessionTech, TalentTech } from "@core/domain/character_sheet/CharacterSheet"
import type { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { Item } from "@core/domain/Item"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"

export default function calculateProfessionProfile({
																										 character,
																										 professions,
																										 talents
																									 }: CalculateProfessionProfileProps): ProfessionProfile {

	//Expenditures are to be consumed as they are encountered
	const expenditures = getCharacterExpenditures(character)

	const tiers: Array<CharacterTier> = []

	professions.forEach(profession => {
		const tier = getProfessionTierTemplate({ profession, talents })
		;(["attributes", "skills", "talents"] as const).forEach(key => {
			markExpenditures(expenditures[key], tier[key])
		})
		tiers.push(tier)
	})

	return {
		profession1: tiers[0] ? tiers[0] : BLANK_TIER,
		profession2: tiers[1] ? tiers[1] : BLANK_TIER,
		profession3: tiers[2] ? tiers[2] : BLANK_TIER,
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


const toItem = (item: Item) => ({ name: item.name, code: item.code, checked: false })

function getProfessionTierTemplate({
																		 profession,
																		 talents
																	 }: { profession: Profession, talents: Array<TalentTech> }): CharacterTier {
	return {
		profession: { name: profession.name, code: profession.code },
		attributes: Object.entries(profession.advances.bonus_advances).flatMap(([code, value]) =>
			Array.from(Array(value), () => getByCode(code, ATTRIBUTE_DEFINITIONS))
		).map(toItem),
		skills: profession.advances.skill_ranks.map(code => getByCode(code, SKILL_DEFINITIONS)).map(toItem),
		talents: profession.advances.talents.map(code => getByCode(code, talents)).map(toItem)
	}
}

export type CalculateProfessionProfileProps = {
	character: CharacterSheet
	professions: Array<Profession>
	talents: Array<TalentTech>
}
type Profession = Pick<ProfessionTech, "advances" | "code" | "name">
type CharacterSheet = {
	attributes: Record<AttributeCode, { advances: number }>
	skills: SanitizedCharacterSheet["skills"]
	talents: SanitizedCharacterSheet["talents"]
}

export type ProfessionProfile = {
	profession1: CharacterTier
	profession2: CharacterTier
	profession3: CharacterTier
	spending_outside_profession: Array<Expenditure>
}

export type CharacterTier = {
	profession: { name: string; code: string }
	attributes: Array<CharacterTierItem>
	skills: Array<CharacterTierItem>
	talents: Array<CharacterTierItem>
}

type CharacterTierItem = {
	name: string
	code: string
	checked: boolean
}

function temporaryHackConcatForResult(wea: CharacterExpenditures) {
	return wea.attributes
		.map(x => ({ code: x, type: "attribute" }))
		.concat(wea.skills.map(x => ({ code: x, type: "skill" })))
		.concat(wea.talents.map(x => ({ code: x, type: "talent" })))
}

const BLANK_CHARACTER_TIER_ITEM = Object.freeze({ name: "", code: "", checked: false })
const BLANK_TIER: CharacterTier = {
	profession: { name: "", code: "" },
	attributes: Array.from(Array(7), () => BLANK_CHARACTER_TIER_ITEM),
	skills: Array.from(Array(10), () => BLANK_CHARACTER_TIER_ITEM),
	talents: Array.from(Array(3), () => BLANK_CHARACTER_TIER_ITEM)
}