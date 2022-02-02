import { UpdateAction } from "@api/characters/[id]/update"
import { Alignment } from "@core/actions/GetAlignments"
import { Archetype } from "@core/actions/GetArchetypes"
import { Ancestry, AncestryTrait } from "@core/domain/Ancestry"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import {
	calculateCharacterSheet,
	CalculatedCharacterSheet,
	MagicSchoolTech,
	SpellTech,
	TalentTech
} from "@core/domain/character_sheet/CharacterSheet"
import sanitizeCharacterSheet, {
	SanitizedCharacterSheet
} from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Talent } from "@core/domain/Talent"
import applyActionsToCharacter from "@core/utils/ApplyActionsToCharacter"
import { getDeepPropertyValue } from "@core/utils/GetDeepPropertyValue"
import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import { ConfirmationModalProps } from "@web/components/modal/ConfirmationModal"
import { blocksToObjects, UpdateActionBlock } from "@web/misc/UpdateActionBlock"
import React, { Dispatch, useContext, useReducer } from "react"

const PLACEHOLDER_CHARACTER_SHEET = Object.freeze({
	skills: SKILL_DEFINITIONS as any,
	attributes: ATTRIBUTE_DEFINITIONS as any,
	focuses: [],
	schools: [],
	talents: [],
	special_rules: [] as any,
	settings: {}
}) as unknown as CalculatedCharacterSheet

const PLACEHOLDER_CHARACTER_SHEET_STATE = Object.freeze({
	_character: sanitizeCharacterSheet({}),
	character: PLACEHOLDER_CHARACTER_SHEET,

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

	undoActions: []
}) as CharacterSheetState

export const CharacterSheetContext = React.createContext({
	state: PLACEHOLDER_CHARACTER_SHEET_STATE,
	dispatch: (() => {}) as Dispatch<CharacterSheetAction>
})

type CharacterSheetState = {
	_character: SanitizedCharacterSheet
	character: CalculatedCharacterSheet

	comboboxes: {
		schools: { value: string | null; options: Array<MagicSchoolTech> }
		spells: { options: Array<SpellTech> }
		talents: { options: Array<TalentTech> }
	}
	tier1Professions: Array<Profession>
	ancestryTraits: Array<AncestryTrait>
	modals: {
		confirmation: Confirmation | null
	}

	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>

	undoActions: Array<Array<UpdateAction>>
}

export function useCharacterSheetReducer(props: PayloadInitialize) {
	if (!props.character)
		return useReducer(characterSheetReducer, PLACEHOLDER_CHARACTER_SHEET_STATE)
	const state = {
		...props,
		_character: props.character,
		character: calculateCharacterSheet(props),

		ancestryTraits: calculateAncestryTraits(props.character.ancestry, props),
		tier1Professions: calculateTier1Professions(
			props.character.archetype,
			props
		),
		comboboxes: {
			schools: { value: null, options: props.schools },
			spells: { options: [] },
			talents: { options: getTalentOptions(props.character, props.talents) }
		},
		modals: {
			confirmation: null
		},

		undoActions: []
	}
	return useReducer(characterSheetReducer, state)
}

export function useCharacterSheetState() {
	return useContext(CharacterSheetContext).state
}

export function useCharacterSheetDispatcher() {
	return useContext(CharacterSheetContext).dispatch
}

