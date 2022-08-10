import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { CharacterSheetProfessionAdvances } from "@core/domain/character_sheet/calculations/CalculateProfessionProfile"
import { SkillCode } from "@core/domain/skill/SkillCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton, CheckComboBox } from "misevi"
import React, { ReactNode } from "react"
import styled from "styled-components"

export default function CharacterSheetTier({ name, tier, profession }: {
	name: string
	tier: CharacterSheetProfessionAdvances
	profession: ReactNode
}) {
	const dispatch = useCharacterSheetDispatcher()
	const { _character } = useCharacterSheetState()

	return (
		<Container>
			<Title>{name} Tier</Title>
			<Title>Profession</Title>
			{profession}
			<Title>Attributes</Title>
			<Grid columns={2}>
				{tier.attributes.map((x, i) => (
					<CheckButton
						text={x.name}
						checked={x.checked}
						key={`${i}-${x}`}
						onChange={checked =>
							dispatch({
								type: ActionType.SetAttributeAdvancements,
								payload: {
									attribute: x.code as AttributeCode,
									value: _character.attributes[x.code as AttributeCode].advances + (checked ? 1 : -1)
								}
							})
						}
					/>
				))}
			</Grid>
			<Title>Skills</Title>
			<Grid columns={2}>
				{tier.skills.map((x, i) => (
					<CheckButton
						text={x.name}
						checked={x.checked}
						key={`${i}-${x}`}
						onChange={checked =>
							dispatch({
								type: ActionType.SetSkillRanks,
								payload: {
									skill: x.code as SkillCode,
									value: _character.skills[x.code as SkillCode].ranks + (checked ? 1 : -1)
								}
							})
						}
					/>
				))}
			</Grid>
			<Title>Talents</Title>
			{tier.talents.map((x, i) =>
				<CheckButton
					text={x.name}
					checked={x.checked} key={`${i}-${x}`}
					onChange={checked => dispatch({
						type: checked ? ActionType.AddTalent : ActionType.RemoveTalent,
						payload: x.code
					})}
				/>
			)}
			{tier.wildcard_talents.map((x, i) =>
				//TODO horrible

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
												 })} />
			)}
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
