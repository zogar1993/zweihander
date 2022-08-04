import { CharacterTier, CharacterTierItem } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { CalculatedCombobox } from "@core/domain/character_sheet/CharacterSheet"
import { ActionType, useCharacterSheetDispatcher } from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton, CheckComboBox, Field } from "misevi"
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
			{tier.talents.map((x, i) =>
				isCombobox(x) ?
					<CheckComboBox value={x.code} options={x.options} key={`${i}-${x}`}
												 onChange={(code) => code === null ? dispatch({
														 type: ActionType.RemoveTalent,
														 payload: x.code as string
													 }) : x.code === null ?
													 dispatch({
														 type: ActionType.AddTalent,
														 payload: code
													 })
													 : dispatch({
														 type: ActionType.ReplaceTalent,
														 payload: { old: x.code as string, new: code }
													 })} /> :
					<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`}
											 onChange={() => dispatch({
												 type: ActionType.RemoveTalent,
												 payload: x.code as string /* come on ts */
											 })} />
			)}
		</Container>
	)
}

function isCombobox(props: CalculatedCombobox | CharacterTierItem): props is CalculatedCombobox {
	return props.hasOwnProperty("options")
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
