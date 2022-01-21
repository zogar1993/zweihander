// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getAncestries from "@core/actions/GetAncestries"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import applyActionsToCharacter from "@core/utils/ApplyActionsToCharacter"
import updateCharacter, {
	UpdateCharacterProps
} from "@core/utils/UpdateCharacter"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id = req.query.id
	if (Array.isArray(id)) return res.status(500)

	const actions = JSON.parse(req.body) as Array<UpdateAction>
	if (!Array.isArray(actions)) return res.status(500)

	const client_errors: Array<[UpdateAction, string]> = []
	const server_errors: Array<[UpdateAction, string]> = []
	const results: Array<UpdateCharacterProps> = []

	for (const action of actions) {
		try {
			results.push(await getActionResult(action))
		} catch (e: any) {
			if (Array.isArray(e)) {
				const [type, ...error] = e as InternalError
				switch (type) {
					case "client":
						client_errors.push(error)
						break
					case "server":
						server_errors.push(error)
						break
					default:
						throw e
				}
			} else throw e
		}
	}

	if (server_errors.length > 0) return res.status(500).json(server_errors)
	if (client_errors.length > 0) return res.status(400).json(client_errors)

	const character = await getCharacterSheetOfId(id)
	const changed = applyActionsToCharacter(character, actions)

	const conflict_errors: Array<string> = []
	if (changed.ancestry_trait !== null)
		if (changed.ancestry === null)
			conflict_errors.push("cannot set ancestry_trait while ancestry is null")
		else {
			const ancestry = getByCode(changed.ancestry, await getAncestries())
			if (ancestry.traits.every(trait => trait.code !== changed.ancestry_trait))
				conflict_errors.push(
					`'${changed.ancestry_trait}' is not a trait in ancestry '${changed.ancestry}'`
				)
		}

	if (conflict_errors.length > 0) return res.status(409).json(conflict_errors)

	await updateCharacter(id, flattenResults(results))
	res.status(200)
}

export type UpdateAction = {
	action: "set_value" | "remove_from_array" | "add_to_array" | "delete_property"
	property: string
	value?: any
}

type EndpointFunc = (property: string, payload?: any) => UpdateCharacterProps

const SIMPLE_SET_VALUE_ENDPOINT = (property: string, payload: any) => {
	return { set: { [property]: payload } }
}

const SIMPLE_ADD_TO_ARRAY_ENDPOINT = (property: string, payload: any) => {
	return { push: { [property]: payload } }
}

const SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT = (property: string, payload: any) => {
	return { pull: { [property]: payload } }
}

const SIMPLE_DELETE_PROPERTY_ENDPOINT = (property: string) => {
	return { unset: [property] }
}

const ENDPOINTS: Array<Endpoint> = [
	{
		regex: /^age$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { non_nullable: "number" }
	},
	{
		regex: /^ancestry$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: {
			predefined_values: async () => (await getAncestries()).map(x => x.code)
		}
	},
	{
		regex: /^ancestry_trait$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^name$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^sex$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^archetype$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^order_alignment$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^chaos_alignment$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^profession1$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^profession2$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^profession3$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^social_class$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^upbringing$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^corruption$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^chaos_ranks$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^order_ranks$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: new RegExp(`^skills.${regexCodes(SKILL_DEFINITIONS)}.ranks$`),
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: new RegExp(`^attributes.${regexCodes(ATTRIBUTE_DEFINITIONS)}.base$`),
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: new RegExp(
			`^attributes.${regexCodes(ATTRIBUTE_DEFINITIONS)}.advances$`
		),
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: new RegExp(`^talents$`),
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT
	},
	{
		regex: new RegExp(`^focuses.${regexCodes(SKILL_DEFINITIONS)}$`),
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		delete_property: SIMPLE_DELETE_PROPERTY_ENDPOINT
	},
	{
		regex: new RegExp(`^spells.*$`), //TODO P1 use schools
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		delete_property: SIMPLE_DELETE_PROPERTY_ENDPOINT
	},
	{
		regex: /^avatar$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^thumbnail/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	}
]

function regexCodes(array: ReadonlyArray<{ code: string }>) {
	return `(${array.map(x => x.code).join("|")})`
}

export type Endpoint = {
	[key in UpdateAction["action"]]?: EndpointFunc
} & {
	regex: RegExp
	validations?: {
		non_nullable?: "number"
		predefined_values?: () => Promise<Array<string>>
	}
}

function flattenResults(results: Array<UpdateCharacterProps>) {
	return results.reduce((previous, current) => {
		const merging = { ...previous }
		const key = Object.keys(current)[0]
		switch (key) {
			case "unset":
				merging[key] = mergeArrays(previous[key], current[key])
				break
			case "set":
			case "push":
			case "pull":
				merging[key] = mergeObjects(previous[key], current[key])
				break
		}
		return merging
	})
}

const mergeObjects = (obj1?: object, obj2?: object) =>
	obj1 === undefined ? obj2 : obj2 === undefined ? obj1 : { ...obj1, ...obj2 }
const mergeArrays = (arr1?: any[], arr2?: any[]) =>
	arr1 === undefined ? arr2 : arr2 === undefined ? arr1 : [...arr1, ...arr2]

async function getActionResult(action: UpdateAction) {
	const endpoints = ENDPOINTS.filter(endpoint =>
		action.property.match(endpoint.regex)
	)
	if (endpoints.length === 0) throw ["client", action, "action not found"]
	if (endpoints.length > 1) throw ["server", action, "ambiguous action"]

	const { [action.action]: transform, validations } = endpoints[0]
	if (transform === undefined) throw ["client", action, "action not found"]

	if (validations) {
		if (validations.non_nullable)
			if (validations.non_nullable !== typeof action.value)
				throw ["client", action, "value must be a number"]
		if (validations.predefined_values && action.value !== null) {
			const values = await validations.predefined_values()
			if (!values.includes(action.value))
				throw ["client", action, "value must be among predefined ones"]
		}
	}

	return transform(action.property, action.value)
}

type InternalError = ["client" | "server", UpdateAction, string]
