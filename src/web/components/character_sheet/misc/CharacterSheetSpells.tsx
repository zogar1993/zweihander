import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsOwner from "@web/components/character_sheet/hooks/useIsOwner"
import RemovableItems from "@web/components/RemovableItems"
import { Field } from "misevi"

export default function CharacterSheetSpells() {
	const { character, comboboxes } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const { value: school, options: schools } = comboboxes.schools
	const { options: spells } = comboboxes.spells
	const isOwner = useIsOwner()

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
						onChange={code =>
							dispatch({
								type: ActionType.AddSpell,
								payload: { school: school!, spell: code! }
							})
						}
						disabled={school === null}
						unclearable
					/>
				</>
			)}
			<RemovableItems
				items={character.schools}
				removeItem={({ item, key }) =>
					dispatch({
						type: ActionType.RemoveSpell,
						payload: { school: key, spell: item }
					})
				}
			/>
		</>
	)
}