function characterSheetReducer(
	state: CharacterSheetState,
	action: CharacterSheetAction
) {
	const forwardChange = (
		...blocks: Array<UpdateActionBlock>
	): CharacterSheetState => {
		const changes = blocksToObjects(blocks)
		const undoActions = generateUndoActions(changes, state._character)
		const result = changeFromCharacterSheet(changes, state)
		return { ...result, undoActions: [...result.undoActions, undoActions] }
	}

	const undoLastChange = (): CharacterSheetState => {
		const undoActions = state.undoActions
		if (undoActions.length === 0) return state
		const action = undoActions[undoActions.length - 1]
		const result = changeFromCharacterSheet(action, state)
		return { ...result, undoActions: undoActions.slice(0, -1) }
	}

	switch (action.type) {
		case ActionType.SetName:
			return forwardChange(["set_value", "name", action.payload])
		case ActionType.SetAvatar: {
			const { avatar, thumbnail } = action.payload
			return forwardChange(
				["set_value", "avatar", avatar],
				["set_value", "thumbnail", thumbnail]
			)
		}
		case ActionType.SetAge:
			return forwardChange(["set_value", "age", action.payload])
		case ActionType.SetSex:
			return forwardChange(["set_value", "sex", action.payload])
		case ActionType.SetUpbringing:
			return forwardChange(["set_value", "upbringing", action.payload])
		case ActionType.SetSocialClass:
			return forwardChange(["set_value", "social_class", action.payload])
		case ActionType.SetAncestry: {
			const newState = forwardChange(
				["set_value", "ancestry_trait", null],
				["set_value", "ancestry", action.payload]
			)
			const ancestryTraits = calculateAncestryTraits(action.payload, state)
			return { ...newState, ancestryTraits }
		}
		case ActionType.SetAncestryTrait:
			return forwardChange(["set_value", "ancestry_trait", action.payload])
		case ActionType.SetArchetype: {
			const newState = forwardChange(["set_value", "archetype", action.payload])
			const tier1Professions = calculateTier1Professions(action.payload, state)
			return { ...newState, tier1Professions }
		}
		case ActionType.SetProfession1: {
			if (state._character.archetype === null) {
				const isProfessionsArchetype = (archetype: Archetype) =>
					archetype.professions["Main Gauche"].some(
						x => x.profession === action.payload
					)
				return forwardChange(
					[
						"set_value",
						"archetype",
						state.archetypes.find(isProfessionsArchetype)!.code
					],
					["set_value", "profession1", action.payload]
				)
			} else return forwardChange(["set_value", "profession1", action.payload])
		}
		case ActionType.SetProfession2:
			return forwardChange(["set_value", "profession2", action.payload])
		case ActionType.SetProfession3:
			return forwardChange(["set_value", "profession3", action.payload])
		case ActionType.SetChaosAlignment:
			return forwardChange(["set_value", "chaos_alignment", action.payload])
		case ActionType.SetOrderAlignment:
			return forwardChange(["set_value", "order_alignment", action.payload])
		case ActionType.SetAttributeBase: {
			const { attribute, value } = action.payload
			return forwardChange(["set_value", `attributes.${attribute}.base`, value])
		}
		case ActionType.SetAttributeAdvancements: {
			const { attribute, value } = action.payload
			return forwardChange([
				"set_value",
				`attributes.${attribute}.advances`,
				value
			])
		}
		case ActionType.SetSkillRanks: {
			const { skill, value } = action.payload
			return forwardChange(["set_value", `skills.${skill}.ranks`, value])
		}
		case ActionType.SetOrderRanks:
			return forwardChange(["set_value", "order_ranks", action.payload])
		case ActionType.SetChaosRanks:
			return forwardChange(["set_value", "chaos_ranks", action.payload])
		case ActionType.SetCorruption:
			return forwardChange(["set_value", "corruption", action.payload])
		case ActionType.AddFocus: {
			const { skill, focus } = action.payload
			const list = state._character.focuses[skill]!
			if (list)
				return forwardChange(["add_to_array", `focuses.${skill}`, focus])
			else return forwardChange(["set_value", `focuses.${skill}`, [focus]])
		}
		case ActionType.RemoveFocus: {
			const { skill, focus } = action.payload
			const list = state._character.focuses[skill]!
			if (list.length === 1)
				return forwardChange(["delete_property", `focuses.${skill}`])
			else
				return forwardChange(["remove_from_array", `focuses.${skill}`, focus])
		}
		case ActionType.AddSpell: {
			const { spell, school } = action.payload
			const list = state._character.spells[school]
			const result = list
				? forwardChange(["add_to_array", `spells.${school}`, spell])
				: forwardChange(["set_value", `spells.${school}`, [spell]])
			return recalculateSpellOptions(result)
		}
		case ActionType.RemoveSpell: {
			const { spell, school } = action.payload
			const list = state._character.spells[school]!
			const result =
				list.length === 1
					? forwardChange(["delete_property", `spells.${school}`])
					: forwardChange(["remove_from_array", `spells.${school}`, spell])
			return recalculateSpellOptions(result)
		}
		case ActionType.AddTalent: {
			const result = forwardChange(["add_to_array", `talents`, action.payload])
			return recalculateTalentOptions(result)
		}
		case ActionType.RemoveTalent: {
			const result = forwardChange([
				"remove_from_array",
				`talents`,
				action.payload
			])
			return recalculateTalentOptions(result)
		}
		case ActionType.UndoLastAction:
			return undoLastChange()
		case ActionType.SetJournal:
			return forwardChange(["set_value", "journal", action.payload])
		case ActionType.SetSettings:
			const entries = Object.entries(action.payload)
			return forwardChange(
				...entries.map(
					([key, value]) =>
						["set_value", `settings.${key}`, value] as UpdateActionBlock
				)
			)

		case ActionType.SetComboboxValue: {
			const { value, combobox } = action.payload
			const comboboxes = state.comboboxes

			switch (combobox) {
				case "schools":
					return {
						...state,
						comboboxes: {
							...comboboxes,
							spells: {
								options: getSpellOptions(state._character, state.schools, value)
							},
							schools: { ...comboboxes[combobox], value: value }
						}
					}
				default:
					throw Error(`'${combobox}' is not a valid combobox value`)
			}
		}
		case ActionType.SetConfirmationModal:
			return {
				...state,
				modals: { ...state.modals, confirmation: action.payload }
			}
		default:
			return state
	}
}

