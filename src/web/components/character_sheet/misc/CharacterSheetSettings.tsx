import { SETTINGS_VISIBILITY } from "@web/components/character_sheet/bio/Constants"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsOwner from "@web/components/character_sheet/hooks/useIsOwner"
import { Field } from "misevi"

export default function CharacterSheetSettings() {
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsOwner()

	return (
		<>
			<Field
				label="Visibility"
				type="combobox"
				value={character.settings.visibility}
				options={SETTINGS_VISIBILITY}
				onChange={value => {
					dispatch({
						type: ActionType.SetSettings,
						payload: { visibility: value! }
					})
				}}
				unclearable
				disabled={!isOwner}
			/>
		</>
	)
}
