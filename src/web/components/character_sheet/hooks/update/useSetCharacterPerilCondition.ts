import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterPerilCondition() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: number) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "peril", value: value }
			]
		})
	}
}