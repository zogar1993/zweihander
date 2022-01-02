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
import { Talent } from "@core/domain/Talent"
import React, { useContext, useReducer } from "react"

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
	dispatch: characterSheetReducer
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
	return useReducer(characterSheetReducer, {
		character: PLACEHOLDER_CHARACTER_SHEET
	})
}

export function useCharacterSheetState() {
	return useContext(CharacterSheetContext).state
}

export function useCharacterSheetDispatcher() {
	return useContext(CharacterSheetContext).dispatch
}

function characterSheetReducer(
	state: any,
	action: {
		type: string
		payload: {
			character: SanitizedCharacterSheet
			talents: Array<Talent>
			professions: Array<Profession>
			ancestries: Array<Ancestry>
			schools: Array<MagicSchool>
			archetypes: Array<Archetype>
			orderAlignments: Array<Alignment>
			chaosAlignments: Array<Alignment>
		}
	}
) {
	switch (action.type) {
		case "initialize": {
			const { character, talents, professions, ancestries, archetypes, orderAlignments, chaosAlignments } = action.payload
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
		default:
			return state
	}
}
