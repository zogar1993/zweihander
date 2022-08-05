import { Archetype } from "@core/actions/GetArchetypes"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateAncestry from "@core/domain/character_sheet/calculations/CalculateAncestry"
import calculateProfessionProfile, { ProfessionProfile } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import calculateProfessions from "@core/domain/character_sheet/calculations/CalculateProfessions"
import calculateTalents from "@core/domain/character_sheet/calculations/CalculateTalents"
import {
	AncestryTech,
	CalculatedAttribute,
	CalculatedCharacterSheet,
	CharacterSpells,
	Flip,
	Focuses,
	MagicSchoolTech,
	Peril,
	ProfessionTech,
	SpecialRule,
	TalentTech
} from "@core/domain/character_sheet/CharacterSheet"
import Comboboxify from "@core/domain/character_sheet/Comboboxify"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

export function calculateCharacterSheet({
																					character,
																					ancestries,
																					professions,
																					schools,
																					talents,
																					archetypes
																				}: {
	character: SanitizedCharacterSheet
	ancestries: Array<AncestryTech>
	professions: Array<ProfessionTech>
	schools: Array<MagicSchoolTech>
	talents: Array<TalentTech>
	archetypes: Array<Archetype>
}): {
	character: CalculatedCharacterSheet
} {
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
		professions: _professions,
		talents
	})

	return {
		character: {
			ancestry: Comboboxify.ancestry({ character, ancestries }),
			ancestry_trait: Comboboxify.ancestryTrait({ character, ancestries }),
			archetype: Comboboxify.archetype({ character, archetypes }),
			profession1: Comboboxify.profession1({ character, professions, archetypes }),
			profession2: Comboboxify.profession2({ character, professions }),
			profession3: Comboboxify.profession3({ character, professions }),
			talent: Comboboxify.talent({ character, talents }),

			age: character.age,
			avatar: character.avatar,
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
				schools,
				profession_profile
			}),
			special_rules: special_rules,
			profession_profile
		}
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
													 attributes,
													 profession_profile
												 }: {
	character: SanitizedCharacterSheet
	schools: Array<MagicSchoolTech>
	attributes: Array<CalculatedAttribute>
	profession_profile: ProfessionProfile
}): number {

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

	let experience = 0

	if (spells.Petty && spells.Petty > 3) experience += (spells.Petty - 3) * 100
	if (spells.Lesser) experience += spells.Lesser * 200
	if (spells.Greater) experience += spells.Greater * 300

	forEachEntryInRecord(character.focuses, ([skill, focuses]) => {
		const favored = favored_skills.includes(skill)
		experience += (favored ? 50 : 100) * focuses.length
	})

	experience += character.profession1 ? 100 : 0
	experience += character.profession2 ? 200 : 0
	experience += character.profession3 ? 300 : 0

	profession_profile.professions.map((x, i) => {
		const multiplier = (i + 1) * 100
		experience += x.attributes.filter(x => x.checked).length * multiplier
		experience += x.skills.filter(x => x.checked).length * multiplier
		experience += x.talents.filter(x => x.checked).length * multiplier
		experience += x.wildcard_talents.filter(x => x.code).length * multiplier
	})

	experience += profession_profile.spending_outside_profession.talents.filter(x => x.checked).length * 100

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

