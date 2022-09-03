import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterRemoveTalent() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "remove_from_array", property: "talents", value: value }
			]
		})
	}
}