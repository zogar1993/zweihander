import { AncestryTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

export default function calculateAncestry({
	character,
	ancestriesCatalog
}: {
	character: Pick<SanitizedCharacterSheet, "ancestry">
	ancestriesCatalog: ReadonlyArray<AncestryTech>
}): AncestryTech | null {
	return character.ancestry ? getByCode(character.ancestry, ancestriesCatalog) : null
}
