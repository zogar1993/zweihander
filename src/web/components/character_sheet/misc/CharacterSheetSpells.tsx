import { getByCode } from "@core/domain/general/GetByCode"
import { Spell } from "@core/domain/Spell"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import RemovableItems from "@web/components/RemovableItems"
import { Field } from "misevi"
import { useEffect, useState } from "react"

export default function CharacterSheetSpells() {
	const [school, setSchool] = useState<string | null>(null)
	const { character, schools } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const [spells, setSpells] = useState<Array<Spell>>([])

	useEffect(() => {
		if (school === null) setSpells([])
		else setSpells(getByCode(school, schools).spells)
	}, [schools, school])

	return (
		<div>
			<Field
				label="School"
				type="combobox"
				options={schools}
				onChange={setSchool}
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
			<RemovableItems
				items={character.schools}
				removeItem={({ item, key }) =>
					dispatch({
						type: ActionType.RemoveSpell,
						payload: { school: key, spell: item }
					})
				}
			/>
		</div>
	)
}
