import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateTierAttributes
	from "@core/domain/character_sheet/calculations/profession_profile/CalculateTierAttributes"
import calculateTierSkills from "@core/domain/character_sheet/calculations/profession_profile/CalculateTierSkills"
import calculateTierTalents from "@core/domain/character_sheet/calculations/profession_profile/CalculateTierTalents"
import calculateTierWildcardTalents
	from "@core/domain/character_sheet/calculations/profession_profile/CalculateTierWildcardTalents"
import { CalculatedCombobox, ProfessionTech, TalentTech } from "@core/domain/character_sheet/CharacterSheet"
import type { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export default function calculateTiers({
																				 character,
																				 professions
																			 }: {
	character: CharacterSheet
	professions: ReadonlyArray<Profession>
}) {
	const attributes = calculateTierAttributes({ character, professions })
	const skills = calculateTierSkills({ character, professions })
	const talents = calculateTierTalents({ character, professions })
	const wildcards = calculateTierWildcardTalents({ talents })
	const tiers = professions.map((_, i) => ({
		attributes: attributes.results[i],
		skills: skills.results[i],
		talents: talents.results[i],
		wildcards: wildcards.results[i]
	}))
	const remaining = {
		attributes: attributes.expenditures,
		skills: skills.expenditures,
		talents: wildcards.expenditures
	}
	return { tiers, remaining }
}

type Profession = Pick<ProfessionTech, "advances">
type CharacterSheet = {
	attributes: Record<AttributeCode, { advances: number }>
	skills: SanitizedCharacterSheet["skills"]
	talents: SanitizedCharacterSheet["talents"]
}

export type  CalculateProfessionProfileProps = {
	character: CharacterSheet
	professions: ReadonlyArray<Profession>
	talentsCatalog: ReadonlyArray<TalentTech>
}

export type ProfessionProfile = {
	professions: [TierViewModel, TierViewModel, TierViewModel]
	unique_advances: Omit<TierViewModel, "profession">
}

export type TierViewModel = {
	profession: CalculatedCombobox
	attributes: ReadonlyArray<CharacterTierItem>
	skills: ReadonlyArray<CharacterTierItem>
	talents: ReadonlyArray<CharacterTierItem>
	wildcard_talents: ReadonlyArray<CalculatedCombobox>
}

export type CharacterTierItem = {
	name: string
	code: string
	checked: boolean
}

type ArrayElements<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

const WEAS = ["attributes", "skills", "talents"] as const