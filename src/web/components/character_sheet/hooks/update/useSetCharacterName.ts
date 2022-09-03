import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterName() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "name", value: value }
			]
		})
	}
}