import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterAddTalent() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "add_to_array", property: "talents", value: value }
			]
		})
	}
}