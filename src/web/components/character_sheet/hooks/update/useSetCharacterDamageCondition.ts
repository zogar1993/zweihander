import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterDamageCondition() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "damage", value: value }
			]
		})
	}
}