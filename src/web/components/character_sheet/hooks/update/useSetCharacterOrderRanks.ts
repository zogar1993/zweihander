import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterOrderRanks() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: number) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "order_ranks", value: value }
			]
		})
	}
}