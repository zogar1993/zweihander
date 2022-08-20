import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import calculateTierAttributes
	from "@core/domain/character_sheet/calculations/tiers/CalculateTierAttributes"
import calculateTierSkills from "@core/domain/character_sheet/calculations/tiers/CalculateTierSkills"
import calculateTierTalents from "@core/domain/character_sheet/calculations/tiers/CalculateTierTalents"
import calculateTierWildcardTalents
	from "@core/domain/character_sheet/calculations/tiers/CalculateTierWildcardTalents"
import {
	CalculatedCheckbox,
	CalculatedCombobox,
	ProfessionTech,
	TraitTech
} from "@core/domain/character_sheet/CharacterSheet"
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
	talentsCatalog: ReadonlyArray<TraitTech>
}

export type ProfessionProfile = {
	professions: [TierViewModel, TierViewModel, TierViewModel]
	unique_advances: Omit<TierViewModel, "profession" | "wildcard_talents">
}

export type TierViewModel = {
	profession: CalculatedCombobox
	attributes: ReadonlyArray<CalculatedCheckbox>
	skills: ReadonlyArray<CalculatedCheckbox>
	talents: ReadonlyArray<CalculatedCheckbox>
	wildcard_talents: ReadonlyArray<CalculatedCombobox>
}
