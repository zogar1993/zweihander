import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterAncestry() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string | null) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "ancestry_trait", value: null },
				{ action: "set_value", property: "ancestry", value: value }
			]
		})
	}
}
