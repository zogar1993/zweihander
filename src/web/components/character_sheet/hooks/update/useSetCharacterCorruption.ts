import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterCorruption() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: number) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "corruption", value: value }
			]
		})
	}
}