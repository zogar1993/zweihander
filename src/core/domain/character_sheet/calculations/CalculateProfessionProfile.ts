import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import {
	PROFESSION_EXPENDITURE_DEFAULT,
	clasifyExpendituresReducer, removeRepeatedReducer, AdvancesDistinction
} from "@core/domain/character_sheet/calculations/profession_profile/commons"
import { CalculatedCombobox, ProfessionTech, TalentTech } from "@core/domain/character_sheet/CharacterSheet"
import type { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { Item } from "@core/domain/types/Item"

export default function calculateProfessionProfile({
																										 character,
																										 professions,
																										 talents: talentsTech
																									 }: CalculateProfessionProfileProps): {
	professions: [
		Omit<CharacterSheetProfessionAdvances, "profession">,
		Omit<CharacterSheetProfessionAdvances, "profession">,
		Omit<CharacterSheetProfessionAdvances, "profession">
	]
	spending_outside_profession: Omit<CharacterSheetProfessionAdvances, "profession">
} {

	const attributes = professions
		.map(getProfessionAttributes)
		.reduce(clasifyExpendituresReducer, {
			...PROFESSION_EXPENDITURE_DEFAULT,
			expenditures: getAttributeExpenditures(character)
		})

	const skills = professions
		.map(getProfessionSkills)
		.reduce(clasifyExpendituresReducer, {
			...PROFESSION_EXPENDITURE_DEFAULT,
			expenditures: getSkillExpenditures(character)
		})

	const talents = professions
		.map(getProfessionTalents)
		.reduce(removeRepeatedReducer, [])
		.reduce(clasifyExpendituresReducer, {
			...PROFESSION_EXPENDITURE_DEFAULT,
			expenditures: getTalentExpenditures(character)
		})

	const wildcards = talents.advances.reduce((accumulator, current) => {
		const amount = 3 - current.bought.length - current.missing.length
		return {
			expenditures: accumulator.expenditures.filter((_, i) => i >= amount),
			results: [
				...accumulator.results,
				accumulator.expenditures.filter((_, i) => i < amount)
			]
		}
	}, { expenditures: talents.expenditures, results: [] as Array<Array<string>> })

	const tiers = Array.from(Array(3), (_, i) =>
		i < professions.length ? {
			attributes: attributes.advances[i],
			skills: skills.advances[i],
			talents: talents.advances[i],
			wildcards: wildcards.results[i]
		} : BLANK_TIER
	)

	return {
		professions: tiers.map(tier => ({
			attributes: doStuff(tier.attributes, ATTRIBUTE_DEFINITIONS, 7),
			skills: doStuff(tier.skills, SKILL_DEFINITIONS, 10),
			talents: doStuff(tier.talents, talentsTech, 3),
			wildcard_talents: doStuffCombobox(tier.wildcards, talentsTech)
		})) as [
		Omit<CharacterSheetProfessionAdvances, "profession">,
		Omit<CharacterSheetProfessionAdvances, "profession">,
		Omit<CharacterSheetProfessionAdvances, "profession">
	],
		spending_outside_profession: getUniqueAdvances({
			expenditures: {
				attributes: attributes.expenditures,
				skills: skills.expenditures,
				talents: wildcards.expenditures
			}, talents: talentsTech
		})
	}
}

const getAttributeExpenditures = (character: CharacterSheet) =>
	Object.entries(character.attributes).flatMap(([code, value]) =>
		Array.from(Array(value.advances), () => code))

const getSkillExpenditures = (character: CharacterSheet) =>
	Object.entries(character.skills).flatMap(([code, value]) =>
		Array.from(Array(value.ranks), () => code))

const getTalentExpenditures = (character: CharacterSheet) => [...character.talents]

type CharacterExpenditures = Record<"attributes" | "skills" | "talents", Array<string>>
export type Expenditure = { type: string; code: string }

const toItem = (item: Item) => ({ name: item.name, code: item.code, checked: false })

const getProfessionAttributes = (profession: Profession) =>
	Object.entries(profession.advances.bonus_advances).flatMap(
		([code, value]) => Array.from(Array(value), () => code))

const getProfessionSkills = (profession: Profession) =>
	profession.advances.skill_ranks.map(code => code)

const getProfessionTalents = (profession: Profession) =>
	profession.advances.talents.map(code => code)

function getUniqueAdvances({
														 expenditures,
														 talents
													 }: {
	expenditures: CharacterExpenditures,
	talents: Array<TalentTech>
}): Omit<ProfessionProfile["spending_outside_profession"], "profession"> {
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
	spending_outside_profession: Omit<CharacterSheetProfessionAdvances, "profession">
}

export type CharacterSheetProfessionAdvances = {
	profession: CalculatedCombobox
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

const doStuff = (wea: AdvancesDistinction, items: ReadonlyArray<Item>, expected: number): Array<CharacterTierItem> => {
	const amount = wea.bought.length + wea.missing.length
	if (expected === 0)
		return Array.from(Array(expected), () => ({
			code: "",
			name: "",
			checked: false
		}))
	else
		return wea.bought.map(x => ({
			code: x,
			name: getByCode(x, items).name,
			checked: true
		})).concat(wea.missing.map(x => ({ code: x, name: getByCode(x, items).name, checked: false })))
}

const doStuffCombobox = (wea: Array<string>, items: ReadonlyArray<Item>): Array<CalculatedCombobox> => {
	return wea.map(x => ({
		code: x,
		options: items,
	}))
}


//TODO check that all wildcards work
const BLANK_TIER: {
	attributes: AdvancesDistinction,
	skills: AdvancesDistinction,
	talents: AdvancesDistinction,
	wildcards: Array<string>
} = {
	//attributes: {bought: [], missing: Array.from(Array(7), () => null)} ,
	//skills: {bought: [], missing: Array.from(Array(10), () => null)},
	//talents: {bought: [], missing: Array.from(Array(3), () => null)},
	attributes: { bought: [], missing: [] },
	skills: { bought: [], missing: [] },
	talents: { bought: [], missing: [] },
	wildcards: []
}

type ArrayElements<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const WEAS = ["attributes", "skills", "talents"] as const