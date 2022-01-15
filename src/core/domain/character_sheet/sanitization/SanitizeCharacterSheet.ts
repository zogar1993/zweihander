import {
	ATTRIBUTE_DEFINITIONS,
	AttributeDefinition
} from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { ShallowCharacterSheet } from "@core/domain/character_sheet/sanitization/ShallowCharacterSheet"
import {
	SKILL_DEFINITIONS,
	SkillDefinition
} from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"

export default function sanitizeCharacterSheet(
	raw: UnsanitizedCharacterSheetData
): SanitizedCharacterSheet {
	return {
		id: raw.id!,
		name: raw.name || "",
		age: raw.age || 30,
		sex: raw.sex || null,
		social_class: raw.social_class || null,
		upbringing: raw.upbringing || null,
		damage: raw.damage || 0,
		peril: raw.peril || 0,
		avatar: raw.avatar || null,
		order_alignment: raw.order_alignment || "",
		chaos_alignment: raw.chaos_alignment || "",
		order_ranks: raw.order_ranks || 0,
		chaos_ranks: raw.chaos_ranks || 0,
		corruption: raw.corruption || 0,
		journal: raw.journal || "",
		talents: (raw.talents?.filter(x => typeof x === "string") ||
			[]) as Array<string>,
		ancestry_trait: raw.ancestry_trait || null,
		focuses: raw.focuses || {},
		spells: raw.spells || {},
		attributes: sanitizeAttributes(raw.attributes || {}),
		skills: sanitizeSkills(raw.skills || {}),
		ancestry: raw.ancestry || null,
		archetype: raw.archetype || null,
		profession1: raw.profession1 || null,
		profession2: raw.profession2 || null,
		profession3: raw.profession3 || null,
		mercy: raw.mercy || null,
		settings: raw.settings || { skill_order: "alphabetic" }
	}
}

function sanitizeAttributes(raw: UnsanitizedAttributes): SanitizedAttributes {
	const attributes = {} as SanitizedAttributes
	ATTRIBUTE_DEFINITIONS.forEach(({ code, ...definition }) => {
		const attribute = raw[code]
		const advances = attribute?.advances || 0
		const base = attribute?.base || 42
		attributes[code] = {
			base: base < 28 || 55 < base ? 42 : base,
			advances: advances,
			...definition
		}
	})
	return attributes
}

function sanitizeSkills(raw: UnsanitizedSkills): SanitizedSkills {
	const skills = {} as SanitizedSkills
	SKILL_DEFINITIONS.forEach(({ code, ...definition }) => {
		const { ranks = 0 } = raw[code] || {}
		skills[code] = { ranks, ...definition }
	})
	return skills
}

export type UnsanitizedCharacterSheetData = Partial<ShallowCharacterSheet> & {
	skills?: UnsanitizedSkills
	attributes?: UnsanitizedAttributes
	talents?: UnsanitizedTalents
}

type RawSkill = { ranks: number }
type RawAttribute = { base: number; advances: number }

type UnsanitizedSkills = Partial<Record<SkillCode, RawSkill>>
type UnsanitizedAttributes = Partial<Record<AttributeCode, RawAttribute>>
type UnsanitizedTalents = Array<string | null>

export type SanitizedAttribute = RawAttribute &
	Omit<AttributeDefinition, "code">
export type SanitizedAttributes = Record<AttributeCode, SanitizedAttribute>
export type SanitizedSkill = RawSkill & Omit<SkillDefinition, "code">
export type SanitizedSkills = Record<SkillCode, SanitizedSkill>

export type SanitizedCharacterSheet = ShallowCharacterSheet & {
	skills: SanitizedSkills
	attributes: SanitizedAttributes
	talents: Array<string>
}
