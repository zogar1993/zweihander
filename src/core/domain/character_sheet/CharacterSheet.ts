import { Ancestry } from "@core/domain/Ancestry"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { Item } from "@core/domain/Item"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Principle } from "@core/domain/Spell"
import { Talent } from "@core/domain/Talent"

type Props = {
	character: SanitizedCharacterSheet
	ancestries: Array<Ancestry>
	professions: Array<Profession>
	schools: Array<MagicSchool>
	talents: Array<Talent>
}

export enum Flip {
	None,
	ToFail,
	ToSucceed
}

export enum Peril {
	Unhindered = 0,
	Imperiled = 1,
	Ignore1SkillRank = 2,
	Ignore2SkillRank = 3,
	Ignore3SkillRank = 4,
	Incapacitated = 5
}

export function calculateCharacterSheet({
	character,
	ancestries,
	professions,
	schools,
	talents
}: Props): CalculatedCharacterSheet {
	const ancestry = character.ancestry
		? getByCode(character.ancestry, ancestries)
		: null

	const profs = getProfessions({ character, professions })
	const attributes = getAttributes({
		character,
		ancestry,
		professions: profs
	})

	const getAttribute = (code: AttributeCode) => getByCode(code, attributes)

	const skills = getSkills({ character, getAttribute, professions: profs })

	const special_rules = getSpecialRules({
		character,
		talents,
		professions: profs,
		ancestry
	})

	return {
		...character,
		attributes,
		schools: formatSpells(character.spells, schools),
		focuses: formatFocuses(character.focuses),
		talents: formatTalents(character.talents, talents),
		skills: orderSkills(skills, character.settings.skill_order),
		encumbrance_limit: 3 + getAttribute("brawn").bonus,
		initiative: 3 + getAttribute("perception").bonus,
		movement: 3 + getAttribute("agility").bonus,
		spent_experience: spentExperience({
			character,
			skills,
			attributes,
			schools
		}),
		damage: {
			value: character.damage,
			threshold: getAttribute("brawn").bonus
		},
		peril: {
			value: character.peril,
			threshold: getAttribute("willpower").bonus + 3
		},
		maximum_focuses: getAttribute("intelligence").bonus,
		maximum_languages: getAttribute("fellowship").bonus,
		special_rules: special_rules
	}
}

type GetAttributeProps = {
	character: SanitizedCharacterSheet
	ancestry: Ancestry | null
	professions: Array<Profession>
}

function getAttributes({
	character,
	ancestry,
	professions
}: GetAttributeProps): Array<Attribute> {
	const codes = Object.keys(character.attributes) as Array<AttributeCode>
	return codes.map(code => {
		const {
			base: raw_base,
			advances,
			...definition
		} = character.attributes[code]
		const ancestry_bonus = ancestry?.attribute_bonuses[code] || 0
		const mercy = character.mercy === code
		const base = mercy ? 42 : raw_base
		const bonus = Math.floor(base / 10) + advances + ancestry_bonus
		const profession_advances = professions
			.map(x => x.advances.bonus_advances[code] || 0)
			.reduce((x, y) => x + y, 0)

		return {
			...definition,
			code: code,
			base,
			advances,
			bonus,
			ancestry_bonus,
			profession_advances,
			mercy_possible: raw_base < 42,
			mercy: mercy
		}
	})
}

type GetSpecialRulesProps = {
	character: SanitizedCharacterSheet
	talents: Array<Talent>
	professions: Array<Profession>
	ancestry: Ancestry | null
}

function getSpecialRules({
	character,
	talents,
	professions,
	ancestry
}: GetSpecialRulesProps) {
	const ancestry_trait = ancestry?.traits.find(
		x => x.code === character.ancestry_trait
	)
	return [
		...(ancestry_trait ? [ancestry_trait] : []),
		...character.talents.filter(x => x).map(x => getByCode(x!, talents)),
		...professions.flatMap(x => x.traits)
	]
}

type GetProfessionsProps = {
	character: SanitizedCharacterSheet
	professions: Array<Profession>
}

function getProfessions({ character, professions }: GetProfessionsProps) {
	return [character.profession1, character.profession2, character.profession3]
		.filter(x => x)
		.map(code => getByCode(code!, professions))
}

type GetSkillProps = {
	character: SanitizedCharacterSheet
	professions: Array<Profession>
	getAttribute: (code: AttributeCode) => Attribute
}

function getSkills({
	character,
	professions,
	getAttribute
}: GetSkillProps): Array<Skill> {
	const codes = Object.keys(character.skills) as Array<SkillCode>
	return codes.map(code => {
		const { ranks, ...definition } = character.skills[code]
		const attribute = getAttribute(definition.attribute)
		const is_incapacitated = () => character.peril === Peril.Incapacitated
		const relevant_ranks = () =>
			character.peril >= Peril.Ignore1SkillRank
				? Math.max(0, ranks - (character.peril - 1))
				: ranks
		const profession_ranks = professions
			.map(profession =>
				profession.advances.skill_ranks.includes(code) ? 1 : (0 as number)
			)
			.reduce((x, y) => x + y, 0)

		return {
			...definition,
			code: code,
			ranks,
			chance: is_incapacitated() ? 0 : attribute.base + relevant_ranks() * 10,
			profession_ranks,
			has_focuses: !!character.focuses[code],
			flip: definition.special && ranks === 0 ? Flip.ToFail : Flip.None
		}
	})
}

