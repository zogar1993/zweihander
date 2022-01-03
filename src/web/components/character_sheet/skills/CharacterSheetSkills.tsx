import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import CharacterSheetSkill from "@web/components/character_sheet/skills/CharacterSheetSkill"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"
//TODO add behaviour for skill and attribute
export default function CharacterSheetSkills() {
	const { character } = useCharacterSheetState()
	const [firstHalf, secondHalf] = splitHalves(character.skills)
	return (
		<SkillsSection>
			<SkillsHalf>
				{firstHalf.map(skill => (
					<CharacterSheetSkill key={skill.code} skill={skill} />
				))}
			</SkillsHalf>
			<SkillsHalf>
				{secondHalf.map(skill => (
					<CharacterSheetSkill key={skill.code} skill={skill} />
				))}
			</SkillsHalf>
		</SkillsSection>
	)
}

const SkillsSection = styled.div`
	grid-area: skills;
	display: flex;
	gap: ${theme.spacing.separation};
`

const SkillsHalf = styled.div`
	display: flex;
	flex-direction: column;
`

function splitHalves<T>(array: Array<T>) {
	const half = Math.ceil(array.length / 2)
	return [array.slice(0, half), array.slice(half, array.length)]
}
