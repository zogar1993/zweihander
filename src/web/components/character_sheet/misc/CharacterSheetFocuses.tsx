import { SKILL_DEFINITIONS } from "@core/domain/skill/SKILL_DEFINITIONS"
import { SkillCode } from "@core/domain/skill/SkillCode"
import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterAddFocus from "@web/components/character_sheet/hooks/update/useSetCharacterAddFocus"
import useSetCharacterRemoveFocus from "@web/components/character_sheet/hooks/update/useSetCharacterRemoveFocus"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import RemovableItems from "@web/components/RemovableItems"
import { Field } from "misevi"
import { useState } from "react"

export default function CharacterSheetFocuses() {
	const [skill, setSkill] = useState<SkillCode | null>(null)
	const [focus, setFocus] = useState<string>("")
	const { character } = useCharacterSheetState()
	const isOwner = useIsCharacterSheetOwner()

	const addFocus = useSetCharacterAddFocus()
	const removeFocus = useSetCharacterRemoveFocus()

	return (
		<div>
			{isOwner && (
				<>
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
						onClick={() => addFocus({ focus, skill: skill! })}
					>
						Add
					</button>
				</>
			)}
			<RemovableItems
				items={character.focuses}
				removeItem={({ item, key }) => removeFocus({ skill: key as SkillCode, focus: item })}
			/>
		</div>
	)
}
