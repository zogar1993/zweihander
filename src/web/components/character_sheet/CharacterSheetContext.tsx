import { UpdateAction } from "@api/character/[id]/update"
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
		)
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
	const change = (...changes: Array<UpdateActionBlock>) =>
		changeFromCharacterSheet(blocksToObjects(changes), state)
	switch (action.type) {
		case ActionType.SetName:
			return change(["set_value", "name", action.payload])
		case ActionType.SetAvatar: {
			const { avatar, thumbnail } = action.payload
			return change(
				["set_value", "avatar", avatar],
				["set_value", "thumbnail", thumbnail]
			)
		}
		case ActionType.SetAge:
			return change(["set_value", "age", action.payload])
		case ActionType.SetSex:
			return change(["set_value", "sex", action.payload])
		case ActionType.SetUpbringing:
			return change(["set_value", "upbringing", action.payload])
		case ActionType.SetSocialClass:
			return change(["set_value", "social_class", action.payload])
		case ActionType.SetAncestry: {
			const newState = change(["set_value", "ancestry", action.payload])
			const ancestryTraits = calculateAncestryTraits(action.payload, state)
			return { ...newState, ancestryTraits }
		}
		case ActionType.SetAncestryTrait:
			return change(["set_value", "ancestry_trait", action.payload])
		case ActionType.SetArchetype: {
			const newState = change(["set_value", "archetype", action.payload])
			const tier1Professions = calculateTier1Professions(action.payload, state)
			return { ...newState, tier1Professions }
		}
		case ActionType.SetProfession1:
			return change(["set_value", "profession1", action.payload])
		case ActionType.SetProfession2:
			return change(["set_value", "profession2", action.payload])
		case ActionType.SetProfession3:
			return change(["set_value", "profession3", action.payload])
		case ActionType.SetChaosAlignment:
			return change(["set_value", "chaos_alignment", action.payload])
		case ActionType.SetOrderAlignment:
			return change(["set_value", "order_alignment", action.payload])
		case ActionType.SetAttributeBase: {
			const { attribute, value } = action.payload
			return change(["set_value", `attributes.${attribute}.base`, value])
		}
		case ActionType.SetAttributeAdvancements: {
			const { attribute, value } = action.payload
			return change(["set_value", `attributes.${attribute}.advances`, value])
		}
		case ActionType.SetSkillRanks: {
			const { skill, value } = action.payload
			return change(["set_value", `skills.${skill}.ranks`, value])
		}
		case ActionType.SetOrderRanks:
			return change(["set_value", "order_ranks", action.payload])
		case ActionType.SetChaosRanks:
			return change(["set_value", "chaos_ranks", action.payload])
		case ActionType.SetCorruption:
			return change(["set_value", "corruption", action.payload])
		case ActionType.AddFocus: {
			const { skill, focus } = action.payload
			const list = state._character.focuses[skill]!
			if (list) return change(["add_to_array", `focuses.${skill}`, focus])
			else return change(["set_value", `focuses.${skill}`, [focus]])
		}
		case ActionType.RemoveFocus: {
			const { skill, focus } = action.payload
			const list = state._character.focuses[skill]!
			if (list.length === 1)
				return change(["delete_property", `focuses.${skill}`])
			else return change(["remove_from_array", `focuses.${skill}`, focus])
		}
		case ActionType.AddSpell: {
			const { spell, school } = action.payload
			const list = state._character.spells[school]
			if (list) return change(["add_to_array", `spells.${school}`, spell])
			else return change(["set_value", `spells.${school}`, [spell]])
		}
		case ActionType.RemoveSpell: {
			const { spell, school } = action.payload
			const list = state._character.spells[school]!
			if (list.length === 1)
				return change(["delete_property", `spells.${school}`])
			else return change(["remove_from_array", `spells.${school}`, spell])
		}
		case ActionType.AddTalent: {
			return change(["add_to_array", `talents`, action.payload])
		}
		case ActionType.RemoveTalent: {
			return change(["remove_from_array", `talents`, action.payload])
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
	RemoveTalent
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

function changeFromCharacterSheet(
	changes: Array<UpdateAction>,
	state: CharacterSheetState
) {
	updateCharacterOfId(state.character.id, changes)
	const character = deepClone(state._character)
	changes.forEach(({ action, property, value }) => {
		const parts = property.split(".")
		switch (action) {
			case "set_value":
				setValue(parts, character, value)
				break
			case "remove_from_array":
				removeFromArray(parts, character, value)
				break
			case "add_to_array":
				addToArray(parts, character, value)
				break
			case "delete_property":
				deleteProperty(parts, character)
				break
			default:
				throw Error(`'${action}' is not a valid action`)
		}
	})
	return {
		...state,
		_character: character,
		character: calculateCharacterSheet({ ...state, character })
	}
}

function setValue(parts: Array<string>, obj: any, value: any) {
	if (parts.length === 1) obj[parts[0]] = value
	else setValue(parts.slice(1), obj[parts[0]], value)
}

function removeFromArray(parts: Array<string>, obj: any, value: any) {
	if (parts.length === 1) {
		const list_key = parts[0]
		const old_list = obj[list_key]
		if (Array.isArray(old_list))
			obj[list_key] = old_list.filter((x, i) => i !== value)
		else throw Error(`'${JSON.stringify(old_list)}' is not an array`)
	} else removeFromArray(parts.slice(1), obj[parts[0]], value)
}

function addToArray(parts: Array<string>, obj: any, value: any) {
	if (parts.length === 1) {
		const list_key = parts[0]
		const old_list = obj[list_key]
		if (Array.isArray(old_list)) obj[list_key] = [...old_list, value]
		else throw Error(`'${JSON.stringify(old_list)}' is not an array`)
	} else addToArray(parts.slice(1), obj[parts[0]], value)
}

function deleteProperty(parts: Array<string>, obj: any) {
	if (parts.length === 1) delete parts[0]
	else deleteProperty(parts.slice(1), obj[parts[0]])
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

function deepClone<T>(obj: T) {
	return JSON.parse(JSON.stringify(obj))
}
