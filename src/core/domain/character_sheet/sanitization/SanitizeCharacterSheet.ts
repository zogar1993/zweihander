import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { ShallowCharacterSheet } from "@core/domain/character_sheet/sanitization/ShallowCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"

const DEFAULT_SETTINGS = {
	skill_order: "alphabetic",
	visibility: "public"
} as const

export default function sanitizeCharacterSheet(
	raw: UnsanitizedCharacterSheetData
): SanitizedCharacterSheet {
	return {
		id: raw.id!,
		created_by: raw.created_by!,
		name: raw.name || "",
		age: raw.age || 0,
		sex: raw.sex || null,
		social_class: raw.social_class || null,
		upbringing: raw.upbringing || null,
		damage: raw.damage || 0,
		peril: raw.peril || 0,
		avatar: raw.avatar || null,
		order_alignment: raw.order_alignment || null,
		chaos_alignment: raw.chaos_alignment || null,
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
		settings: raw.settings
			? { ...DEFAULT_SETTINGS, ...raw.settings }
			: DEFAULT_SETTINGS,
		created_at: raw.created_at,
		updated_at: raw.updated_at!
	}
}

function sanitizeAttributes(raw: Partial<AttributesData>): AttributesData {
	const attributes = {} as AttributesData
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

function sanitizeSkills(raw: Partial<SkillsData>): SkillsData {
	const skills = {} as SkillsData
	SKILL_DEFINITIONS.forEach(({ code, ...definition }) => {
		const { ranks = 0 } = raw[code] || {}
		skills[code] = { ranks, ...definition }
	})
	return skills
}

export type UnsanitizedCharacterSheetData = Partial<ShallowCharacterSheet> & {
	skills?: Partial<SkillsData>
	attributes?: Partial<AttributesData>
	talents?: UnsanitizedTalents
}

type UnsanitizedTalents = Array<string | null> //TODO should go on a talents cleanup

type AttributeData = { base: number; advances: number }
type SkillData = { ranks: number }
type AttributesData = Record<AttributeCode, AttributeData>
type SkillsData = Record<SkillCode, SkillData>

export type SanitizedCharacterSheet = ShallowCharacterSheet & {
	skills: SkillsData
	attributes: AttributesData
	talents: Array<string>
}
