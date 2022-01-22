// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import getAncestries from "@core/actions/GetAncestries"
import getArchetypes from "@core/actions/GetArchetypes"
import getChaosAlignments from "@core/actions/GetChaosAlignments"
import getCharacterSheetOfId from "@core/actions/GetCharacterSheetOfId"
import getOrderAlignments from "@core/actions/GetOrderAlignments"
import getProfessions from "@core/actions/GetProfessions"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { hasByCode } from "@core/domain/general/HasByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import applyActionsToCharacter from "@core/utils/ApplyActionsToCharacter"
import updateCharacter, {
	UpdateCharacterProps
} from "@core/utils/UpdateCharacter"
import {
	SEXES,
	SOCIAL_CLASSES,
	UPBRINGINGS
} from "@web/components/character_sheet/bio/Constants"
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
	const conflict_errors = await validateModel(changed)

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
		validations: { nullable: "string" }
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
		regex: new RegExp(`^spells.*$`), //TODO DOING use schools
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
		nullable?: "string"
		non_nullable?: "number"
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
		if (validations.nullable && action.value !== null)
			if (validations.nullable !== typeof action.value)
				throw [
					"client",
					action,
					`value must be a ${validations.nullable} or null`
				]
		if (validations.non_nullable)
			if (validations.non_nullable !== typeof action.value)
				throw ["client", action, `value must be ${validations.non_nullable}`]
	}

	return transform(action.property, action.value)
}

type InternalError = ["client" | "server", UpdateAction, string]

async function validateModel(character: SanitizedCharacterSheet) {
	const ancestries = await getAncestries()
	const archetypes = await getArchetypes()
	const professions = await getProfessions()
	const chaos_aligments = await getChaosAlignments()
	const order_aligments = await getOrderAlignments()
	const ancestry_traits =
		character.ancestry === null
			? []
			: ancestries.find(x => x.code === character.ancestry)?.traits ?? []

	const first_professions =
		character.archetype === null
			? []
			: archetypes
					.find(x => x.code === character.archetype)
					?.professions["Main Gauche"].map(x => ({ code: x.profession })) ?? []

	return [
		verifyDependencyIsNotNull("ancestry_trait", "ancestry", character),
		verifyDependencyIsNotNull("profession1", "archetype", character),
		verifyDependencyIsNotNull("profession2", "profession1", character),
		verifyDependencyIsNotNull("profession3", "profession2", character),
		verifyIsNullOrWithin("ancestry", ancestries, character),
		verifyIsNullOrWithin("ancestry_trait", ancestry_traits, character),
		verifyIsNullOrWithin("archetype", archetypes, character),
		verifyIsNullOrWithin("profession1", first_professions, character),
		verifyIsNullOrWithin("profession2", professions, character),
		verifyIsNullOrWithin("profession3", professions, character),
		verifyIsNullOrWithin("order_alignment", order_aligments, character),
		verifyIsNullOrWithin("chaos_alignment", chaos_aligments, character),
		verifyIsNullOrWithin("social_class", SOCIAL_CLASSES, character),
		verifyIsNullOrWithin("upbringing", UPBRINGINGS, character),
		verifyIsNullOrWithin("sex", SEXES, character)
	].flatMap(x => x)
}

function verifyDependencyIsNotNull(
	property: keyof SanitizedCharacterSheet,
	dependency: keyof SanitizedCharacterSheet,
	character: SanitizedCharacterSheet
) {
	if (character[property] !== null)
		if (character[dependency] === null)
			return [`cannot set ${property} while ${dependency} is null`]
	return []
}

function verifyIsNullOrWithin(
	property: keyof SanitizedCharacterSheet,
	collection: Array<{ code: string }>,
	character: SanitizedCharacterSheet
) {
	if (character[property] !== null)
		if (!hasByCode(character[property] as string, collection))
			return [`'${character[property]}' is not a valid ${property}`]
	return []
}
