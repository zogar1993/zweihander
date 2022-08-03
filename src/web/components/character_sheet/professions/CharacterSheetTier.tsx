import { CharacterTier } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetTier({ name, tier }: {
	name: string
	tier: CharacterTier
}) {
	const dispatch = useCharacterSheetDispatcher()

	return (
		<Container>
			<Title>{name} Tier</Title>
			<Title>Profession</Title>
			<CheckButton text={tier.profession.name} checked={false} />
			<Title>Attributes</Title>
			<Grid columns={2}>
				{tier.attributes.map((x, i) => (
					<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`} />
				))}
			</Grid>
			<Title>Skills</Title>
			<Grid columns={2}>
				{tier.skills.map((x, i) => (
					<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`} />
				))}
			</Grid>
			<Title>Talents</Title>
			{tier.talents.map((x, i) => (
				<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`}
										 onChange={() => dispatch({ type: ActionType.RemoveTalent, payload: x.code })} />
			))}
		</Container>
	)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.separation};
  border: ${theme.spacing.separation} solid ${theme.colors.border};
  padding: ${theme.spacing.padding};
  border-radius: ${theme.borders.radius};
  align-items: stretch;
`

const Title = styled.span`
  padding: ${theme.spacing.separation};
  text-align: center;
  font-size: 20px;
`
