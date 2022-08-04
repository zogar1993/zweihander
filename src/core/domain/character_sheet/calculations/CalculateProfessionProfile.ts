import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import type { CalculatedCombobox, ProfessionTech, TalentTech } from "@core/domain/character_sheet/CharacterSheet"
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

	const tiers: Array<CharacterSheetProfessionAdvances> = []

	const talentsToExclude: Array<string> = []

	//Generate tiers with Checkboxes
	professions.forEach(profession => {
		const tier = getProfessionTierTemplate({ profession, talents, talentsToExclude })
		;(["attributes", "skills", "talents"] as const).forEach(key => {
			markExpenditures(expenditures[key], tier[key] as Array<CharacterTierItem>)
		})
		tiers.push(tier)
	})


	//Add Comboboxes for repeated talents
	const nonOptions = [...character.talents, ...talentsToExclude]
	tiers.forEach(tier => {
		while (tier.talents.length + tier.wildcard_talents.length < 3) {
			if (expenditures.talents.length > 0) {
				const code = expenditures.talents.shift()
				const options = talents.filter(talent => talent.code === code || !nonOptions.includes(talent.code))
				tier.wildcard_talents.push({ code, options })
			} else {
				const options = talents.filter(talent => !nonOptions.includes(talent.code))
				tier.wildcard_talents.push({ code: null, options })
			}
		}
	})

	//TODO Downgrade talent expenditure to make it cheaper

	return {
		professions: [tiers[0] ? tiers[0] : BLANK_TIER,
			tiers[1] ? tiers[1] : BLANK_TIER,
			tiers[2] ? tiers[2] : BLANK_TIER],
		spending_outside_profession: getUniqueAdvances({ expenditures, talents })
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

type CharacterExpenditures = Record<"attributes" | "skills" | "talents", Array<string>>
export type Expenditure = { type: string; code: string }


const toItem = (item: Item) => ({ name: item.name, code: item.code, checked: false })

function getProfessionTierTemplate({
																		 profession,
																		 talents,
																		 talentsToExclude
																	 }: {
	profession: Profession,
	talents: Array<TalentTech>,
	talentsToExclude: Array<string>
}): CharacterSheetProfessionAdvances {
	const remainingTalents = profession.advances.talents.filter(code => !talentsToExclude.includes(code))
	talentsToExclude.push(...remainingTalents)
	return {
		attributes: Object.entries(profession.advances.bonus_advances).flatMap(([code, value]) =>
			Array.from(Array(value), () => getByCode(code, ATTRIBUTE_DEFINITIONS))
		).map(toItem),
		skills: profession.advances.skill_ranks.map(code => getByCode(code, SKILL_DEFINITIONS)).map(toItem),
		talents: remainingTalents.map(code => getByCode(code, talents)).map(toItem),
		wildcard_talents: []
	}
}

function getUniqueAdvances({
														 expenditures,
														 talents
													 }: {
	expenditures: CharacterExpenditures,
	talents: Array<TalentTech>
}): ProfessionProfile["spending_outside_profession"] {
	return {
		attributes: expenditures.attributes.map(code => getByCode(code, ATTRIBUTE_DEFINITIONS)).map(toItem),
		skills: expenditures.skills.map(code => getByCode(code, SKILL_DEFINITIONS)).map(toItem),
		talents: expenditures.talents.map(code => getByCode(code, talents)).map(toItem),
		wildcard_talents: []
	}
}

export type  CalculateProfessionProfileProps = {
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
	professions: [CharacterSheetProfessionAdvances, CharacterSheetProfessionAdvances, CharacterSheetProfessionAdvances]
	spending_outside_profession: CharacterSheetProfessionAdvances
}

export type CharacterSheetProfessionAdvances = {
	attributes: Array<CharacterTierItem>
	skills: Array<CharacterTierItem>
	talents: Array<CharacterTierItem>
	wildcard_talents: Array<CalculatedCombobox>
}

export type CharacterTierItem = {
	name: string
	code: string
	checked: boolean
}

const BLANK_CHARACTER_TIER_ITEM = Object.freeze({ name: "", code: "", checked: false })
const BLANK_TIER: CharacterSheetProfessionAdvances = {
	attributes: Array.from(Array(7), () => BLANK_CHARACTER_TIER_ITEM),
	skills: Array.from(Array(10), () => BLANK_CHARACTER_TIER_ITEM),
	talents: Array.from(Array(3), () => BLANK_CHARACTER_TIER_ITEM),
	wildcard_talents: []
}