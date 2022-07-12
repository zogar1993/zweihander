import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

export default function calculateProfessions({
	character,
	professions
}: {
	character: Pick<
		SanitizedCharacterSheet,
		"profession1" | "profession2" | "profession3"
	>
	professions: Array<ProfessionTech>
}) {
	return [character.profession1, character.profession2, character.profession3]
		.filter(code => code)
		.map(code => getByCode(code!, professions))
}
