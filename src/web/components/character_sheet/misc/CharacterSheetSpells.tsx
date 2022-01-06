import { getByCode } from "@core/domain/general/GetByCode"
import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
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
	const [spell, setSpell] = useState<string | null>(null)
	const { character, schools } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const [spells, setSpells] = useState<Array<Spell>>([])

	useEffect(() => {
		if (school === null) setSpells([])
		else setSpells(getByCode(school, schools).spells)
	}, [schools, school])

	useEffect(() => {
		setSpell(null)
	}, [spells])

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
				value={spell}
				options={spells}
				onChange={setSpell}
				disabled={school === null}
				unclearable
			/>
			<button
				disabled={spell === "" || school === null}
				onClick={() =>
					dispatch({
						type: ActionType.AddSpell,
						payload: { school: school!, spell: spell! }
					})
				}
			>
				Add
			</button>
			<RemovableItems
				items={character.spells}
				definitions={schools}
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