import { UpdateAction } from "@api/character/[id]/update"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"

export default function applyActionsToCharacter(
	character: SanitizedCharacterSheet,
	changes: Array<UpdateAction>
) {
	const clone = deepClone(character)
	changes.forEach(({ action, property, value }) => {
		const parts = property.split(".")
		switch (action) {
			case "set_value":
				setValue(parts, clone, value)
				break
			case "remove_from_array":
				removeFromArray(parts, clone, value)
				break
			case "add_to_array":
				addToArray(parts, clone, value)
				break
			case "delete_property":
				deleteProperty(parts, clone)
				break
			default:
				throw Error(`'${action}' is not a valid action`)
		}
	})
	return clone
}

function setValue(parts: Array<string>, obj: any, value: any) {
	if (parts.length === 1) obj[parts[0]] = value
	else setValue(parts.slice(1), obj[parts[0]], value)
}

function removeFromArray(parts: Array<string>, obj: any, value: any) {
	if (parts.length === 1) {
		const list_key = parts[0]
		const old_list = obj[list_key]
		if (Array.isArray(old_list))
			obj[list_key] = old_list.filter((x, i) => i !== value)
		else throw Error(`'${JSON.stringify(old_list)}' is not an array`)
	} else removeFromArray(parts.slice(1), obj[parts[0]], value)
}

function addToArray(parts: Array<string>, obj: any, value: any) {
	if (parts.length === 1) {
		const list_key = parts[0]
		const old_list = obj[list_key]
		if (Array.isArray(old_list)) obj[list_key] = [...old_list, value]
		else throw Error(`'${JSON.stringify(old_list)}' is not an array`)
	} else addToArray(parts.slice(1), obj[parts[0]], value)
}

function deleteProperty(parts: Array<string>, obj: any) {
	if (parts.length === 1) delete parts[0]
	else deleteProperty(parts.slice(1), obj[parts[0]])
}

function deepClone<T>(obj: T) {
	return JSON.parse(JSON.stringify(obj)) as T
}
