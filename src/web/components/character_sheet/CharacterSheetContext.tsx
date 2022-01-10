import { Alignment } from "@core/actions/GetAlignments"
import { Archetype } from "@core/actions/GetArchetypes"
import { Ancestry, AncestryTrait } from "@core/domain/Ancestry"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import {
	calculateCharacterSheet,
	CalculatedCharacterSheet
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
import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import React, { Dispatch, useContext, useReducer } from "react"

const PLACEHOLDER_CHARACTER_SHEET = Object.freeze({
	skills: SKILL_DEFINITIONS as any,
	attributes: ATTRIBUTE_DEFINITIONS as any,
	focuses: {},
	spells: {},
	special_rules: [] as any,
	settings: {}
}) as CalculatedCharacterSheet

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
	ancestryTraits: [],
	tier1Professions: []
}) as CharacterSheetState

export const CharacterSheetContext = React.createContext({
	state: PLACEHOLDER_CHARACTER_SHEET_STATE,
	dispatch: (() => {}) as Dispatch<CharacterSheetAction>
})

type CharacterSheetState = {
	_character: SanitizedCharacterSheet
	character: CalculatedCharacterSheet

	tier1Professions: Array<Profession>
	ancestryTraits: Array<AncestryTrait>

	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
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
) {
	switch (action.type) {
		case ActionType.InitializeCollections: {
			const {
				talents,
				professions,
				ancestries,
				archetypes,
				schools,
				orderAlignments,
				chaosAlignments
			} = action.payload
			return {
				...state,
				talents,
				professions,
				ancestries,
				archetypes,
				schools,
				orderAlignments,
				chaosAlignments
			}
		}
		case ActionType.InitializeCharacterSheet:
			return {
				...state,
				_character: action.payload,
				character: calculateCharacterSheet({
					...state,
					character: action.payload
				}),
				ancestryTraits: calculateAncestryTraits(action.payload.ancestry, state),
				tier1Professions: calculateTier1Professions(
					action.payload.archetype,
					state
				)
			}
		case ActionType.SetName:
			return modifyCharacterSheet("name", state, action.payload)
		case ActionType.SetAvatar:
			return modifyCharacterSheet("avatar", state, action.payload)
		case ActionType.SetAge:
			return modifyCharacterSheet("age", state, action.payload)
		case ActionType.SetSex:
			return modifyCharacterSheet("sex", state, action.payload)
		case ActionType.SetUpbringing:
			return modifyCharacterSheet("upbringing", state, action.payload)
		case ActionType.SetSocialClass:
			return modifyCharacterSheet("social_class", state, action.payload)
		case ActionType.SetAncestry: {
			const newState = modifyCharacterSheet("ancestry", state, action.payload)
			const ancestryTraits = calculateAncestryTraits(action.payload, state)
			return { ...newState, ancestryTraits }
		}
		case ActionType.SetAncestryTrait:
			return modifyCharacterSheet("ancestry_trait", state, action.payload)
		case ActionType.SetArchetype: {
			const newState = modifyCharacterSheet("archetype", state, action.payload)
			const tier1Professions = calculateTier1Professions(action.payload, state)
			return { ...newState, tier1Professions }
		}
		case ActionType.SetProfession1:
			return modifyCharacterSheet("profession1", state, action.payload)
		case ActionType.SetProfession2:
			return modifyCharacterSheet("profession2", state, action.payload)
		case ActionType.SetProfession3:
			return modifyCharacterSheet("profession3", state, action.payload)
		case ActionType.SetChaosAlignment:
			return modifyCharacterSheet("chaos_alignment", state, action.payload)
		case ActionType.SetOrderAlignment:
			return modifyCharacterSheet("order_alignment", state, action.payload)
		case ActionType.SetAttributeBase:
			return modifyCharacterSheet(
				`attributes.${action.payload.attribute}.base`,
				state,
				action.payload.value
			)
		case ActionType.SetAttributeAdvancements:
			return modifyCharacterSheet(
				`attributes.${action.payload.attribute}.advances`,
				state,
				action.payload.value
			)
		case ActionType.SetSkillRanks:
			return modifyCharacterSheet(
				`skills.${action.payload.skill}.ranks`,
				state,
				action.payload.value
			)
		case ActionType.SetOrderRanks:
			return modifyCharacterSheet("order_ranks", state, action.payload)
		case ActionType.SetChaosRanks:
			return modifyCharacterSheet("chaos_ranks", state, action.payload)
		case ActionType.SetCorruption:
			return modifyCharacterSheet("corruption", state, action.payload)
		case ActionType.SetTalent:
			return modifyCharacterSheet(
				`talents.${action.payload.index}`,
				state,
				action.payload.talent
			)
		case ActionType.AddFocus: {
			const { skill, focus } = action.payload
			const skillFocuses = state.character.focuses[skill]
			if (skillFocuses)
				return modifyCharacterSheet(
					`focuses.${skill}.${skillFocuses.length}`,
					state,
					focus
				)
			else return modifyCharacterSheet(`focuses.${skill}`, state, [focus])
		}
		case ActionType.RemoveFocus: {
			//TODO maybe something more specific
			const { skill, focus } = action.payload
			const skillFocuses = state.character.focuses[skill]!
			return modifyCharacterSheet(
				`focuses.${skill}`,
				state,
				skillFocuses.filter(x => x != focus)
			)
		}
		case ActionType.AddSpell: {
			const { spell, school } = action.payload
			const schoolSpells = state.character.spells[school]
			if (schoolSpells)
				return modifyCharacterSheet(
					`spells.${school}.${schoolSpells.length}`,
					state,
					spell
				)
			else return modifyCharacterSheet(`spells.${school}`, state, [spell])
		}
		case ActionType.RemoveSpell: {
			//TODO maybe something more specific
			const { spell, school } = action.payload
			const schoolSpells = state.character.spells[school]!
			return modifyCharacterSheet(
				`spells.${school}`,
				state,
				schoolSpells.filter(x => x != spell)
			)
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
	InitializeCollections,
	InitializeCharacterSheet,
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
	RemoveFocus
}

type PayloadInitialize = {
	talents: Array<Talent>
	professions: Array<Profession>
	ancestries: Array<Ancestry>
	schools: Array<MagicSchool>
	archetypes: Array<Archetype>
	orderAlignments: Array<Alignment>
	chaosAlignments: Array<Alignment>
}

type CharacterSheetAction =
	| { type: ActionType.InitializeCollections; payload: PayloadInitialize }
	| {
			type: ActionType.InitializeCharacterSheet
			payload: SanitizedCharacterSheet
	  }
	| { type: ActionType.SetName; payload: string }
	| { type: ActionType.SetAvatar; payload: string | null }
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
	| {
			type: ActionType.SetTalent
			payload: { index: number; talent: string | null }
	  }
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

function modifyCharacterSheet(
	property: string,
	state: CharacterSheetState,
	value: any
) {
	updateCharacterOfId(state.character.id, [
		{ action: "set_value", property: property, value: value }
	])

	const character = replaceByDotNotation(
		property.split("."),
		state._character,
		value
	)
	return {
		...state,
		_character: character,
		character: calculateCharacterSheet({ ...state, character })
	}
}

type ChangePut = { put: string; value: any }
type ChangeDelete = { delete: string }
type Change = ChangePut | ChangeDelete

function changeFromCharacterSheet(
	changes: Array<Change>,
	state: CharacterSheetState
) {
	fetch(`/api/character/${state.character.id}`, {
		method: "PATCH",
		body: JSON.stringify(changes)
	})

	let character = state._character
	for (const { put: path, value } of changes.filter(isPut))
		character = replaceByDotNotation(path.split("."), character, value)
	for (const { delete: path } of changes.filter(isDelete))
		character = deleteByDotNotation(path.split("."), character)

	return {
		...state,
		_character: character,
		character: calculateCharacterSheet({ ...state, character })
	}
}

function isDelete(change: Change): change is ChangeDelete {
	return change.hasOwnProperty("delete")
}

function isPut(change: Change): change is ChangePut {
	return change.hasOwnProperty("put")
}

function replaceByDotNotation(path: Array<string>, obj: any, value: any): any {
	if (path.length === 0) throw Error("Path was empty")
	if (path.length === 1)
		return Array.isArray(obj)
			? obj.map((x, i) => (i === Number(path[0]) ? value : x))
			: { ...obj, [path[0]]: value }
	else
		return {
			...obj,
			[path[0]]: replaceByDotNotation(path.slice(1), obj[path[0]], value)
		}
}

function deleteByDotNotation(path: Array<string>, obj: any): any {
	if (path.length === 0) throw Error("Path was empty")
	if (path.length === 1) {
		if (Array.isArray(obj)) {
			const array = obj.filter((x, i) => i !== Number(path[0]))
			//Empty arrays are marked as undefined to be removed
			return array.length === 0 ? undefined : array
		} else {
			const copy = { ...obj }
			delete copy[path[0]]
			return copy
		}
	} else {
		const copy = { ...obj }
		const child = deleteByDotNotation(path.slice(1), obj[path[0]])
		if (child === undefined)
			//Children marked as undefined are removed
			delete copy[path[0]]
		else copy[path[0]] = child
		return copy
	}
}

function calculateAncestryTraits(
	ancestry: string | null,
	state: CharacterSheetState
): Array<AncestryTrait> {
	return ancestry === null ? [] : getByCode(ancestry, state.ancestries).traits
}

function calculateTier1Professions(
	archetype: string | null,
	state: CharacterSheetState
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
