import { AttributeBonuses } from "@core/domain/attribute/AttributeBonuses"

export type Profession = {
	name: string
	code: string
	book: string
	type: string
	prerequisite?: string
	description: string
	traits: ReadonlyArray<Trait>
	advances: ProfessionAdvances
}

export type ProfessionAdvances = {
	skill_ranks: ReadonlyArray<string>
	bonus_advances: AttributeBonuses
	talents: ReadonlyArray<string>
}

export type Trait = {
	name: string
	code: string
	description: string
	effect: string
}
