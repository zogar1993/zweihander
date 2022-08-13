import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { SkillCode } from "@core/domain/skill/SkillCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton, CheckComboBox } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetTier({ i }: { i: number }) {
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsCharacterSheetOwner()
	const { _character, character: { profession_profile: { professions } } } = useCharacterSheetState()
	const tier = professions[i]
	const TIER = TIERS[i]

	return (
		<Container aria-labelledby={TIER.code}>
			<Titlest id={TIER.code}>{TIER.name}</Titlest>
			<Title>Profession</Title>
			<CheckComboBox
				{...tier.profession}
				disabled={tier.profession.disabled || !isOwner}
				aria-label={TIER.profession}
				value={tier.profession.code}
				onChange={code => dispatch({ type: TIER.action, payload: code } as  any)}
			/>
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

const Container = styled.section`
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

const Titlest = styled.h3`
  padding: ${theme.spacing.separation};
  text-align: center;
  font-size: 20px;
`

const TIERS = [
	{
		name: "Basic Tier",
		code: "basic_tier",
		action: ActionType.SetProfession1,
		profession: "Profession 1"
	},
	{
		name: "Intermediate Tier",
		code: "intermediate_tier",
		action: ActionType.SetProfession2,
		profession: "Profession 2"
	},
	{
		name: "Advanced Tier",
		code: "advanced_tier",
		action: ActionType.SetProfession3,
		profession: "Profession 3"
	}
]