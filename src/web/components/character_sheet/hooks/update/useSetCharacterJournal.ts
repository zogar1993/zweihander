import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterJournal() {
	const dispatch = useCharacterSheetDispatcher()

	return (value: string) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "journal", value: value }
			]
		})
	}
}