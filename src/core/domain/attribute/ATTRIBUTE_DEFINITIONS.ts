import { AttributeCode } from "@core/domain/attribute/AttributeCode"

export const ATTRIBUTE_DEFINITIONS: ReadonlyArray<AttributeDefinition> =
	Object.freeze([
		{
			name: "Combat",
			code: "combat"
		},
		{
			name: "Brawn",
			code: "brawn"
		},
		{
			name: "Agility",
			code: "agility"
		},
		{
			name: "Perception",
			code: "perception"
		},
		{
			name: "Intelligence",
			code: "intelligence"
		},
		{
			name: "Willpower",
			code: "willpower"
		},
		{
			name: "Fellowship",
			code: "fellowship"
		}
	])

export type AttributeDefinition = {
	name: string
	code: AttributeCode
}
