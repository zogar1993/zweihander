import { Ancestry, AncestryTrait } from "@core/domain/Ancestry"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateAncestry from "@core/domain/character_sheet/calculations/CalculateAncestry"
import calculateProfessionProfile, {
	ProfessionProfile
} from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import calculateProfessions from "@core/domain/character_sheet/calculations/CalculateProfessions"
import calculateTalents from "@core/domain/character_sheet/calculations/CalculateTalents"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { Item } from "@core/domain/Item"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Principle, Spell } from "@core/domain/Spell"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

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
																				}: {
	character: SanitizedCharacterSheet
	ancestries: Array<AncestryTech>
	professions: Array<ProfessionTech>
	schools: Array<MagicSchoolTech>
	talents: Array<TalentTech>
}): CalculatedCharacterSheet {
	const ancestry = calculateAncestry({ character, ancestries })
	const _professions = calculateProfessions({ character, professions })
	const _talents = calculateTalents({
		character,
		talents,
		professions: _professions
	})

	const attributes = getAttributes({
		character,
		ancestry,
		professions: _professions
	})

	const getAttribute = (code: AttributeCode) => getByCode(code, attributes)

	const special_rules = getSpecialRules({
		character,
		talents,
		professions: _professions,
		ancestry
	})

	const profession_profile = calculateProfessionProfile({
		character,
		professions: _professions
	})

	return {
		ancestry: character.ancestry,
		ancestry_trait: character.ancestry_trait,
		age: character.age,
		avatar: character.avatar,
		archetype: character.archetype,
		chaos_alignment: character.chaos_alignment,
		chaos_ranks: character.chaos_ranks,
		corruption: character.corruption,
		created_by: character.created_by,
		id: character.id,
		journal: character.journal,
		name: character.name,
		order_alignment: character.order_alignment,
		order_ranks: character.order_ranks,
		sex: character.sex,
		settings: character.settings,
		social_class: character.social_class,
		upbringing: character.upbringing,
		updated_at: character.updated_at,
		profession1: character.profession1,
		profession2: character.profession2,
		profession3: character.profession3,

		attributes,
		damage: {
			value: character.damage,
			threshold: getAttribute("brawn").bonus
		},
		peril: {
			value: character.peril,
			threshold: getAttribute("willpower").bonus + 3
		},
		schools: formatSpells(character.spells, schools),
		focuses: formatFocuses(character.focuses),
		talents: _talents,
		encumbrance_limit: 3 + getAttribute("brawn").bonus,
		initiative: 3 + getAttribute("perception").bonus,
		movement: 3 + getAttribute("agility").bonus,
		maximum_focuses: getAttribute("intelligence").bonus,
		maximum_languages: getAttribute("fellowship").bonus,
		spent_experience: spentExperience({
			character,
			attributes,
			schools
		}),
		special_rules: special_rules,
		profession_profile
	}
}

function getAttributes({
												 character,
												 ancestry,
												 professions
											 }: {
	character: Pick<SanitizedCharacterSheet, "attributes" | "skills" | "mercy" | "peril" | "focuses">
	ancestry: Pick<AncestryTech, "attribute_bonuses"> | null
	professions: Array<Pick<ProfessionTech, "advances">>
}): Array<CalculatedAttribute> {
	return ATTRIBUTE_DEFINITIONS.map(attribute => {
		const { base: raw_base, advances } = character.attributes[attribute.code]
		const ancestry_bonus = ancestry?.attribute_bonuses[attribute.code] || 0
		const mercy = character.mercy === attribute.code
		const base = mercy ? 42 : raw_base
		const bonus = Math.floor(base / 10) + advances + ancestry_bonus
		const profession_advances = professions
			.map(x => x.advances.bonus_advances[attribute.code] || 0)
			.reduce((x, y) => x + y, 0)

		const skills = SKILL_DEFINITIONS.filter(
			skill => skill.attribute === attribute.code
		).map(skill => {
			const { ranks } = character.skills[skill.code]
			const is_incapacitated = () => character.peril === Peril.Incapacitated
			const relevant_ranks = () =>
				character.peril >= Peril.Ignore1SkillRank
					? Math.max(0, ranks - (character.peril - 1) /* enum arithmetics */)
					: ranks
			const profession_ranks = professions.filter(profession =>
				profession.advances.skill_ranks.includes(skill.code)
			).length

			return {
				...skill,
				ranks,
				chance: is_incapacitated() ? 0 : base + relevant_ranks() * 10,
				profession_ranks,
				has_focuses: !!character.focuses[skill.code],
				flip: skill.special && ranks === 0 ? Flip.ToFail : Flip.None
			}
		})

		return {
			...attribute,
			base,
			advances,
			bonus,
			ancestry_bonus,
			profession_advances,
			mercy_possible: raw_base < 42,
			mercy: mercy,
			skills: skills
		}
	})
}