type SpentExperienceProps = {
	character: SanitizedCharacterSheet
	schools: Array<MagicSchool>
	attributes: Array<Attribute>
	skills: Array<Skill>
}

function spentExperience({
	character,
	schools,
	attributes,
	skills
}: SpentExperienceProps): number {
	let profession1_talents_amount = 0
	profession1_talents_amount += character.talents[0] === null ? 0 : 1
	profession1_talents_amount += character.talents[1] === null ? 0 : 1
	profession1_talents_amount += character.talents[2] === null ? 0 : 1
	let profession2_talents_amount = 0
	profession2_talents_amount += character.talents[3] === null ? 0 : 1
	profession2_talents_amount += character.talents[4] === null ? 0 : 1
	profession2_talents_amount += character.talents[5] === null ? 0 : 1
	let profession3_talents_amount = 0
	profession3_talents_amount += character.talents[6] === null ? 0 : 1
	profession3_talents_amount += character.talents[7] === null ? 0 : 1
	profession3_talents_amount += character.talents[8] === null ? 0 : 1

	const favored_attribute = upbringings.find(
		x => x.code === character.upbringing
	)?.attribute
	const favored_skills = skills
		.filter(x => x.attribute === favored_attribute)
		.map(x => x.code)

	const spells = { Petty: 0, Lesser: 0, Greater: 0 }
	const keys = Object.keys(character.spells)
	for (const schoolCode of keys) {
		const schoolSpells = getByCode(schoolCode, schools).spells
		const spellCodes = character.spells[schoolCode]!
		for (const spellCode of spellCodes) {
			const principle = getByCode(spellCode, schoolSpells).principle
			spells[principle]++
		}
	}

	return calculateExperience({
		profession1: character.profession1,
		profession2: character.profession2,
		profession3: character.profession3,
		skills: skills,
		attributes: attributes,
		focuses: character.focuses,
		favored_skills: favored_skills,
		profession1_talents_amount: profession1_talents_amount,
		profession2_talents_amount: profession2_talents_amount,
		profession3_talents_amount: profession3_talents_amount,
		spells
	})
}

function orderSkills(skills: Array<Skill>, order: SkillOrder) {
	if (order === "alphabetic") return skills
	return ATTRIBUTE_DEFINITIONS.map(attr =>
		skills.filter(skill => skill.attribute === attr.code)
	).flatMap(x => x)
}

function calculateExperience({
	profession1,
	profession2,
	profession3,
	skills,
	attributes,
	profession1_talents_amount,
	profession2_talents_amount,
	profession3_talents_amount,
	focuses,
	spells,
	favored_skills
}: CalculateExperienceProps): number {
	let experience = 0

	if (profession1) experience += 100
	if (profession2) experience += 200
	if (profession3) experience += 300

	skills.forEach(skill => {
		if (skill.ranks >= 1) experience += skill.profession_ranks >= 1 ? 100 : 200
		if (skill.ranks >= 2) experience += skill.profession_ranks >= 2 ? 200 : 400
		if (skill.ranks >= 3) experience += skill.profession_ranks >= 3 ? 300 : 600
	})

	attributes.forEach(attribute => {
		if (attribute.advances >= 1)
			experience += attribute.profession_advances >= 1 ? 100 : 200
		if (attribute.advances >= 2)
			experience += attribute.profession_advances >= 2 ? 100 : 200
		if (attribute.advances >= 3)
			experience += attribute.profession_advances >= 3 ? 200 : 400
		if (attribute.advances >= 4)
			experience += attribute.profession_advances >= 4 ? 200 : 400
		if (attribute.advances >= 5)
			experience += attribute.profession_advances >= 5 ? 300 : 600
		if (attribute.advances >= 6)
			experience += attribute.profession_advances >= 6 ? 300 : 600
	})

	if (spells.Petty && spells.Petty > 3) experience += (spells.Petty - 3) * 100
	if (spells.Lesser) experience += spells.Lesser * 200
	if (spells.Greater) experience += spells.Greater * 300

	experience += 100 * profession1_talents_amount
	experience += 200 * profession2_talents_amount
	experience += 300 * profession3_talents_amount

	forEachEntryInRecord(focuses, ([skill, focuses]) => {
		const favored = favored_skills.includes(skill)
		experience += (favored ? 50 : 100) * focuses.length
	})

	return experience
}

export type CalculateExperienceProps = {
	profession1: string | null
	profession2: string | null
	profession3: string | null
	skills: Array<{ ranks: number; profession_ranks: number }>
	attributes: Array<{ advances: number; profession_advances: number }>
	profession1_talents_amount: number
	profession2_talents_amount: number
	profession3_talents_amount: number
	focuses: Partial<Record<SkillCode, Array<string>>>
	favored_skills: Array<SkillCode>
	spells: Partial<Record<Principle, number>>
}

