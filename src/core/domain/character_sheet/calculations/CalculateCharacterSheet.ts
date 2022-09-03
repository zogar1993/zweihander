import { Archetype } from "@core/actions/GetArchetypes"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateAncestry from "@core/domain/character_sheet/calculations/CalculateAncestry"
import calculateProfessions from "@core/domain/character_sheet/calculations/CalculateProfessions"
import calculateTiers, { ProfessionProfile } from "@core/domain/character_sheet/calculations/CalculateTiers"
import calculateExperience from "@core/domain/character_sheet/calculations/experience/CalculateExperience"
import { AdvancesDistinction } from "@core/domain/character_sheet/calculations/tiers/reducers"
import {
	AncestryTech,
	CalculatedAttribute,
	CalculatedCharacterSheet,
	CalculatedCheckbox,
	CharacterSpells,
	Flip,
	Focuses,
	MagicSchoolTech,
	Peril,
	ProfessionTech,
	SpecialRule,
	TraitTech
} from "@core/domain/character_sheet/CharacterSheet"
import Comboboxify from "@core/domain/character_sheet/Comboboxify"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Item } from "@core/domain/types/Item"

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
	talents: ReadonlyArray<TraitTech>
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

	const professionProfile = calculateTiers({ character, professions })

	const combobox_professions = [
		Comboboxify.profession1({ character, professionsCatalog, archetypesCatalog }),
		Comboboxify.profession2({ character, professionsCatalog }),
		Comboboxify.profession3({ character, professionsCatalog })
	]

	const tiersViewModel = Array.from(Array(3), (_, i) =>
		i < professions.length ? {
			attributes: toCheckbox(professionProfile.tiers[i].attributes, ATTRIBUTE_DEFINITIONS),
			skills: toCheckbox(professionProfile.tiers[i].skills, SKILL_DEFINITIONS),
			talents: toCheckbox(professionProfile.tiers[i].talents, talentsCatalog),
			wildcard_talents: toCombobox(professionProfile.tiers[i].wildcards, talentsCatalog)
		} : {
			attributes: emptyCheckboxes(7),
			skills: emptyCheckboxes(10),
			talents: emptyCheckboxes(3),
			wildcard_talents: []
		}
	).map((tier, i) => ({ ...tier, profession: combobox_professions[i] }))


	const wea: ProfessionProfile = {
		professions: tiersViewModel as unknown as ProfessionProfile["professions"],
		unique_advances: getUniqueAdvances({
			expenditures: professionProfile.remaining, talents: talentsCatalog
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
			spent_experience: calculateExperience({
				character,
				schoolsCatalog,
				professionProfile
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
	talentsCatalog: ReadonlyArray<TraitTech>
	professions: ReadonlyArray<ProfessionTech>
	ancestry: AncestryTech | null
}): ReadonlyArray<SpecialRule> {
	const ancestry_trait = ancestry ?
		ancestry.traits.find(x => x.code === character.ancestry_trait) : null

	const traits = professions.flatMap(x => x.traits).flatMap(x => [
		x.profession,
		...(x.special ? [x.special] : []),
		...(x.drawback ? [x.drawback] : [])
	])
	const singles = new Set(traits.map(x => x.code))
	const filtered = [...singles].map(code => traits.find(trait => trait.code === code)!)

	return [
		...(ancestry_trait ? [ancestry_trait] : []),
		...character.talents.map(x => getByCode(x!, talentsCatalog)),
		...filtered
	]
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


const toCheckbox = (wea: AdvancesDistinction, items: ReadonlyArray<Item>) => {
	return wea.bought.map(x => ({
		code: x,
		name: getByCode(x, items).name,
		checked: true
	})).concat(wea.missing.map(x => ({ code: x, name: getByCode(x, items).name, checked: false })))
}

const EMPTY_CHECKBOX = { code: "", name: "", checked: false, disabled: true }
const emptyCheckboxes = (amount: number): ReadonlyArray<CalculatedCheckbox> =>
	Array.from(Array(amount), () => EMPTY_CHECKBOX)


const toCombobox = (wea: ReadonlyArray<string | null>, items: ReadonlyArray<Item>) => {
	return wea.map(x => ({ code: x, options: items }))
}


const toItem = (item: Item) => ({ name: item.name, code: item.code, checked: true })

function getUniqueAdvances({
														 expenditures,
														 talents
													 }: {
	expenditures: CharacterExpenditures,
	talents: ReadonlyArray<TraitTech>
}): Omit<ProfessionProfile["unique_advances"], "profession"> {
	return {
		attributes: expenditures.attributes.map(code => getByCode(code, ATTRIBUTE_DEFINITIONS)).map(toItem),
		skills: expenditures.skills.map(code => getByCode(code, SKILL_DEFINITIONS)).map(toItem),
		talents: expenditures.talents.map(code => getByCode(code, talents)).map(toItem)
	}
}

type CharacterExpenditures = Record<"attributes" | "skills" | "talents", ReadonlyArray<string>>