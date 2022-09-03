import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterAge() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: number) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "age", value: value }
			]
		})
	}
}