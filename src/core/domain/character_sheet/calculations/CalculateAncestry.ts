import { AncestryTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

export default function calculateAncestry({
	character,
	ancestries
}: {
	character: Pick<SanitizedCharacterSheet, "ancestry">
	ancestries: Array<AncestryTech>
}) {
	return character.ancestry ? getByCode(character.ancestry, ancestries) : null
}