export default function addPartialRecordItemToArray<Item, Key extends string>(
	key: Key,
	item: Item,
	record: Partial<Record<Key, Array<Item>>>
) {
	const items = record[key]
	if (items) {
		if (!items.includes(item)) items.push(item)
	} else record[key] = [item]
}

export enum ActionType {
	SetName,
	SetAvatar,
	SetAge,
	SetSex,
	SetUpbringing,
	SetSocialClass,
	SetAncestry,
	SetAncestryTrait,
	SetArchetype,
	SetProfession1,
	SetProfession2,
	SetProfession3,
	SetChaosAlignment,
	SetOrderAlignment,
	SetAttributeAdvancements,
	SetAttributeBase,
	SetSkillRanks,
	SetCorruption,
	SetChaosRanks,
	SetOrderRanks,
	SetTalent,
	AddSpell,
	RemoveSpell,
	AddFocus,
	RemoveFocus,
	AddTalent,
	RemoveTalent,
	UndoLastAction,
	SetJournal,
	SetSettings,
	SetComboboxValue,
	SetConfirmationModal
}

type PayloadInitialize = {
	character: SanitizedCharacterSheet

	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
}

type CharacterSheetAction =
	| { type: ActionType.SetName; payload: string }
	| {
			type: ActionType.SetAvatar
			payload: { avatar: string; thumbnail: string }
	  }
	| { type: ActionType.SetAge; payload: number }
	| { type: ActionType.SetSex; payload: string | null }
	| { type: ActionType.SetUpbringing; payload: string | null }
	| { type: ActionType.SetSocialClass; payload: string | null }
	| { type: ActionType.SetArchetype; payload: string | null }
	| { type: ActionType.SetProfession1; payload: string | null }
	| { type: ActionType.SetProfession2; payload: string | null }
	| { type: ActionType.SetProfession3; payload: string | null }
	| { type: ActionType.SetAncestry; payload: string | null }
	| { type: ActionType.SetAncestryTrait; payload: string | null }
	| { type: ActionType.SetChaosAlignment; payload: string | null }
	| { type: ActionType.SetOrderAlignment; payload: string | null }
	| {
			type: ActionType.SetSkillRanks
			payload: { skill: SkillCode; value: number }
	  }
	| {
			type: ActionType.SetAttributeAdvancements
			payload: { attribute: AttributeCode; value: number }
	  }
	| {
			type: ActionType.SetAttributeBase
			payload: { attribute: AttributeCode; value: number }
	  }
	| { type: ActionType.SetCorruption; payload: number }
	| { type: ActionType.SetOrderRanks; payload: number }
	| { type: ActionType.SetChaosRanks; payload: number }
	| { type: ActionType.AddSpell; payload: { spell: string; school: string } }
	| {
			type: ActionType.RemoveSpell
			payload: { spell: string; school: string }
	  }
	| { type: ActionType.AddFocus; payload: { focus: string; skill: SkillCode } }
	| {
			type: ActionType.RemoveFocus
			payload: { focus: string; skill: SkillCode }
	  }
	| { type: ActionType.AddTalent; payload: string }
	| { type: ActionType.RemoveTalent; payload: string }
	| { type: ActionType.UndoLastAction }
	| { type: ActionType.SetJournal; payload: string }
	| {
			type: ActionType.SetSettings
			payload: { skill_order?: string; visibility?: string }
	  }
	| {
			type: ActionType.SetComboboxValue
			payload: { combobox: "schools"; value: string | null }
	  }
	| { type: ActionType.SetConfirmationModal; payload: Confirmation | null }

