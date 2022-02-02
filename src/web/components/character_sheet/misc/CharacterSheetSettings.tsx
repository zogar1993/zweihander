import {
	SETTINGS_SKILL_ORDER,
	SETTINGS_VISIBILITY
} from "@web/components/character_sheet/bio/Constants"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import { Field } from "misevi"

export default function CharacterSheetSettings() {
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	return (
		<>
			<Field
				label="Skill Order"
				type="combobox"
				value={character.settings.skill_order}
				options={SETTINGS_SKILL_ORDER}
				onChange={value => {
					dispatch({
						type: ActionType.SetSettings,
						payload: { skill_order: value! }
					})
				}}
				unclearable
			/>
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
			/>
		</>
	)
}
