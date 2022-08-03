import {
	ActionType,
	useCharacterSheetDispatcher,
	useCharacterSheetState
} from "@web/components/character_sheet/CharacterSheetContext"
import useIsCharacterSheetOwner from "@web/components/character_sheet/hooks/useIsCharacterSheetOwner"
import Grid from "@web/components/general/Grid"
import theme from "@web/theme/theme"
import { CheckButton, Field } from "misevi"
import React from "react"
import styled from "styled-components"
//TODO should be buttons instead maybe
export default function UniqueAdvances() {
	const { character: { profession_profile: { spending_outside_profession }, talent } } = useCharacterSheetState()
	const dispatch = useCharacterSheetDispatcher()
	const isOwner = useIsCharacterSheetOwner()
	return (
		<Container>
			<Title>Unique Advances</Title>
			{spending_outside_profession.attributes.length > 0 &&
			<>
				<Title>Attributes</Title>
				<Grid columns={2}>
					{spending_outside_profession.attributes.map((x, i) => (
						<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`} />
					))}
				</Grid>
			</>
			}
			{spending_outside_profession.skills.length > 0 &&
			<>
				<Title>Skills</Title>
				<Grid columns={2}>
					{spending_outside_profession.skills.map((x, i) => (
						<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`} />
					))}
				</Grid>
			</>
			}
			{(spending_outside_profession.talents.length > 0 || isOwner) &&
			<>
				<Title>Talents</Title>
				{spending_outside_profession.talents.map((x, i) => (
					<CheckButton text={x.name} checked={x.checked} key={`${i}-${x}`}
											 onChange={() => dispatch({ type: ActionType.RemoveTalent, payload: x.code })} />
				))}
				{isOwner &&
				<Field
					label="New Talent"
					type="combobox"
					value={null}
					options={talent.options}
					onChange={value => dispatch({ type: ActionType.AddTalent, payload: value as string })}
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
