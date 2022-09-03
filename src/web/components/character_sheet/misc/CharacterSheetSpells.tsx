import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterAddSpell from "@web/components/character_sheet/hooks/update/useSetCharacterAddSpell"
import useSetCharacterRemoveSpell from "@web/components/character_sheet/hooks/update/useSetCharacterRemoveSpell"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import RemovableItems from "@web/components/RemovableItems"
import { Field } from "misevi"

export default function CharacterSheetSpells() {
	const { character, comboboxes } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const addSpell = useSetCharacterAddSpell()
	const removeSpell = useSetCharacterRemoveSpell()
	const { value: school, options: schools } = comboboxes.schools
	const { options: spells } = comboboxes.spells
	const isOwner = useIsCharacterSheetOwner()

	return (
		<>
			{isOwner && (
				<>
					<Field
						label="School"
						type="combobox"
						options={schools}
						onChange={value =>
							dispatch({
								type: ActionType.SetComboboxValue,
								payload: { combobox: "schools", value }
							})
						}
						value={school}
						unclearable
					/>
					<Field
						label="Spell"
						type="combobox"
						value={null}
						options={spells}
						onChange={code => addSpell({ school: school!, spell: code! })}
						disabled={school === null}
						unclearable
					/>
				</>
			)}
			<RemovableItems
				items={character.schools}
				removeItem={({ item, key }) => removeSpell({ school: key, spell: item })}
			/>
		</>
	)
}
