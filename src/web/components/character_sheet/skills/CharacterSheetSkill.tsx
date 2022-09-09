import { CalculatedSkill, Flip } from "@core/domain/character_sheet/CharacterSheet"
import useSetCharacterSkillRanks from "@web/components/character_sheet/hooks/update/useSetCharacterSkillRanks"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import theme from "@web/theme/theme"
import { Dots } from "misevi"
import styled from "styled-components"

export default function CharacterSheetSkill({
																							skill
																						}: {
	skill: CalculatedSkill
}) {
	const isOwner = useIsCharacterSheetOwner()
	const setSkillRanks = useSetCharacterSkillRanks()

	return (
		<Container>
			<SkillName>{skill.name}</SkillName>
			<Dots
				total={3}
				value={skill.ranks}
				onChange={value => setSkillRanks({ skill: skill.code, value: value })}
				coloring={({ value, number }) => {
					if (skill.profession_ranks >= number && number > value)
						return "palegreen"
				}}
				aria-label={`${skill.name} Ranks`}
				disabled={!isOwner}
			/>
			<SkillChance flip={skill.flip}>{skill.chance}</SkillChance>
		</Container>
	)
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr 18px;
  gap: ${theme.spacing.padding};

  @media (max-width: 768px) {
    grid-template-columns: 90px 1fr 18px;
    div:nth-child(2) {
      visibility: hidden;
    }
  }
`

const SkillName = styled.span`
  white-space: pre;
`

const SkillChance = styled.span<{ flip: Flip }>`
	font-family: ${theme.fonts.handwritten};
  ${({ flip }) => flip === Flip.ToFail && `color: ${theme.colors.error}`};
`
