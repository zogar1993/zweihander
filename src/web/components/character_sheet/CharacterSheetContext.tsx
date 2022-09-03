import { UpdateAction } from "@api/characters/[id]/update"
import { Archetype } from "@core/actions/GetArchetypes"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { calculateCharacterSheet } from "@core/domain/character_sheet/calculations/CalculateCharacterSheet"
import {
	AncestryTech,
	CalculatedCharacterSheet,
	MagicSchoolTech,
	ProfessionTech,
	SpellTech,
	TraitTech
} from "@core/domain/character_sheet/CharacterSheet"
import { SanitizedCharacterSheet } from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { getByCode } from "@core/domain/general/GetByCode"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Alignment } from "@core/domain/types/Alignment"
import applyActionsToCharacter from "@core/utils/ApplyActionsToCharacter"
import { getDeepPropertyValue } from "@core/utils/GetDeepPropertyValue"
import { PLACEHOLDER_CHARACTER_SHEET_STATE } from "@web/components/character_sheet/context/Placeholders"
import useInitializeCharacterSheetReducer
	from "@web/components/character_sheet/hooks/UseInitializeCharacterSheetReducer"
import { ConfirmationModalProps } from "@web/components/modal/ConfirmationModal"
import { blocksToObjects, UpdateActionBlock } from "@web/misc/UpdateActionBlock"
import React, { Dispatch, ReactNode, useContext, useReducer } from "react"

const CharacterSheetContext = React.createContext({
	state: PLACEHOLDER_CHARACTER_SHEET_STATE,
	dispatch: (() => {
	}) as Dispatch<CharacterSheetAction>
})

export function CharacterSheetContextProvider({
																								children,
																								dependencies
																							}: {
	children: ReactNode
	dependencies: Partial<CharacterSheetProps>
}) {
	const [state, dispatch] = useCharacterSheetReducer()
	useInitializeCharacterSheetReducer(dependencies, dispatch)

	return (
		<CharacterSheetContext.Provider value={{ state, dispatch }}>
			{children}
		</CharacterSheetContext.Provider>
	)
}

export type CharacterSheetState = {
	_character: SanitizedCharacterSheet
	character: CalculatedCharacterSheet

	comboboxes: {
		schools: { value: string | null; options: ReadonlyArray<MagicSchoolTech> }
		spells: { options: ReadonlyArray<SpellTech> }
	}
	modals: {
		confirmation: Confirmation | null
	}

	talents: ReadonlyArray<TraitTech>
	professions: ReadonlyArray<ProfessionTech>
	ancestries: ReadonlyArray<AncestryTech>
	schools: ReadonlyArray<MagicSchoolTech>
	archetypes: ReadonlyArray<Archetype>
	orderAlignments: ReadonlyArray<Alignment>
	chaosAlignments: ReadonlyArray<Alignment>

	_undoQueue: ReadonlyArray<ReadonlyArray<UpdateAction>>
	_pendingUpdates: ReadonlyArray<ReadonlyArray<UpdateAction>>
	nextUpdate: ReadonlyArray<UpdateAction> | null
	updatedAt: string
}

export function useCharacterSheetReducer() {
	return useReducer(characterSheetReducer, PLACEHOLDER_CHARACTER_SHEET_STATE)
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
): CharacterSheetState {

	switch (action.type) {
		case ActionType.Initialize: {
			const props = action.payload
			const { character } = calculateCharacterSheet(props)
			return {
				...props,
				_character: props.character,
				character: character,
				comboboxes: {
					schools: { value: null, options: props.schools },
					spells: { options: [] }
				},
				modals: {
					confirmation: null
				},
				_undoQueue: [],
				_pendingUpdates: [],
				nextUpdate: null,
				updatedAt: props.character.updated_at
			}
		}
		case ActionType.UpdateCharacter: {
			const undoActions = generateUndoActions(action.payload, state._character)
			const result = changeFromCharacterSheet(action.payload, state)
			return { ...result, _undoQueue: [...result._undoQueue, undoActions] }
		}

		case ActionType.UndoLastAction: {
			const undoActions = state._undoQueue
			if (undoActions.length === 0) return state
			const action = undoActions[undoActions.length - 1]
			const result = changeFromCharacterSheet(action, state)
			return { ...result, _undoQueue: undoActions.slice(0, -1) }
		}

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
		case ActionType.CompleteAction:
			const { updatedAt, completed } = action.payload
			const [previous = null, ...remaining] = state._pendingUpdates

			if (completed !== previous)
				throw Error(
					`Previous action should be ${JSON.stringify(
						completed
					)} but is ${JSON.stringify(previous)}`
				)

			return {
				...state,
				nextUpdate: remaining.length ? remaining[0] : null,
				_pendingUpdates: remaining,
				updatedAt
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
	Initialize,
	UndoLastAction,
	SetComboboxValue,
	SetConfirmationModal,
	CompleteAction,
	UpdateCharacter
}

export type CharacterSheetProps = {
	character: SanitizedCharacterSheet

	talents: ReadonlyArray<TraitTech>
	professions: ReadonlyArray<ProfessionTech>
	ancestries: ReadonlyArray<AncestryTech>
	schools: ReadonlyArray<MagicSchoolTech>
	archetypes: ReadonlyArray<Archetype>
	orderAlignments: ReadonlyArray<Alignment>
	chaosAlignments: ReadonlyArray<Alignment>
}

export type CharacterSheetAction =
	| { type: ActionType.Initialize; payload: CharacterSheetProps }
	| { type: ActionType.UndoLastAction }
	| {
	type: ActionType.SetComboboxValue
	payload: { combobox: "schools"; value: string | null }
}
	| { type: ActionType.SetConfirmationModal; payload: Confirmation | null }
	| {
	type: ActionType.CompleteAction
	payload: { updatedAt: string; completed: ReadonlyArray<UpdateAction> }
}
	| {
	type: ActionType.UpdateCharacter
	payload: ReadonlyArray<UpdateAction>
}

function changeFromCharacterSheet(
	changes: ReadonlyArray<UpdateAction>,
	state: CharacterSheetState
): CharacterSheetState {
	const _character = applyActionsToCharacter(state._character, changes)
	const updates = [...state._pendingUpdates, changes]
	const { character } = calculateCharacterSheet({ ...state, character: _character })
	return {
		...state,
		_character: _character,
		character: character,
		_pendingUpdates: updates,
		nextUpdate: updates[0]
	}
}

function generateUndoActions(
	changes: ReadonlyArray<UpdateAction>,
	character: SanitizedCharacterSheet
): ReadonlyArray<UpdateAction> {
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

function getSpellOptions(
	character: SanitizedCharacterSheet,
	schools: ReadonlyArray<MagicSchoolTech>,
	school: string | null
): ReadonlyArray<SpellTech> {
	if (!school) return []
	const options = getByCode(school, schools).spells
	const spells = character.spells[school]!
	if (!spells) return options
	return options.filter(x => !spells.includes(x.code))
}

export type Confirmation = Omit<ConfirmationModalProps, "active">
