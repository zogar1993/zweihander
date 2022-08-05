import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { ProfessionProfile } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Ancestry, AncestryTrait } from "@core/domain/types/Ancestry"
import { Item } from "@core/domain/types/Item"
import { MagicSchool } from "@core/domain/types/MagicSchool"
import { Profession } from "@core/domain/types/Profession"
import { Spell } from "@core/domain/types/Spell"

export enum Flip {
	None,
	ToFail,
	ToSucceed
}

export enum Peril {
	Unhindered = 0,
	Imperiled = 1,
	Ignore1SkillRank = 2,
	Ignore2SkillRank = 3,
	Ignore3SkillRank = 4,
	Incapacitated = 5
}

export type Visibility = "public" | "private"
export type CharacterSheetSettings = {
	visibility: Visibility
}
export type SchoolCode = string
export type SpellCode = string
export type CharacterSpells = Partial<Record<SchoolCode, Array<SpellCode>>>
export type Focuses = Partial<Record<SkillCode, Array<string>>>
export type CalculatedCharacterSheet = Readonly<{
	id: string

	name: string
	age: number
	sex: string | null

	social_class: string | null
	upbringing: string | null
	avatar: string | null
	order_alignment: string | null
	chaos_alignment: string | null
	order_ranks: number
	chaos_ranks: number
	corruption: number

	ancestry: CalculatedCombobox
	ancestry_trait: CalculatedCombobox
	archetype: CalculatedCombobox
	profession1: CalculatedCombobox
	profession2: CalculatedCombobox
	profession3: CalculatedCombobox
	talent: CalculatedCombobox

	encumbrance_limit: number
	initiative: number
	movement: number
	maximum_focuses: number
	maximum_languages: number

	damage: ConditionTrack
	peril: ConditionTrack
	attributes: Array<CalculatedAttribute>
	talents: Array<Item & { items: Array<Item> }>

	journal: string
	spent_experience: number
	focuses: Array<Item & { items: Array<Item> }>
	schools: Array<Item & { items: Array<Item> }>

	special_rules: Array<SpecialRule>

	settings: CharacterSheetSettings
	created_by: string
	updated_at: string

	profession_profile: ProfessionProfile
}>
export type ConditionTrack = {
	value: number
	threshold: number
}
export type CalculatedAttribute = {
	name: string
	code: AttributeCode
	base: number
	advances: number
	profession_advances: number
	bonus: number
	mercy: boolean
	ancestry_bonus: number

	mercy_possible: boolean
	skills: Array<CalculatedSkill>
}
export type CalculatedSkill = {
	name: string
	code: SkillCode
	special: boolean
	ranks: number
	profession_ranks: number
	chance: number
	flip: Flip
	has_focuses: boolean
}
export type SpecialRule = {
	name: string
	effect: string
}
export type AncestryTraitTech = Pick<AncestryTrait,
	"name" | "code" | "effect" | "from" | "to">
export type TraitTech = Pick<AncestryTrait, "name" | "code" | "effect">
export type AncestryTech = Pick<Ancestry,
	"name" | "code" | "attribute_bonuses"> & {
	traits: Array<AncestryTraitTech>
}
export type ProfessionTech = Pick<Profession, "name" | "code" | "advances"> & {
	traits: Array<TraitTech>
}
export type SpellTech = Pick<Spell, "name" | "code" | "principle" | "effect">
export type MagicSchoolTech = Pick<MagicSchool, "name" | "code" | "source"> & {
	spells: Array<SpellTech>
}
export type TalentTech = TraitTech
export type CalculatedCombobox = {
	code: string | null | undefined
	options: ReadonlyArray<Item>
	disabled?: boolean
}