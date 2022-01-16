// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import updateCharacter, { UpdateCharacterProps } from "@core/utils/UpdateCharacter"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id = req.query.id
	if (Array.isArray(id)) return res.status(500)

	const actions = req.body as Array<UpdateAction>
	if (!Array.isArray(actions)) return res.status(500)

	//TODO P1 do better error handling
	const errors_415: Array<UpdateAction> = []
	const errors_500: Array<UpdateAction> = []
	const results: Array<UpdateCharacterProps> = []
	actions.forEach(action => {
		const endpoints = ENDPOINTS.filter(endpoint =>
			action.property.match(endpoint.regex)
		)
		if (endpoints.length === 0) return errors_415.push(action)
		if (endpoints.length > 1) return errors_500.push(action)
		const endpoint = endpoints[0][action.action]
		if (endpoint === undefined) return errors_415.push(action)
		const result = endpoint(action.property, action.value)
		results.push(result)
	})

	if (errors_500.length > 0) return res.status(500)
	if (errors_415.length > 0) return res.status(415)

	//TODO P0 this wont work with 2 of the aame kind i think
	const endpoints = results.reduce((previous, current) => ({
		...previous,
		...current
	}))

	await updateCharacter(id, endpoints)
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
		regex: /^name$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^age$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^sex$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^ancestry$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^ancestry_trait$/,
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
	}
]

function regexCodes(array: ReadonlyArray<{ code: string }>) {
	return `(${array.map(x => x.code).join("|")})`
}

export type Endpoint = {
	[key in UpdateAction["action"]]?: EndpointFunc;
} & { regex: RegExp }