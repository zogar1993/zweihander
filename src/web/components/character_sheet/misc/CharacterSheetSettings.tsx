import { SETTINGS_VISIBILITY } from "@web/components/character_sheet/bio/Constants"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterSettings from "@web/components/character_sheet/hooks/update/useSetCharacterSettings"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import { Field } from "misevi"

export default function CharacterSheetSettings() {
	const { character } = useCharacterSheetState()
	const isOwner = useIsCharacterSheetOwner()
	const setSettings = useSetCharacterSettings()

	return (
		<>
			<Field
				label="Visibility"
				type="combobox"
				value={character.settings.visibility}
				options={SETTINGS_VISIBILITY}
				onChange={value => setSettings({ visibility: value! })}
				unclearable
				disabled={!isOwner}
			/>
		</>
	)
}
