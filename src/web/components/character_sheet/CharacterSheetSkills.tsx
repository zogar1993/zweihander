import { useCharacterSheet } from "@web/components/character_sheet/CharacterSheetContext"
import theme from "@web/theme/theme"
import { Field } from "misevi"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetSkills() {
	const character = useCharacterSheet()
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
