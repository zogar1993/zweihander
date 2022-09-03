import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterReplaceTalent() {
	const dispatch = useCharacterSheetDispatcher()

	return (props: { old: string, new: string }) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "remove_from_array", property: "talents", value: props.old },
				{ action: "add_to_array", property: "talents", value: props.new }
			]
		})
	}
}