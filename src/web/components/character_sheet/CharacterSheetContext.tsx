import { Alignment } from "@core/actions/GetAlignments"
import { Archetype } from "@core/actions/GetArchetypes"
import { Ancestry } from "@core/domain/Ancestry"
import { ATTRIBUTE_DEFINITIONS } from "@core/domain/attribute/ATTRIBUTE_DEFINITIONS"
import {
	calculateCharacterSheet,
	CalculatedCharacterSheet
} from "@core/domain/character_sheet/CharacterSheet"
import sanitizeCharacterSheet, {
	SanitizedCharacterSheet
} from "@core/domain/character_sheet/sanitization/SanitizeCharacterSheet"
import { MagicSchool } from "@core/domain/MagicSchool"
import { Profession } from "@core/domain/Profession"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { Talent } from "@core/domain/Talent"
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
	orderAlignments: []
}) as CharacterSheetState

export const CharacterSheetContext = React.createContext({
	state: PLACEHOLDER_CHARACTER_SHEET_STATE,
	dispatch: (() => {}) as Dispatch<CharacterSheetAction>
})

type CharacterSheetState = {
	_character: SanitizedCharacterSheet
	character: CalculatedCharacterSheet
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
		case ActionType.Initialize: {
			const {
				character,
				talents,
				professions,
				ancestries,
				archetypes,
				orderAlignments,
				chaosAlignments
			} = action.payload
			return {
				...state,
				rawCharacter: character,
				character: calculateCharacterSheet(action.payload),
				talents,
				professions,
				ancestries,
				archetypes,
				orderAlignments,
				chaosAlignments
			}
		}
		case ActionType.SetName:
			return modifyCharacterSheet("name", state, action)
		case ActionType.SetAvatar:
			return modifyCharacterSheet("avatar", state, action)
		case ActionType.SetAge:
			return modifyCharacterSheet("age", state, action)
		case ActionType.SetSex:
			return modifyCharacterSheet("sex", state, action)
		case ActionType.SetUpbringing:
			return modifyCharacterSheet("upbringing", state, action)
		case ActionType.SetSocialClass:
			return modifyCharacterSheet("social_class", state, action)
		case ActionType.SetAncestry:
			return modifyCharacterSheet("ancestry", state, action)
		case ActionType.SetAncestryTrait:
			return modifyCharacterSheet("ancestry_trait", state, action)
		case ActionType.SetArchetype:
			return modifyCharacterSheet("archetype", state, action)
		case ActionType.SetProfession1:
			return modifyCharacterSheet("profession1", state, action)
		case ActionType.SetProfession2:
			return modifyCharacterSheet("profession2", state, action)
		case ActionType.SetProfession3:
			return modifyCharacterSheet("profession3", state, action)
		case ActionType.SetChaosAlignment:
			return modifyCharacterSheet("chaos_alignment", state, action)
		case ActionType.SetOrderAlignment:
			return modifyCharacterSheet("order_alignment", state, action)
		default:
			return state
	}
}

export enum ActionType {
	Initialize,
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
	SetSkillRanks
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
	| { type: ActionType.Initialize; payload: PayloadInitialize }
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
	| { type: ActionType.SetSkillRanks; payload: {skill: SkillCode, value: number} }

function modifyCharacterSheet(
	property: string,
	state: CharacterSheetState,
	action: CharacterSheetAction
) {
	fetch(
		`/api/character/${state.character.id}`,
		{ method: "PATCH", body: JSON.stringify({[property]: action.payload})  }
	)
	return {
		...state,
		character: { ...state.character, [property]: action.payload }
	}
}
