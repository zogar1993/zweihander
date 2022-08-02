import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { CharacterTier } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { CalculatedCharacterSheet } from "@core/domain/character_sheet/CharacterSheet"
import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { CharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"

const LOADING_TIER_ITEM = { code: "", checked: undefined }

const LOADING_TIER = {
	profession: { name: "", code: undefined },
	attributes: Array.from(Array(7), () => LOADING_TIER_ITEM),
	skills: Array.from(Array(10), () => LOADING_TIER_ITEM),
	talents: Array.from(Array(3), () => LOADING_TIER_ITEM)
} as unknown as CharacterTier

const LOADING_CALCULATED_CHARACTER_SHEET = {
	attributes: ATTRIBUTE_DEFINITIONS.map(attribute => ({
		...attribute,
		skills: SKILL_DEFINITIONS.filter(
			skill => attribute.code === skill.attribute
		)
	})) as any,
	focuses: [],
	schools: [],
	talents: [],
	special_rules: [] as any,
	settings: {},
	peril: {},
	damage: {},

	profession_profile: {
		profession1: LOADING_TIER,
		profession2: LOADING_TIER,
		profession3: LOADING_TIER,
		spending_outside_profession: []
	}
} as unknown as CalculatedCharacterSheet

export const PLACEHOLDER_CHARACTER_SHEET_STATE = Object.freeze({
	_character: sanitizeCharacterSheet({}),
	character: LOADING_CALCULATED_CHARACTER_SHEET,

	professions: [],
	talents: [],
	schools: [],
	ancestries: [],
	archetypes: [],
	chaosAlignments: [],
	orderAlignments: [],

	comboboxes: {
		schools: { value: null, options: [] },
		spells: { options: [] },
		talents: { options: [] }
	},
	ancestryTraits: [],
	tier1Professions: [],
	modals: {
		confirmation: null
	},

	_undoQueue: [],
	_pendingUpdates: [],
	nextUpdate: null,
	updatedAt: ""
}) as CharacterSheetState