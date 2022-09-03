import { AttributeCode } from "@core/domain/attribute/AttributeCode"
import { SkillCode } from "@core/domain/skill/SkillCode"
import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useSetCharacterAddTalent from "@web/components/character_sheet/hooks/update/useSetCharacterAddTalent"
import useSetCharacterAttributeAdvances
	from "@web/components/character_sheet/hooks/update/useSetCharacterAttributeAdvances"
import useSetCharacterProfession1 from "@web/components/character_sheet/hooks/update/useSetCharacterProfession1"
import useSetCharacterProfession2 from "@web/components/character_sheet/hooks/update/useSetCharacterProfession2"
import useSetCharacterProfession3 from "@web/components/character_sheet/hooks/update/useSetCharacterProfession3"
import useSetCharacterRemoveTalent from "@web/components/character_sheet/hooks/update/useSetCharacterRemoveTalent"
import useSetCharacterReplaceTalent from "@web/components/character_sheet/hooks/update/useSetCharacterReplaceTalent"
import useSetCharacterSkillRanks from "@web/components/character_sheet/hooks/update/useSetCharacterSkillRanks"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton, CheckComboBox } from "misevi"
import React from "react"
import styled from "styled-components"

export default function CharacterSheetTier({ i }: { i: number }) {
	const isOwner = useIsCharacterSheetOwner()
	const { _character, character: { profession_profile: { professions } } } = useCharacterSheetState()
	const setAttributeAdvances = useSetCharacterAttributeAdvances()
	const setSkillRanks = useSetCharacterSkillRanks()
	const addTalent = useSetCharacterAddTalent()
	const removeTalent = useSetCharacterRemoveTalent()
	const replaceTalent = useSetCharacterReplaceTalent()
	const tier = professions[i]
	const TIER = TIERS[i]
	const setProfession = TIER.useSetCharacterProfession() //TODO this is too weird


	return (
		<Container aria-labelledby={TIER.code}>
			<Titlest id={TIER.code}>{TIER.name}</Titlest>
			<Title>Profession</Title>
			<CheckComboBox
				{...tier.profession}
				disabled={tier.profession.disabled || !isOwner}
				aria-label={TIER.profession}
				value={tier.profession.code}
				onChange={setProfession}
			/>
			<Title>Attributes</Title>
			<Grid columns={2}>
				{tier.attributes.map((x, i) => (
					<CheckButton
						text={x.name}
						checked={x.checked}
						key={`${i}-${x}`}
						onChange={checked => setAttributeAdvances({
							attribute: x.code as AttributeCode,
							value: _character.attributes[x.code as AttributeCode].advances + (checked ? 1 : -1)
						})}
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
						onChange={checked => setSkillRanks({
							skill: x.code as SkillCode,
							value: _character.skills[x.code as SkillCode].ranks + (checked ? 1 : -1)
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
					onChange={checked => {
						if (checked)
							addTalent(x.code)
						else
							removeTalent(x.code)
					}}
				/>
			)}
			{tier.wildcard_talents.map((x, i) =>
				<CheckComboBox value={x.code} options={x.options} key={`${i}-${x}`}
											 onChange={(code) => {
												 if (code === null)
													 removeTalent(x.code as string)
												 else if (x.code === null)
													 addTalent(code)
												 else
													 replaceTalent({ old: x.code as string, new: code })
											 }}
				/>
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
		useSetCharacterProfession: useSetCharacterProfession1,
		profession: "Profession 1"
	},
	{
		name: "Intermediate Tier",
		code: "intermediate_tier",
		useSetCharacterProfession: useSetCharacterProfession2,
		profession: "Profession 2"
	},
	{
		name: "Advanced Tier",
		code: "advanced_tier",
		useSetCharacterProfession: useSetCharacterProfession3,
		profession: "Profession 3"
	}
]