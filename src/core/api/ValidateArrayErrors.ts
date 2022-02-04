import { UpdateAction } from "@api/characters/[id]/update"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getDeepPropertyValue } from "@core/utils/GetDeepPropertyValue"

export function validateArrayErrors(
	character: SanitizedCharacterSheet,
	actions: Array<UpdateAction>
) {
	return actions
		.filter(
			x => x.action === "add_to_array" || x.action === "remove_from_array"
		)
		.filter(
			x => getDeepPropertyValue(x.property.split("."), character) === undefined
		)
		.map(
			x =>
				`you need to set_value to ${x.property} first in order to ${x.action}`
		)
}