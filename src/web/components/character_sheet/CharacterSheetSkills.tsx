import { useCharacterSheetState } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetSkills() {
	const { character } = useCharacterSheetState()
	return (
		<AttributesSection>
			{character.skills.map(skill =>
				<div key={skill.code}>
					<span>{skill.name}</span>
					<span>{skill.chance}</span>
				</div>
			)}
		</AttributesSection>
	)
}

const AttributesSection = styled.div`
  grid-area: skills;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.separation};
`
