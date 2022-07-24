import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { CalculatedCharacterSheet } from "@core/domain/character_sheet/CharacterSheet"
import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { CharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"

const PLACEHOLDER_CALCULATED_CHARACTER_SHEET = Object.freeze({
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
		profession1: null,
		profession2: null,
		profession3: null,
		spending_outside_profession: [],
		missing_for_profession1: [],
		missing_for_profession2: []
	}
}) as unknown as CalculatedCharacterSheet

export const PLACEHOLDER_CHARACTER_SHEET_STATE = Object.freeze({
	_character: sanitizeCharacterSheet({}),
	character: PLACEHOLDER_CALCULATED_CHARACTER_SHEET,

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