function changeFromCharacterSheet(
	changes: Array<UpdateAction>,
	state: CharacterSheetState
) {
	updateCharacterOfId(state.character.id, changes)

	const character = applyActionsToCharacter(state._character, changes)

	return {
		...state,
		_character: character,
		character: calculateCharacterSheet({ ...state, character })
	}
}

function generateUndoActions(
	changes: Array<UpdateAction>,
	character: SanitizedCharacterSheet
): Array<UpdateAction> {
	return changes.map(({ action, property, value }) => {
		switch (action) {
			case "add_to_array":
				return { action: "remove_from_array", property, value }
			case "remove_from_array":
				return { action: "add_to_array", property, value }
			case "set_value": {
				const old = getDeepPropertyValue(property.split("."), character)
				return old === undefined
					? { action: "delete_property", property }
					: { action: "set_value", property, value: old }
			}
			case "delete_property":
				const old = getDeepPropertyValue(property.split("."), character)
				return { action: "set_value", property, value: old }
		}
	})
}

function calculateAncestryTraits(
	ancestry: string | null,
	state: Pick<CharacterSheetState, "ancestries">
): Array<AncestryTrait> {
	return ancestry === null ? [] : getByCode(ancestry, state.ancestries).traits
}

function calculateTier1Professions(
	archetype: string | null,
	state: Pick<CharacterSheetState, "professions" | "archetypes">
): Array<Profession> {
	const { professions, archetypes } = state
	if (archetype === null) {
		return professions.filter(profession =>
			archetypes.some(archetype =>
				archetype.professions["Main Gauche"].some(
					prof => prof.profession === profession.code
				)
			)
		)
	}

	const names = getByCode(archetype, archetypes).professions["Main Gauche"]
	return names.map(x => ({
		...x,
		...getByCode(x.profession, professions)
	}))
}

function recalculateTalentOptions(
	state: CharacterSheetState
): CharacterSheetState {
	return {
		...state,
		comboboxes: {
			...state.comboboxes,
			talents: {
				options: getTalentOptions(state._character, state.talents)
			}
		}
	}
}

function recalculateSpellOptions(
	state: CharacterSheetState
): CharacterSheetState {
	return {
		...state,
		comboboxes: {
			...state.comboboxes,
			spells: {
				options: getSpellOptions(
					state._character,
					state.schools,
					state.comboboxes.schools.value
				)
			}
		}
	}
}

function getTalentOptions(
	character: SanitizedCharacterSheet,
	talents: Array<Talent>
) {
	return talents.filter(x => !character.talents.includes(x.code))
}

function getSpellOptions(
	character: SanitizedCharacterSheet,
	schools: Array<MagicSchoolTech>,
	school: string | null
) {
	if (!school) return []
	const options = getByCode(school, schools).spells
	const spells = character.spells[school]!
	if (!spells) return options
	return options.filter(x => !spells.includes(x.code))
}

export type Confirmation = Omit<ConfirmationModalProps, "active">