function getSpecialRules({
													 character,
													 talents,
													 professions,
													 ancestry
												 }: {
	character: SanitizedCharacterSheet
	talents: Array<TalentTech>
	professions: Array<ProfessionTech>
	ancestry: AncestryTech | null
}): Array<SpecialRule> {
	const ancestry_trait = ancestry ?
		ancestry.traits.find(x => x.code === character.ancestry_trait) : null
	return [
		...(ancestry_trait ? [ancestry_trait] : []),
		...character.talents.map(x => getByCode(x!, talents)),
		...professions.flatMap(x => x.traits)
	]
}

function spentExperience({
													 character,
													 schools,
													 attributes
												 }: {
	character: SanitizedCharacterSheet
	schools: Array<MagicSchoolTech>
	attributes: Array<CalculatedAttribute>
}): number {
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

	const favored_attribute = UPBRINGINGS.find(
		x => x.code === character.upbringing
	)?.attribute

	const favored_skills = attributes
		.filter(attribute => attribute.code === favored_attribute)
		.flatMap(attribute => attribute.skills)
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
		attributes: attributes,
		focuses: character.focuses,
		favored_skills: favored_skills,
		profession1_talents_amount: profession1_talents_amount,
		profession2_talents_amount: profession2_talents_amount,
		profession3_talents_amount: profession3_talents_amount,
		spells
	})
}

function calculateExperience({
															 profession1,
															 profession2,
															 profession3,
															 attributes,
															 profession1_talents_amount,
															 profession2_talents_amount,
															 profession3_talents_amount,
															 focuses,
															 spells,
															 favored_skills
														 }: {
	profession1: string | null
	profession2: string | null
	profession3: string | null
	attributes: Array<CalculatedAttribute>
	profession1_talents_amount: number
	profession2_talents_amount: number
	profession3_talents_amount: number
	focuses: Partial<Record<SkillCode, Array<string>>>
	favored_skills: Array<SkillCode>
	spells: Partial<Record<Principle, number>>
}): number {
	let experience = 0

	if (profession1) experience += 100
	if (profession2) experience += 200
	if (profession3) experience += 300

	attributes
		.flatMap(attribute => attribute.skills)
		.forEach(skill => {
			if (skill.ranks >= 1)
				experience += skill.profession_ranks >= 1 ? 100 : 200
			if (skill.ranks >= 2)
				experience += skill.profession_ranks >= 2 ? 200 : 400
			if (skill.ranks >= 3)
				experience += skill.profession_ranks >= 3 ? 300 : 600
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

export type Visibility = "public" | "private"
export type CharacterSheetSettings = {
	visibility: Visibility
}
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
	talents: Array<Item & { items: Array<Item> }>
	ancestry_trait: string | null

	journal: string
	spent_experience: number
	focuses: Array<Item & { items: Array<Item> }>
	schools: Array<Item & { items: Array<Item> }>

	special_rules: Array<SpecialRule>

	settings: CharacterSheetSettings
	created_by: string
	updated_at: string

	profession_profile: ProfessionProfile
}>

export type ConditionTrack = {
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
	skills: Array<CalculatedSkill>
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
}

export type SpecialRule = {
	name: string
	effect: string
}

function formatSpells(
	spells: CharacterSpells,
	schools: Array<MagicSchoolTech>
): CalculatedCharacterSheet["schools"] {
	return Object.keys(spells).map(key => {
		const school = getByCode(key, schools)
		return {
			name: school.name,
			code: school.code,
			items: spells[key]!.map(spell => getByCode(spell, school.spells))
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

export type AncestryTraitTech = Pick<AncestryTrait,
	"name" | "code" | "effect" | "from" | "to">
export type TraitTech = Pick<AncestryTrait, "name" | "code" | "effect">
export type AncestryTech = Pick<Ancestry,
	"name" | "code" | "attribute_bonuses"> & {
	traits: Array<AncestryTraitTech>
}

export type ProfessionTech = Pick<Profession, "name" | "code" | "advances"> & {
	traits: Array<TraitTech>
}

export type SpellTech = Pick<Spell, "name" | "code" | "principle" | "effect">
export type MagicSchoolTech = Pick<MagicSchool, "name" | "code" | "source"> & {
	spells: Array<SpellTech>
}

export type TalentTech = TraitTech
