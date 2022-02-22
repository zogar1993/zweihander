import {
	ActionType,
	CharacterSheetAction,
	CharacterSheetProps
} from "@web/components/character_sheet/CharacterSheetContext"
import { Dispatch, useEffect } from "react"

export default function useInitializeCharacterSheetReducer(
	{
		character,
		schools,
		ancestries,
		archetypes,
		orderAlignments,
		chaosAlignments,
		professions,
		talents
	}: Partial<CharacterSheetProps>,
	dispatch: Dispatch<CharacterSheetAction>
) {
	useEffect(() => {
		if (
			character &&
			schools &&
			ancestries &&
			archetypes &&
			orderAlignments &&
			chaosAlignments &&
			professions &&
			talents
		)
			dispatch({
				type: ActionType.Initialize,
				payload: {
					character,
					schools,
					ancestries,
					archetypes,
					orderAlignments,
					chaosAlignments,
					professions,
					talents
				}
			})
	}, [
		character,
		schools,
		ancestries,
		archetypes,
		orderAlignments,
		chaosAlignments,
		professions,
		talents
	])
}
