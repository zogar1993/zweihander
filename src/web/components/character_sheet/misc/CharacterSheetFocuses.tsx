import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import RemovableItems from "@web/components/RemovableItems"
import { Field } from "misevi"
import { useState } from "react"

export default function CharacterSheetFocuses() {
	const [skill, setSkill] = useState<SkillCode | null>(null)
	const [focus, setFocus] = useState<string>("")
	const { character } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()

	return (
		<div>
			<Field
				label="Skill"
				type="combobox"
				options={SKILL_DEFINITIONS}
				onChange={(value: SkillCode | null) => {
					setSkill(value)
				}}
				value={skill}
				unclearable
			/>
			<Field label="Focus" value={focus} onBlur={setFocus} />
			<button
				disabled={focus === "" || skill === null}
				onClick={() =>
					dispatch({
						type: ActionType.AddFocus,
						payload: { focus, skill: skill! }
					})
				}
			>
				Add
			</button>
			<RemovableItems
				items={character.focuses}
				removeItem={({ item, key }) =>
					dispatch({
						type: ActionType.RemoveFocus,
						payload: { skill: key as SkillCode, focus: item }
					})
				}
			/>
		</div>
	)
}
