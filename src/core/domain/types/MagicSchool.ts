import { Spell } from "./Spell"

export type MagicSchool = {
	name: string
	code: string
	source: string
	spells: ReadonlyArray<Spell>
}
