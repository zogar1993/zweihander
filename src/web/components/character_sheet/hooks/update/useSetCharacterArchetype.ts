import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterArchetype() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string | null) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "archetype", value: value }
			]
		})
	}
}