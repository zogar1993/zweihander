import updateCharacterOfId from "@web/api_calls/UpdateCharacterOfId"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useEffectAsync from "@web/components/character_sheet/hooks/UseEffectAsync"

export default function useCharacterUpdatesQueue() {
	const { character, nextUpdate, updatedAt } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	useEffectAsync(async () => {
		if (nextUpdate === null) return

		try {
			const newUpdatedAt = await updateCharacterOfId({
				id: character.id,
				lastModified: updatedAt,
				changes: nextUpdate
			})

			dispatch({
				type: ActionType.CompleteAction,
				payload: { updatedAt: newUpdatedAt, completed: nextUpdate }
			})
		} catch (e: any) {
			//dispatch({ type: ActionType.ReportUpdateError })
		}
	}, [dispatch, character.id, updatedAt, nextUpdate])
}
