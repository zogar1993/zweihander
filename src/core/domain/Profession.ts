import { AttributeBonuses } from "@core/domain/attribute/AttributeBonuses"

export type Profession = {
	name: string
	code: string
	book: string
	type: string
	prerequisite?: string
	description: string
	traits: Array<Trait>
	advances: ProfessionAdvances
}

export type ProfessionAdvances = {
	skill_ranks: Array<string>
	bonus_advances: AttributeBonuses
	talents: Array<string>
}

export type Trait = {
	name: string
	code?: string
	description: string
	effect: string
}
