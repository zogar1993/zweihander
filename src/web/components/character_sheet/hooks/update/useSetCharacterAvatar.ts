import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterAvatar() {
	const dispatch = useCharacterSheetDispatcher()

	return ({ avatar, thumbnail }: { avatar: string; thumbnail: string }) => {
		dispatch({
			type: ActionType.UpdateCharacter, payload: [
				{ action: "set_value", property: "avatar", value: avatar },
				{ action: "set_value", property: "thumbnail", value: thumbnail }
			]
		})
	}
}