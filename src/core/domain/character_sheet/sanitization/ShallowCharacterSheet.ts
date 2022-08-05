import { CharacterSheetSettings, CharacterSpells, Focuses } from "@core/domain/character_sheet/CharacterSheet"

export type ShallowCharacterSheet = {
	id: string
	name: string
	age: number
	sex: string | null
	social_class: string | null
	upbringing: string | null
	damage: number
	peril: number
	avatar: string | null
	order_alignment: string | null
	chaos_alignment: string | null
	order_ranks: number
	chaos_ranks: number
	corruption: number
	journal: string
	ancestry_trait: string | null
	focuses: Focuses
	spells: CharacterSpells
	talents: Array<string>
	ancestry: string | null
	archetype: string | null
	profession1: string | null
	profession2: string | null
	profession3: string | null
	mercy: string | null
	settings: CharacterSheetSettings
	created_by: string
	created_at?: string
	updated_at: string
}
