import { AttributeBonuses } from "@core/domain/attribute/AttributeBonuses"

export type Ancestry = {
	name: string
	code: string
	description: string
	type: string
	family: string
	traits: ReadonlyArray<AncestryTrait>
	attribute_bonuses: AttributeBonuses
	icon: string
	image: string
}

export type AncestryTrait = {
	name: string
	code: string
	description: string
	effect: string
	from: number
	to: number
}
