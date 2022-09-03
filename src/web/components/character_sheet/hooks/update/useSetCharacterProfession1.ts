import { Archetype } from "@core/actions/GetArchetypes"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterProfession1() {
	const dispatch = useCharacterSheetDispatcher()
	const { _character, archetypes } = useCharacterSheetState()

	return (value: string | null) => {
		if (_character.archetype !== null) {
			dispatch({
				type: ActionType.UpdateCharacter, payload: [
					{ action: "set_value", property: "profession1", value: value }
				]
			})
		} else {
			const isProfessionsArchetype = (archetype: Archetype) =>
				archetype.professions["main_gauche"].some(x => x.profession === value)
			dispatch({
				type: ActionType.UpdateCharacter, payload: [
					{ action: "set_value", property: "archetype", value: archetypes.find(isProfessionsArchetype)!.code },
					{ action: "set_value", property: "profession1", value: value }
				]
			})
		}
	}
}