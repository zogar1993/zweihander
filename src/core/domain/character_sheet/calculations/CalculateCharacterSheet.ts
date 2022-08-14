import { Archetype } from "@core/actions/GetArchetypes"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateAncestry from "@core/domain/character_sheet/calculations/CalculateAncestry"
import calculateTiers, {
	TierViewModel, CharacterTierItem,
	ProfessionProfile
} from "@core/domain/character_sheet/calculations/CalculateTiers"
import calculateProfessions from "@core/domain/character_sheet/calculations/CalculateProfessions"
import { AdvancesDistinction } from "@core/domain/character_sheet/calculations/profession_profile/reducers"
import {
	AncestryTech,
	CalculatedAttribute,
	CalculatedCharacterSheet, CalculatedCombobox,
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
import { Item } from "@core/domain/types/Item"
import { UPBRINGINGS } from "@web/components/character_sheet/bio/Constants"

export function calculateCharacterSheet({
																					character,
																					ancestries: ancestriesCatalog,
																					professions: professionsCatalog,
																					schools: schoolsCatalog,
																					talents: talentsCatalog,
																					archetypes: archetypesCatalog
																				}: {
	character: SanitizedCharacterSheet
	ancestries: ReadonlyArray<AncestryTech>
	professions: ReadonlyArray<ProfessionTech>
	schools: ReadonlyArray<MagicSchoolTech>
	talents: ReadonlyArray<TalentTech>
	archetypes: ReadonlyArray<Archetype>
}): {
	character: CalculatedCharacterSheet
} {
	const ancestry = calculateAncestry({ character, ancestriesCatalog })
	const professions = calculateProfessions({ character, professionsCatalog })
	const attributes = getAttributes({ character, ancestry, professions })

	const getAttribute = (code: AttributeCode) => getByCode(code, attributes)

	const special_rules = getSpecialRules({
		character,
		talentsCatalog,
		professions,
		ancestry
	})

	const { tiers, remaining } = calculateTiers({ character, professions })




	const combobox_professions = [
		Comboboxify.profession1({ character, professionsCatalog, archetypesCatalog }),
		Comboboxify.profession2({ character, professionsCatalog }),
		Comboboxify.profession3({ character, professionsCatalog })
	]

	const tiersViewModel = Array.from(Array(3), (_, i) =>
		i < professions.length ? {
			attributes: doStuff(tiers[i].attributes, ATTRIBUTE_DEFINITIONS),
			skills: doStuff(tiers[i].skills, SKILL_DEFINITIONS),
			talents: doStuff(tiers[i].talents, talentsCatalog),
			wildcard_talents: doStuffCombobox(tiers[i].wildcards, talentsCatalog)
		} : {
			attributes: emptyCheckboxes(7),
			skills: emptyCheckboxes(10),
			talents: emptyCheckboxes(3),
			wildcard_talents: []
		}
	).map((tier, i) => ({...tier, profession: combobox_professions[i]}))


	const wea: ProfessionProfile = {
		professions: tiersViewModel as unknown as ProfessionProfile["professions"],
		unique_advances: getUniqueAdvances({
			expenditures: remaining, talents: talentsCatalog
		})
	}

	return {
		character: {
			ancestry: Comboboxify.ancestry({ character, ancestriesCatalog }),
			ancestry_trait: Comboboxify.ancestryTrait({ character, ancestriesCatalog }),
			archetype: Comboboxify.archetype({ character, archetypesCatalog }),
			talent: Comboboxify.talent({ character, talentsCatalog }),
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
			schools: formatSpells(character.spells, schoolsCatalog),
			focuses: formatFocuses(character.focuses),
			encumbrance_limit: 3 + getAttribute("brawn").bonus,
			initiative: 3 + getAttribute("perception").bonus,
			movement: 3 + getAttribute("agility").bonus,
			maximum_focuses: getAttribute("intelligence").bonus,
			maximum_languages: getAttribute("fellowship").bonus,
			spent_experience: spentExperience({
				character,
				attributes,
				schoolsCatalog,
				profession_profile: wea
			}),
			special_rules: special_rules,
			profession_profile: wea
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
	professions: ReadonlyArray<Pick<ProfessionTech, "advances">>
}): ReadonlyArray<CalculatedAttribute> {
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
													 talentsCatalog,
													 professions,
													 ancestry
												 }: {
	character: SanitizedCharacterSheet
	talentsCatalog: ReadonlyArray<TalentTech>
	professions: ReadonlyArray<ProfessionTech>
	ancestry: AncestryTech | null
}): ReadonlyArray<SpecialRule> {
	const ancestry_trait = ancestry ?
		ancestry.traits.find(x => x.code === character.ancestry_trait) : null
	return [
		...(ancestry_trait ? [ancestry_trait] : []),
		...character.talents.map(x => getByCode(x!, talentsCatalog)),
		...professions.flatMap(x => x.traits)
	]
}

function spentExperience({
													 character,
													 schoolsCatalog,
													 attributes,
													 profession_profile
												 }: {
	character: SanitizedCharacterSheet
	schoolsCatalog: ReadonlyArray<MagicSchoolTech>
	attributes: ReadonlyArray<CalculatedAttribute>
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
		const schoolSpells = getByCode(schoolCode, schoolsCatalog).spells
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

	experience += profession_profile.unique_advances.talents.filter(x => x.checked).length * 100

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
	schools: ReadonlyArray<MagicSchoolTech>
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


const doStuff = (wea: AdvancesDistinction, items: ReadonlyArray<Item>): Array<CharacterTierItem> => {
	return wea.bought.map(x => ({
		code: x,
		name: getByCode(x, items).name,
		checked: true
	})).concat(wea.missing.map(x => ({ code: x, name: getByCode(x, items).name, checked: false })))
}

const EMPTY_CHECKBOX = { code: "", name: "", checked: false, disabled: true }
const emptyCheckboxes = (amount: number): Array<CharacterTierItem> =>
	Array.from(Array(amount), () => EMPTY_CHECKBOX)


const doStuffCombobox = (wea: Array<string | null>, items: ReadonlyArray<Item>): Array<CalculatedCombobox> => {
	return wea.map(x => ({ code: x, options: items }) as CalculatedCombobox)
}


const toItem = (item: Item) => ({ name: item.name, code: item.code, checked: false })

function getUniqueAdvances({
														 expenditures,
														 talents
													 }: {
	expenditures: CharacterExpenditures,
	talents: ReadonlyArray<TalentTech>
}): Omit<ProfessionProfile["unique_advances"], "profession"> {
	return {
		attributes: expenditures.attributes.map(code => getByCode(code, ATTRIBUTE_DEFINITIONS)).map(toItem),
		skills: expenditures.skills.map(code => getByCode(code, SKILL_DEFINITIONS)).map(toItem),
		talents: expenditures.talents.map(code => getByCode(code, talents)).map(toItem),
		wildcard_talents: []
	}
}
type CharacterExpenditures = Record<"attributes" | "skills" | "talents", ReadonlyArray<string>>