import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import {
	CharacterSheetAttributeData,
	CharacterSheetAttributes,
	CharacterSheetData,
	CharacterSheetSkillData,
	CharacterSheetSkills
} from "@core/domain/character_sheet/CharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"

export default function sanitizeCharacterSheet(
	raw: UnsanitizedCharacterSheetData
): CharacterSheetData {
	return {
		id: raw.id!,
		name: raw.name!,
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
		talents: raw.talents || [
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null,
			null
		],
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

function sanitizeAttributes(
	raw: UnsanitizedAttributes
): CharacterSheetAttributes {
	const attributes = {} as CharacterSheetAttributes
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

function sanitizeSkills(raw: UnsanitizedSkills): CharacterSheetSkills {
	const skills = {} as CharacterSheetSkills
	SKILL_DEFINITIONS.forEach(({ code, ...definition }) => {
		const { ranks = 0 } = raw[code] || {}
		skills[code] = { ranks, ...definition }
	})
	return skills
}

export type UnsanitizedCharacterSheetData = Partial<
	Omit<CharacterSheetData, "skills" | "attributes">
> & { skills?: UnsanitizedSkills } & { attributes?: UnsanitizedAttributes }

export type UnsanitizedSkills = Partial<
	Record<SkillCode, CharacterSheetSkillData>
>
export type UnsanitizedAttributes = Partial<
	Record<AttributeCode, CharacterSheetAttributeData>
>
