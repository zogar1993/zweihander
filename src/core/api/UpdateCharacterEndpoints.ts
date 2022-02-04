import { UpdateActionCode } from "@core/api/UpdateActionCode"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { UpdateCharacterProps } from "@core/utils/UpdateCharacter"

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

export const UPDATE_CHARACTER_ENDPOINTS: Array<Endpoint> = [
	{
		regex: /^age$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0 } }
	},
	{
		regex: /^ancestry$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^ancestry_trait$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^name$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: false } }
	},
	{
		regex: /^journal$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: false } }
	},
	{
		regex: /^sex$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^archetype$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^order_alignment$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^chaos_alignment$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^profession1$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^profession2$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^profession3$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^social_class$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^upbringing$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^corruption$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 9 } }
	},
	{
		regex: /^chaos_ranks$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 9 } }
	},
	{
		regex: /^order_ranks$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 9 } }
	},
	{
		regex: new RegExp(`^skills.${regexCodes(SKILL_DEFINITIONS)}.ranks$`),
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 3 } }
	},
	{
		regex: new RegExp(`^attributes.${regexCodes(ATTRIBUTE_DEFINITIONS)}.base$`),
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 28, max: 55 } }
	},
	{
		regex: new RegExp(
			`^attributes.${regexCodes(ATTRIBUTE_DEFINITIONS)}.advances$`
		),
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 6 } }
	},
	{
		regex: new RegExp(`^talents$`),
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT,
		validations: { array_strings: {} }
	},
	{
		regex: new RegExp(`^focuses.${regexCodes(SKILL_DEFINITIONS)}$`),
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		delete_property: SIMPLE_DELETE_PROPERTY_ENDPOINT,
		validations: { array_strings: {} }
	},
	{
		regex: new RegExp(`^spells.*$`),
		add_to_array: SIMPLE_ADD_TO_ARRAY_ENDPOINT,
		remove_from_array: SIMPLE_REMOVE_FROM_ARRAY_ENDPOINT,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		delete_property: SIMPLE_DELETE_PROPERTY_ENDPOINT,
		validations: { array_strings: {} }
	},
	{
		regex: /^avatar$/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^thumbnail/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: true } }
	},
	{
		regex: /^settings.skill_order/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: false } }
	},
	{
		regex: /^settings.visibility/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { string: { nullable: false } }
	},
	{
		regex: /^peril/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 5 } }
	},
	{
		regex: /^damage/,
		set_value: SIMPLE_SET_VALUE_ENDPOINT,
		validations: { number: { nullable: false, min: 0, max: 5 } }
	}
]

function regexCodes(array: ReadonlyArray<{ code: string }>) {
	return `(${array.map(x => x.code).join("|")})`
}

export type Endpoint = {
	[key in UpdateActionCode]?: EndpointFunc
} & {
	regex: RegExp
	validations?: {
		number?: {
			nullable?: boolean
			min?: number
			max?: number
		}
		string?: { nullable?: boolean }
		array_strings?: {}
	}
}
