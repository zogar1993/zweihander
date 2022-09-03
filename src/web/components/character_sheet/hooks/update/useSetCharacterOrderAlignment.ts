import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterOrderAlignment() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string | null) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "order_alignment", value: value }
			]
		})
	}
}