function partialRecordKeys<Key extends string, Value>(
	record: Partial<Record<Key, Value>>
) {
	return Object.entries(record) as Array<[Key, Value]>
}

function forEachEntryInRecord<Key extends string, Value>(
	record: Partial<Record<Key, Value>>,
	func: (pair: [key: Key, value: Value]) => void
) {
	const pairs = partialRecordKeys(record)
	pairs.forEach(func)
}

//TODO P1 move elsewhere
export const upbringings = [
	{
		code: "cultured",
		name: "Cultured (Fellowship)",
		from: 1,
		to: 14,
		attribute: "fellowship"
	},
	{
		code: "forgotten",
		name: "Forgotten (Agility)",
		from: 15,
		to: 29,
		attribute: "agility"
	},
	{
		code: "industrious",
		name: "Industrious (Brawn)",
		from: 30,
		to: 44,
		attribute: "brawn"
	},
	{
		code: "militant",
		name: "Militant (Combat)",
		from: 45,
		to: 59,
		attribute: "combat"
	},
	{
		code: "opportunistic",
		name: "Opportunistic (Perception)",
		from: 60,
		to: 74,
		attribute: "perception"
	},
	{
		code: "reverent",
		name: "Reverent (Willpower)",
		from: 75,
		to: 89,
		attribute: "willpower"
	},
	{
		code: "scholastic",
		name: "Scholastic (Intelligence)",
		from: 90,
		to: 100,
		attribute: "intelligence"
	}
]

type Attribute = {
	name: string
	code: AttributeCode
	base: number
	advances: number
	profession_advances: number
	bonus: number
	mercy: boolean
	ancestry_bonus: number

	mercy_possible: boolean
}

type Skill = {
	name: string
	code: SkillCode
	special: boolean
	ranks: number
	profession_ranks: number
	chance: number
	flip: Flip
	has_focuses: boolean
	attribute: AttributeCode
}

export type SkillOrder = "alphabetic" | "by_attribute"
export type CharacterSheetSettings = { skill_order: SkillOrder }
export type SchoolCode = string
export type SpellCode = string
export type CharacterSpells = Partial<Record<SchoolCode, Array<SpellCode>>>

export type Focuses = Partial<Record<SkillCode, Array<string>>>

export type CalculatedCharacterSheet = Readonly<{
	id: string

	name: string
	age: number
	sex: string | null

	archetype: string | null
	social_class: string | null
	upbringing: string | null
	avatar: string | null
	order_alignment: string | null
	chaos_alignment: string | null
	order_ranks: number
	chaos_ranks: number
	corruption: number

	ancestry: string | null
	profession1: string | null
	profession2: string | null
	profession3: string | null

	encumbrance_limit: number
	initiative: number
	movement: number
	maximum_focuses: number
	maximum_languages: number

	damage: ConditionTrack
	peril: ConditionTrack
	attributes: Array<CalculatedAttribute>
	skills: Array<CalculatedSkill>
	talents: Array<Item & { items: Array<Item> }>
	ancestry_trait: string | null

	journal: string
	spent_experience: number
	focuses: Array<Item & { items: Array<Item> }>
	schools: Array<Item & { items: Array<Item> }>

	special_rules: Array<SpecialRule>

	settings: CharacterSheetSettings
}>

type ConditionTrack = {
	value: number
	threshold: number
}

export type CalculatedAttribute = {
	name: string
	code: AttributeCode
	base: number
	advances: number
	profession_advances: number
	bonus: number
	mercy: boolean
	ancestry_bonus: number

	mercy_possible: boolean
}

export type CalculatedSkill = {
	name: string
	code: SkillCode
	special: boolean
	ranks: number
	profession_ranks: number
	chance: number
	flip: Flip
	has_focuses: boolean
	attribute: AttributeCode
}

export type SpecialRule = {
	name: string
	description: string
	effect: string
}

function formatSpells(
	spells: CharacterSpells,
	schools: Array<MagicSchool>
): CalculatedCharacterSheet["schools"] {
	return Object.keys(spells).map(key => {
		const school = getByCode(key, schools)
		return {
			name: school.name,
			code: school.code,
			items: spells[key]!.map(spell => ({
				code: spell,
				name: getByCode(spell, school.spells).name
			}))
		}
	})
}

function formatFocuses(focuses: Focuses): CalculatedCharacterSheet["focuses"] {
	return Object.keys(focuses).map(key => {
		const skills = getByCode(key, SKILL_DEFINITIONS)
		return {
			name: skills.name,
			code: skills.code,
			items: focuses[key as SkillCode]!.map(focus => ({
				code: focus,
				name: focus
			}))
		}
	})
}

function formatTalents(
	values: Array<string>,
	talents: Array<Talent>
): CalculatedCharacterSheet["talents"] {
	return [
		{
			code: "profession1",
			name: "Profession 1",
			items: values.map(talent => ({
				name: getByCode(talent, talents).name,
				code: talent
			}))
		}
	]
}
