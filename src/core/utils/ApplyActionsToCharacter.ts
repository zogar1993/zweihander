import { UpdateAction } from "@api/characters/[id]/update"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getDeepPropertyValue } from "@core/utils/GetDeepPropertyValue"

export default function applyActionsToCharacter(
	character: SanitizedCharacterSheet,
	changes: Array<UpdateAction>
) {
	const clone = deepClone(character)
	changes.forEach(({ action, property, value }) => {
		const full_parts = property.split(".")
		const container_parts = full_parts.slice(0, -1)
		const last_part = full_parts[full_parts.length - 1] as string
		const container = getDeepPropertyValue(container_parts, clone)
		switch (action) {
			case "set_value":
				container[last_part] = value
				break
			case "remove_from_array": {
				const array = container[last_part]
				if (!Array.isArray(array))
					throw Error(`'${JSON.stringify(array)}' is not an array`)
				container[last_part] = array.filter(x => x !== value)
				break
			}
			case "add_to_array": {
				const array = container[last_part]
				if (!Array.isArray(array))
					throw Error(`'${JSON.stringify(array)}' is not an array`)
				array.push(value)
				break
			}
			case "delete_property":
				delete container[last_part]
				break
			default:
				throw Error(`'${action}' is not a valid action`)
		}
	})
	return clone
}

function deepClone<T>(obj: T) {
	return JSON.parse(JSON.stringify(obj)) as T
}
