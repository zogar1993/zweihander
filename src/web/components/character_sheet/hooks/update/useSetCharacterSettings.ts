import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"

export default function useSetCharacterSettings() {
	const dispatch = useCharacterSheetDispatcher()

	return (settings: { visibility?: string }) => {
		const entries = Object.entries(settings)
		dispatch({
			type: ActionType.UpdateCharacter, payload:
				entries.map(
					([key, value]) =>
						({ action: "set_value", property: `settings.${key}`, value: value })
				)

		})
	}
}