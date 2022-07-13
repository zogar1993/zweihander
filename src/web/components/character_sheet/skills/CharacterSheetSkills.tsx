import { CalculatedSkill } from "@core/domain/character_sheet/CharacterSheet"
import CharacterSheetSkill from "@web/components/character_sheet/skills/CharacterSheetSkill"
import theme from "@web/theme/theme"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetSkills({
	skills
}: {
	skills: Array<CalculatedSkill>
}) {
	return (
		<SkillsSection>
			{skills.map(skill => (
				<CharacterSheetSkill key={skill.code} skill={skill} />
			))}
		</SkillsSection>
	)
}

const SkillsSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${theme.spacing.separation};
	background-color: ${theme.colors.primary};
	padding: ${theme.spacing.padding};
	justify-content: center;
`
