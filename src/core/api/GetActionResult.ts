import { UpdateAction } from "@api/characters/[id]/update"
import { UPDATE_CHARACTER_ENDPOINTS } from "@core/api/UpdateCharacterEndpoints"

export async function getActionResult(action: UpdateAction) {
	const endpoints = UPDATE_CHARACTER_ENDPOINTS.filter(endpoint =>
		action.property.match(endpoint.regex)
	)
	if (endpoints.length === 0) throw [action, "action not found"]
	if (endpoints.length > 1)
		throw Error(`property '${action.property}' is ambiguous`)

	const { [action.action]: transform, validations } = endpoints[0]
	if (transform === undefined) throw [action, "action not found"]

	if (validations) {
		if (validations.number) {
			const { nullable, min, max } = validations.number
			if (action.value === null) {
				if (!nullable) throw [action, "must not be null"]
			} else {
				const value = Number(action.value)
				if (!Number.isInteger(value)) throw [action, "must be an integer"]

				if (Number.isInteger(min) && value < min!)
					throw [action, `min is ${min}`]

				if (Number.isInteger(max) && value > max!)
					throw [action, `max is ${max}`]
			}
		} else if (validations.string) {
			const { nullable } = validations.string
			if (action.value === null) {
				if (!nullable) throw [action, "must not be null"]
			} else if (typeof action.value !== "string")
				throw [action, "must be a string"]
		} else if (validations.array_strings) {
			switch (action.action) {
				case "set_value":
					if (
						!Array.isArray(action.value) ||
						!action.value.every(x => typeof x === "string")
					)
						throw [action, "must be an array of strings"]
					break
				case "add_to_array":
				case "remove_from_array":
					if (typeof action.value !== "string")
						throw [action, "must be a string"]
					break
			}
		}
	}

	return transform(action.property, action.value)
}

export type InternalError = [UpdateAction, string]
