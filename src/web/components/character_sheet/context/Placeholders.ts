import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { TierViewModel } from "@core/domain/character_sheet/calculations/CalculateTiers"
import { CalculatedCharacterSheet } from "@core/domain/character_sheet/CharacterSheet"
import sanitizeCharacterSheet from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { CharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"

const LOADING_CHECKBOX = { code: "", checked: undefined }
const LOADING_CHECK_COMBOBOX = { name: "", code: undefined }
const LOADING_TIER = {
	profession: LOADING_CHECK_COMBOBOX,
	attributes: Array.from(Array(7), () => LOADING_CHECKBOX),
	skills: Array.from(Array(10), () => LOADING_CHECKBOX),
	talents: Array.from(Array(3), () => LOADING_CHECKBOX),
	wildcard_talents: []
} as unknown as TierViewModel

const LOADING_COMBOBOX = { code: undefined, options: [] }

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

	ancestry: LOADING_COMBOBOX,
	ancestry_trait: LOADING_COMBOBOX,
	archetype: LOADING_COMBOBOX,
	profession1: LOADING_COMBOBOX,
	profession2: LOADING_COMBOBOX,
	profession3: LOADING_COMBOBOX,
	talent: LOADING_COMBOBOX,

	profession_profile: {
		professions: [LOADING_TIER, LOADING_TIER, LOADING_TIER],
		unique_advances: LOADING_TIER
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
	modals: {
		confirmation: null
	},

	errors: [],
	_undoQueue: [],
	_pendingUpdates: [],
	nextUpdate: null,
	updatedAt: ""
}) as CharacterSheetState