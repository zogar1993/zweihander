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
import useSetCharacterRemoveTalent from "@web/components/character_sheet/hooks/update/useSetCharacterRemoveTalent"
import useSetCharacterSkillRanks from "@web/components/character_sheet/hooks/update/useSetCharacterSkillRanks"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/UseIsCharacterSheetOwner"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton, Field } from "misevi"
import React from "react"
import styled from "styled-components"
//TODO should be buttons instead maybe
export default function UniqueAdvances() {
	const { character: { profession_profile: { unique_advances }, talent } } = useCharacterSheetState()
	const { _character } = useCharacterSheetState()
	const setAttributeAdvances = useSetCharacterAttributeAdvances()
	const setSkillRanks = useSetCharacterSkillRanks()
	const addTalent = useSetCharacterAddTalent()
	const removeTalent = useSetCharacterRemoveTalent()
	const isOwner = useIsCharacterSheetOwner()

	return (
		<Container>
			<Title>Unique Advances</Title>
			{unique_advances.attributes.length > 0 &&
			<>
				<Title>Attributes</Title>
				<Grid columns={2}>
					{unique_advances.attributes.map((x, i) => (
						<CheckButton
							text={x.name}
							checked={x.checked}
							key={`${i}-${x}`}
							onChange={() => setAttributeAdvances({
								attribute: x.code as AttributeCode,
								value: _character.attributes[x.code as AttributeCode].advances - 1
							})}
						/>
					))}
				</Grid>
			</>
			}
			{unique_advances.skills.length > 0 &&
			<>
				<Title>Skills</Title>
				<Grid columns={2}>
					{unique_advances.skills.map((x, i) => (
						<CheckButton
							text={x.name}
							checked={x.checked}
							key={`${i}-${x}`}
							onChange={() =>
								setSkillRanks({
									skill: x.code as SkillCode,
									value: _character.skills[x.code as SkillCode].ranks - 1
								})
							}
						/>
					))}
				</Grid>
			</>
			}
			{(unique_advances.talents.length > 0 || isOwner) &&
			<>
				<Title>Talents</Title>
				{unique_advances.talents.map((x, i) => (
					<CheckButton
						text={x.name}
						checked={x.checked}
						key={`${i}-${x}`}
						onChange={() => removeTalent(x.code)}
					/>
				))}
				{isOwner &&
				<Field
					label="New Talent"
					type="combobox"
					value={null}
					options={talent.options}
					onChange={value => addTalent(value as string)}
					unclearable
				/>}
			</>
			}
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
