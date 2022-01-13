// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import updateCharacter, {
	UpdateCharacterProps
} from "@core/utils/UpdateCharacter"
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const id = req.query.id
	if (Array.isArray(id)) {
		res.status(500)
		return
	}

	const actions = req.body as Array<UpdateAction>
	if (!Array.isArray(actions)) {
		res.status(500)
		return
	}

	//TODO do better error handling
	const errors_415: Array<UpdateAction> = []
	const errors_500: Array<UpdateAction> = []
	const results: Array<UpdateCharacterProps> = []
	actions.forEach(action => {
		const endpoints = ENDPOINTS.filter(endpoint =>
			action.property.match(endpoint.regex)
		)
		if (endpoints.length === 0) errors_415.push(action)
		else if (endpoints.length > 1) errors_500.push(action)
		else results.push(endpoints[0][action.action]!(action.property, action.value))//TODO eww
	})

	if (errors_500.length > 0) {
		res.status(500)
		return
	}

	if (errors_415.length > 0) {
		res.status(415)
		return
	}

	const endpoints = results.reduce((previous, current) => ({
		...previous,
		...current
	}))

	await updateCharacter(id, endpoints)
	res.status(200)
}

export type UpdateAction = {
	action: "set_value" | "remove_from_array" | "add_to_array"
	property: string
	value: any
}

type WeaFunc = (property: string, payload: any) => UpdateCharacterProps

const SIMPLE_SET_VALUE_ENDPOINT = (property: string, payload: any) => {
	return { set: { [property]: payload } }
}

const SIMPLE_ADD_TO_ARRAY_ENDPOINT = (property: string, payload: any) => {
	return { push: { [property]: payload } }
}

const SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT = (property: string, payload: any) => {
	return { pull: { [property]: payload } }
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
		regex: /^profession_1$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^profession_2$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: /^profession_3$/,
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
		regex: new RegExp(
			`^skills.${regexCodes(SKILL_DEFINITIONS)}.ranks$`
		),
		set_value: SIMPLE_SET_VALUE_ENDPOINT
	},
	{
		regex: new RegExp(
			`^attributes.${regexCodes(ATTRIBUTE_DEFINITIONS)}.base$`
		),
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
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT
	},
	{
		regex: new RegExp(`^spells.*$`), //TODO use schools
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT
	}
]

type Endpoint = {
	regex: RegExp
	set_value?: WeaFunc
	remove_from_array?: WeaFunc
	add_to_array?: WeaFunc
} //TODO better this later with advanced types

function regexCodes(array: ReadonlyArray<{code: string}>) {
	return `(${array.map(x => x.code).join("|")})`
}