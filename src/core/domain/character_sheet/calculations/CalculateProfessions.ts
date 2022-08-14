import { ProfessionTech } from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"

export default function calculateProfessions({
	character,
	professionsCatalog
}: {
	character: Pick<
		SanitizedCharacterSheet,
		"profession1" | "profession2" | "profession3"
	>
	professionsCatalog: ReadonlyArray<ProfessionTech>
}) {
	return [character.profession1, character.profession2, character.profession3]
		.filter(code => code)
		.map(code => getByCode(code!, professionsCatalog))
}
